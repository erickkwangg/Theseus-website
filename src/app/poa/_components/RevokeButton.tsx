"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { track } from "./analytics";

// RevokeButton: shown on /poa/[agentId] when the visitor's connected wallet
// matches the agent's controller. Asks the wallet to sign a revoke nonce,
// posts to /poa/api/revoke, and refreshes the page to show the revoked state.
//
// Visibility model:
//   - sovereign agents: never (no controller exists)
//   - controller-retained agents: show only after the wallet is connected and
//     the connected account list contains the controller address. We don't
//     pop the wallet open on page load; the user clicks "Connect to retire".

type Mode = "fixture" | "polkadot";

type Props = {
  agentId: string;
  controller: string;
  mode: Mode;
  alreadyRevoked: boolean;
};

type State =
  | { kind: "idle" }
  | { kind: "connecting" }
  | { kind: "ready"; controllerInWallet: boolean }
  | { kind: "running"; detail: string }
  | { kind: "done" }
  | { kind: "error"; message: string };

export default function RevokeButton({
  agentId,
  controller,
  mode,
  alreadyRevoked,
}: Props) {
  const router = useRouter();
  const [state, setState] = useState<State>({ kind: "idle" });
  const [confirming, setConfirming] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state.kind === "error") {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [state.kind]);

  if (alreadyRevoked) return null;

  async function connect() {
    setState({ kind: "connecting" });
    try {
      const wallet = await import("./walletClient");
      const accounts = await wallet.connectWallet();
      const match = accounts.some((a) => a.address === controller);
      setState({ kind: "ready", controllerInWallet: match });
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "wallet-error",
      });
    }
  }

  async function runRevoke() {
    setConfirming(false);
    setState({ kind: "running", detail: "requesting nonce..." });
    track("poa.revoke.submitted", { agentId });
    try {
      const ch = await jsonFetch<{ nonce: string }>("/poa/api/challenge", {
        agentId,
      });

      const message = `poa-revoke:${agentId}:${ch.nonce}`;
      let signatureHex: string;
      if (mode === "polkadot") {
        setState({ kind: "running", detail: "asking your wallet to sign..." });
        const wallet = await import("./walletClient");
        signatureHex = await wallet.signNonceWithController(
          controller,
          message,
        );
      } else {
        setState({ kind: "running", detail: "signing nonce (dev fixture)..." });
        const sig = await jsonFetch<{ signatureHex: string }>(
          "/poa/api/dev-sign",
          { agentId, nonce: ch.nonce, prefix: "poa-revoke" },
        );
        signatureHex = sig.signatureHex;
      }

      setState({ kind: "running", detail: "submitting revocation..." });
      await jsonFetch<{ jti: string }>("/poa/api/revoke", {
        agentId,
        nonce: ch.nonce,
        signatureHex,
      });

      setState({ kind: "done" });
      track("poa.revoke.success", { agentId });
      // Refresh the server component so the page renders the revoked state.
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "revoke-failed";
      setState({ kind: "error", message });
      track("poa.revoke.failed", { agentId, reason: message });
    }
  }

  // Initial state: a quiet "Connect to retire" affordance. Only after the
  // user opts in do we touch the wallet.
  if (state.kind === "idle") {
    return (
      <button
        type="button"
        onClick={connect}
        className="cta-shareLink"
        aria-label="Connect wallet to retire this credential"
      >
        Retire credential
      </button>
    );
  }

  if (state.kind === "connecting") {
    return (
      <span className="poa-stamp" aria-live="polite">
        Connecting wallet…
      </span>
    );
  }

  if (state.kind === "ready") {
    if (!state.controllerInWallet) {
      return (
        <p
          className="text-[12.5px] leading-relaxed text-[var(--poa-ink-soft)]"
          aria-live="polite"
        >
          The controller key for this agent isn&apos;t in your connected
          wallet. Switch accounts and reload to retire.
        </p>
      );
    }
    return (
      <div className="flex flex-wrap items-center gap-2">
        {!confirming ? (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className={cn("cta-shareLink", "cta-shareLink-fail")}
          >
            Retire credential
          </button>
        ) : (
          <>
            <span className="poa-stamp">Sure?</span>
            <button
              type="button"
              onClick={runRevoke}
              className={cn("cta-shareLink", "cta-shareLink-fail")}
            >
              Yes, retire
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="cta-shareLink"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    );
  }

  if (state.kind === "running") {
    return (
      <span className="poa-stamp" aria-live="polite">
        <span className="inline-block w-2 animate-pulse">▌</span>{" "}
        {state.detail}
      </span>
    );
  }

  if (state.kind === "done") {
    return (
      <span className="poa-stamp" style={{ color: "var(--poa-wax)" }}>
        Retired. Refreshing…
      </span>
    );
  }

  // error
  return (
    <p
      ref={errorRef}
      role="alert"
      className="text-[12.5px] leading-relaxed text-[var(--poa-wax)]"
    >
      Couldn&apos;t retire: <code className="font-mono">{state.message}</code>{" "}
      <button
        type="button"
        onClick={() => setState({ kind: "idle" })}
        className="underline decoration-[color:var(--poa-rule)] underline-offset-[4px] hover:decoration-[color:var(--poa-wax)]"
      >
        try again
      </button>
    </p>
  );
}

async function jsonFetch<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await res.json()) as T & { error?: string };
  if (!res.ok) {
    throw new Error(
      (payload as { error?: string }).error ?? `HTTP ${res.status}`,
    );
  }
  return payload;
}
