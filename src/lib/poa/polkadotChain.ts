// PolkadotChainReader: connects to a running Theseus node over WebSocket and
// reads `pallet_agents` storage to build an AgentSnapshot.
//
// Failure mode is intentionally loud: connect timeout, missing storage items,
// decode errors all throw so the API surface returns 503 rather than silently
// substituting fixture data. The factory in chain.ts decides whether to use
// this reader vs the fixture reader based on `THESEUS_RPC_URL`.

import { ApiPromise, WsProvider } from "@polkadot/api";
import { signatureVerify } from "@polkadot/util-crypto";
import { hexToU8a } from "@polkadot/util";
import type { ChainReader } from "./chain";
import type { AgentSnapshot, SS58Address } from "./types";

const CONNECT_TIMEOUT_MS = Number(
  process.env.THESEUS_RPC_CONNECT_TIMEOUT_MS ?? 5000,
);

type ApiCacheEntry = { url: string; api: ApiPromise; provider: WsProvider };
type ApiCache = {
  entry: ApiCacheEntry | null;
  // Deduplicate parallel cold-start calls into one connect attempt.
  inflight: Promise<ApiPromise> | null;
};

const KEY = "__poa_polkadot_api__";
const g = globalThis as unknown as { [KEY]?: ApiCache };
if (!g[KEY]) g[KEY] = { entry: null, inflight: null };
const cache = g[KEY]!;

async function getApi(url: string): Promise<ApiPromise> {
  if (cache.entry && cache.entry.url === url && cache.entry.provider.isConnected) {
    return cache.entry.api;
  }
  if (cache.inflight) return cache.inflight;
  cache.inflight = (async () => {
    // If there's a stale entry for a different URL or a disconnected provider,
    // tear it down before replacing, otherwise providers leak.
    if (cache.entry) {
      try {
        await cache.entry.api.disconnect();
      } catch {
        // best-effort
      }
      cache.entry = null;
    }
    const provider = new WsProvider(url, false /* autoConnect */);
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      // WsProvider.on() returns an unsubscribe fn; we hold both and call them
      // when the race resolves so we don't leak listeners on every connect.
      let unsubConnected: (() => void) | undefined;
      let unsubError: (() => void) | undefined;
      await new Promise<void>((resolve, reject) => {
        timer = setTimeout(
          () =>
            reject(
              new Error(`THESEUS_RPC_URL: connect timeout (${url})`),
            ),
          CONNECT_TIMEOUT_MS,
        );
        unsubConnected = provider.on("connected", () => resolve());
        unsubError = provider.on("error", (err) => reject(err as Error));
        provider.connect().catch(reject);
      }).finally(() => {
        unsubConnected?.();
        unsubError?.();
      });
      const api = await ApiPromise.create({ provider, throwOnConnect: true });
      if (!api.query.agents?.agents) {
        await api.disconnect();
        throw new Error(
          "THESEUS_RPC_URL: chain does not expose `agents.agents` storage. Wrong chain or out-of-date metadata.",
        );
      }
      cache.entry = { url, api, provider };
      return api;
    } catch (err) {
      // Best-effort cleanup of the partially-initialised provider.
      try {
        await provider.disconnect();
      } catch {
        // ignore
      }
      throw err;
    } finally {
      if (timer) clearTimeout(timer);
      cache.inflight = null;
    }
  })();
  return cache.inflight;
}

export class PolkadotChainReader implements ChainReader {
  constructor(private readonly url: string) {}

  async getAgentSnapshot(agentId: SS58Address): Promise<AgentSnapshot | null> {
    const api = await getApi(this.url);

    const opt = await api.query.agents.agents(agentId);
    const optAny = opt as unknown as {
      isSome: boolean;
      unwrap: () => Record<string, unknown>;
    };
    if (!optAny.isSome) return null;
    const info = optAny.unwrap();

    const account = await api.query.system.account(agentId);
    const accountAny = account as unknown as {
      data: { free: { toString: () => string } };
    };
    const balanceFree = accountAny.data.free.toString();

    const header = await api.rpc.chain.getHeader();
    const blockNumber = (
      header as unknown as { number: { toNumber: () => number } }
    ).number.toNumber();

    const name = bytesToUtf8(info.name);
    const compiledHash = (
      info.compiled_hash as { toHex: () => string }
    ).toHex();
    const owner = (info.owner as { toString: () => string }).toString();
    const version = Number(
      (info.version as { toNumber: () => number }).toNumber(),
    );
    const active =
      (info.active as { toJSON: () => boolean }).toJSON() === true;
    const toolList = info.tools as Array<{
      name: { toString: () => string } | Uint8Array;
    }>;
    const toolNames = toolList.map((t) => bytesToUtf8(t.name)).filter(Boolean);
    const enclaveBound =
      (info.tool_operator as { isSome: boolean }).isSome === true;

    return {
      agentId,
      name: name || `agent-${agentId.slice(0, 8)}`,
      summary: undefined, // not on chain
      abgHash: compiledHash,
      abgVersion: version,
      sovereign: false, // protocol has no sovereignty primitive yet
      controller: owner,
      capabilities: {
        models: [], // requires ABG node walk; not wired in v1
        tools: toolNames,
        intentTypes: [], // requires ABG node walk; not wired in v1
        subAgents: [], // requires ABG node walk; not wired in v1
      },
      registration: {
        atBlock: 0, // requires event-history indexer; not wired in v1
        registrar: owner,
      },
      funding: {
        seusBalance: balanceFree,
        active: active && balanceFree !== "0",
      },
      recentRuns: {
        sampledRuns: 0,
        inferenceMix: { kzg: 0, signatureOnly: 0 },
        grade: "unknown",
      },
      enclaveBound,
      snapshotAtBlock: blockNumber,
      snapshotAtTime: new Date().toISOString(),
    };
  }

  async verifyControllerSignature(args: {
    controller: SS58Address;
    message: string;
    signatureHex: string;
  }): Promise<boolean> {
    try {
      const result = signatureVerify(
        args.message,
        hexToU8a(args.signatureHex),
        args.controller,
      );
      return result.isValid;
    } catch {
      return false;
    }
  }

  async currentBlock(): Promise<number> {
    const api = await getApi(this.url);
    const header = await api.rpc.chain.getHeader();
    return (
      header as unknown as { number: { toNumber: () => number } }
    ).number.toNumber();
  }
}

function bytesToUtf8(v: unknown): string {
  const u8a =
    v instanceof Uint8Array
      ? v
      : (v as { toU8a?: () => Uint8Array }).toU8a?.() ?? new Uint8Array();
  return new TextDecoder().decode(u8a);
}
