// ChainReader interface: the only thing PoA needs from Theseus Chain.
// Two implementations exist: FixtureChainReader (in-memory demo agents) and
// PolkadotChainReader (live `pallet_agents` reads via @polkadot/api). The
// factory below picks one at runtime based on `THESEUS_RPC_URL`.

import type { AgentSnapshot, SS58Address } from "./types";

export interface ChainReader {
  getAgentSnapshot(agentId: SS58Address): Promise<AgentSnapshot | null>;
  verifyControllerSignature(args: {
    controller: SS58Address;
    message: string;
    signatureHex: string;
  }): Promise<boolean>;
  currentBlock(): Promise<number>;
}

import { FIXTURE_AGENTS, FIXTURE_VALID_SIGNATURES } from "./fixtures";

export class FixtureChainReader implements ChainReader {
  private blockHeight = 1_234_567;

  async getAgentSnapshot(agentId: SS58Address): Promise<AgentSnapshot | null> {
    const fixture = FIXTURE_AGENTS[agentId];
    if (!fixture) return null;
    return {
      ...fixture,
      snapshotAtBlock: this.blockHeight,
      snapshotAtTime: new Date().toISOString(),
    };
  }

  async verifyControllerSignature(args: {
    controller: SS58Address;
    message: string;
    signatureHex: string;
  }): Promise<boolean> {
    // Fixture rule: signature is the literal string "OK:<message>" hex-encoded.
    // Real impl will use @polkadot/util-crypto's signatureVerify with sr25519.
    const validSig = FIXTURE_VALID_SIGNATURES[args.controller];
    if (!validSig) return false;
    return args.signatureHex === validSig(args.message);
  }

  async currentBlock(): Promise<number> {
    return this.blockHeight;
  }
}

// Factory: env-toggled, fail-loud.
//
// THESEUS_RPC_URL set → PolkadotChainReader. Connection / decode failures
// propagate as exceptions so API routes return 503 rather than silently
// substituting fixture data.
//
// THESEUS_RPC_URL unset → FixtureChainReader. The fixture path is the
// explicit dev/preview mode; there is no implicit fallback in the other
// direction.
let cachedReader: ChainReader | null = null;
let cachedReaderMode: "fixture" | "polkadot" | null = null;

export function chainMode(): "fixture" | "polkadot" {
  return process.env.THESEUS_RPC_URL ? "polkadot" : "fixture";
}

export function getChainReader(): ChainReader {
  const mode = chainMode();
  if (cachedReader && cachedReaderMode === mode) return cachedReader;
  if (mode === "polkadot") {
    const url = process.env.THESEUS_RPC_URL;
    if (!url) {
      // Defensive: chainMode() returned "polkadot" only because env was set,
      // so this should be unreachable. If it isn't, fail loud.
      throw new Error("THESEUS_RPC_URL is unset but polkadot mode was selected");
    }
    // Lazy require so @polkadot/api isn't loaded into fixture-only routes.
    // Next.js supports CJS interop for ESM modules; this works in dev and prod.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PolkadotChainReader } = require("./polkadotChain") as {
      PolkadotChainReader: new (url: string) => ChainReader;
    };
    cachedReader = new PolkadotChainReader(url);
  } else {
    cachedReader = new FixtureChainReader();
  }
  cachedReaderMode = mode;
  return cachedReader;
}
