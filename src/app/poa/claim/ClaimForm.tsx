"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Sigil, { checksumFromSeed } from "../_components/Sigil";
import SnapshotPreviewCard from "../_components/SnapshotPreviewCard";
import ShareReceipt from "../_components/ShareReceipt";
import type { AgentSnapshot } from "@/lib/poa/types";

type ChainMode = "fixture" | "polkadot";

type AgentOption = {
  id: string;
  name: string;
  summary?: string;
  sovereign: boolean;
  grade: string;
  abgHash: string;
};

type IssueResponse = {
  jti: string;
  agentId: string;
  issuedAt: number;
  credentialUrl: string;
  pageUrl: string;
};

type StepKey = "select" | "preview" | "attest" | "receive";

type FlowState =
  | { kind: "idle" }
  | { kind: "loading-preview" }
  | { kind: "preview"; snapshot: AgentSnapshot }
  | { kind: "running"; step: StepKey; detail: string; snapshot: AgentSnapshot }
  | { kind: "error"; message: string }
  | { kind: "done"; response: IssueResponse };

const STEPS: { key: StepKey; n: string; label: string; subtitle: string }[] = [
  {
    key: "select",
    n: "01",
    label: "Select",
    subtitle: "Choose a registered agent address.",
  },
  {
    key: "preview",
    n: "02",
    label: "Preview",
    subtitle: "Inspect the on-chain state about to be baked into the credential.",
  },
  {
    key: "attest",
    n: "03",
    label: "Attest",
    subtitle: "Sovereign: snapshot only. Otherwise the controller signs a nonce.",
  },
  {
    key: "receive",
    n: "04",
    label: "Receive",
    subtitle: "Signed credential is minted and made public.",
  },
];

async function jsonFetch<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await res.json()) as T & { error?: string };
  if (!res.ok) {
    throw new Error((payload as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return payload;
}

async function jsonGet<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const payload = (await res.json()) as T & { error?: string };
  if (!res.ok) {
    throw new Error((payload as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return payload;
}

export default function ClaimForm({
  agents,
  mode,
}: {
  agents: AgentOption[];
  mode: ChainMode;
}) {
  const [agentId, setAgentId] = useState(agents[0]?.id ?? "");
  const [state, setState] = useState<FlowState>({ kind: "idle" });
  const stepRefs = useRef<Record<StepKey, HTMLLIElement | null>>({
    select: null,
    preview: null,
    attest: null,
    receive: null,
  });
  const errorRef = useRef<HTMLDivElement>(null);

  // Whenever the selected agent changes, fetch its snapshot for the preview.
  // We refetch on real-chain mode so the preview is always current. In
  // fixture mode the data is also fresh from /api/snapshot/<id>.
  useEffect(() => {
    if (!agentId) {
      setState({ kind: "idle" });
      return;
    }
    let cancelled = false;
    setState({ kind: "loading-preview" });
    jsonGet<{ snapshot: AgentSnapshot }>(`/poa/api/snapshot/${agentId}`)
      .then((d) => {
        if (cancelled) return;
        setState({ kind: "preview", snapshot: d.snapshot });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({
          kind: "error",
          message: err instanceof Error ? err.message : "preview-failed",
        });
      });
    return () => {
      cancelled = true;
    };
  }, [agentId]);

  function activeStep(): StepKey {
    switch (state.kind) {
      case "idle":
      case "loading-preview":
        return "select";
      case "preview":
        return "preview";
      case "running":
        return state.step;
      case "done":
        return "receive";
      case "error":
        return "select";
    }
  }

  // Pull the active step into view when it changes. On a multi-step flow that
  // can outgrow the viewport, this is the "you advanced" cue.
  const current = activeStep();
  useEffect(() => {
    stepRefs.current[current]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [current]);

  useEffect(() => {
    if (state.kind === "error") {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [state.kind]);

  function onFormKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      if (state.kind === "preview") {
        e.preventDefault();
        // The form already handles submit; trigger it explicitly so we don't
        // depend on the active element being inside the form.
        void onMint(new Event("submit") as unknown as React.FormEvent);
      }
    }
  }

  function onTryAgain() {
    if (!agentId) {
      setState({ kind: "idle" });
      return;
    }
    setState({ kind: "loading-preview" });
    jsonGet<{ snapshot: AgentSnapshot }>(`/poa/api/snapshot/${agentId}`)
      .then((d) => setState({ kind: "preview", snapshot: d.snapshot }))
      .catch((err) =>
        setState({
          kind: "error",
          message: err instanceof Error ? err.message : "preview-failed",
        }),
      );
  }

  function isStepDone(step: StepKey): boolean {
    if (state.kind === "done") return true;
    const order: StepKey[] = ["select", "preview", "attest", "receive"];
    if (state.kind === "preview") return order.indexOf(step) < 1;
    if (state.kind === "running")
      return order.indexOf(step) < order.indexOf(state.step);
    return false;
  }

  async function onMint(e: React.FormEvent) {
    e.preventDefault();
    if (state.kind !== "preview") return;
    const snapshot = state.snapshot;
    try {
      setState({
        kind: "running",
        step: "attest",
        detail: "requesting challenge nonce...",
        snapshot,
      });
      const challenge = await jsonFetch<{ nonce: string }>(
        "/poa/api/challenge",
        { agentId },
      );

      let issued: IssueResponse | null = null;
      try {
        setState({
          kind: "running",
          step: "attest",
          detail: "minting (sovereign mode)...",
          snapshot,
        });
        issued = await jsonFetch<IssueResponse>("/poa/api/issue", { agentId });
      } catch (err) {
        const reason = err instanceof Error ? err.message : "issue-failed";
        if (reason !== "controller-signature-required") throw err;
      }

      if (!issued) {
        const message = `poa:${agentId}:${challenge.nonce}`;
        let signatureHex: string;
        if (mode === "polkadot") {
          setState({
            kind: "running",
            step: "attest",
            detail: "asking your wallet to sign...",
            snapshot,
          });
          // Lazy import so the extension shim isn't bundled into the
          // fixture-only path. The wrapper throws specific error classes; we
          // surface their messages directly.
          const wallet = await import("../_components/walletClient");
          if (!snapshot.controller) {
            throw new Error("controller missing on chain");
          }
          signatureHex = await wallet.signNonceWithController(
            snapshot.controller,
            message,
          );
        } else {
          setState({
            kind: "running",
            step: "attest",
            detail: "signing nonce (dev fixture)...",
            snapshot,
          });
          const sig = await jsonFetch<{ signatureHex: string }>(
            "/poa/api/dev-sign",
            { agentId, nonce: challenge.nonce },
          );
          signatureHex = sig.signatureHex;
        }
        // Brief "signature received" beat. The moment of attestation has weight.
        setState({
          kind: "running",
          step: "attest",
          detail: "◆ signature received",
          snapshot,
        });
        await new Promise((r) => setTimeout(r, 480));
        setState({
          kind: "running",
          step: "receive",
          detail: "creating credential...",
          snapshot,
        });
        issued = await jsonFetch<IssueResponse>("/poa/api/issue", {
          agentId,
          controllerSig: { nonce: challenge.nonce, signatureHex },
        });
      } else {
        setState({
          kind: "running",
          step: "receive",
          detail: "creating credential...",
          snapshot,
        });
        await new Promise((r) => setTimeout(r, 120));
      }

      setState({ kind: "done", response: issued });
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "unknown-error",
      });
    }
  }

  return (
    <form
      onSubmit={onMint}
      onKeyDown={onFormKeyDown}
      className="flex flex-col gap-10"
    >
      {/* Step rail: active step glows on a left rail to signal liveness. */}
      <ol className="border-y border-slate-300/70 divide-y divide-slate-300/70 dark:border-slate-700/55 dark:divide-slate-700/55">
        {STEPS.map((step) => {
          const isActive = activeStep() === step.key;
          const isDone = isStepDone(step.key);
          return (
            <li
              key={step.key}
              ref={(el) => {
                stepRefs.current[step.key] = el;
              }}
              className={cn(
                "grid grid-cols-[40px_minmax(0,1fr)_auto] items-baseline gap-x-4 px-2 py-4 transition-colors duration-300 sm:px-4 sm:py-5",
                isActive && "poa-step-glow bg-indigo-50/40 dark:bg-indigo-500/5",
              )}
            >
              <span
                className={cn(
                  "font-mono text-[11px] tabular-nums",
                  isDone
                    ? "text-indigo-700 dark:text-indigo-300"
                    : isActive
                      ? "text-slate-900 dark:text-slate-50"
                      : "text-slate-400 dark:text-slate-500",
                )}
              >
                {step.n}
              </span>
              <div>
                <p
                  className={cn(
                    "font-mono text-[12px] uppercase tracking-[0.18em]",
                    isActive || isDone
                      ? "text-slate-900 dark:text-slate-100"
                      : "text-slate-500 dark:text-slate-400",
                  )}
                >
                  {step.label}
                </p>
                <p className="mt-1 text-[13px] text-slate-600 dark:text-slate-300">
                  {step.subtitle}
                </p>
              </div>
              <span
                className={cn(
                  "font-mono text-[10.5px] uppercase tracking-[0.18em]",
                  isDone
                    ? "text-indigo-700 dark:text-indigo-300"
                    : isActive
                      ? "text-slate-700 dark:text-slate-200"
                      : "text-slate-400 dark:text-slate-500",
                )}
              >
                {isDone ? "complete" : isActive ? "active" : "pending"}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Selection grid */}
      <div className="space-y-6">
        <div>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Choose an agent
          </span>
          <p className="mt-2 max-w-md text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
            Only the agent&apos;s controller can create a credential. Selecting
            an agent here loads its current state for review before signing.
            {mode === "polkadot" &&
              " You'll be asked to sign with the controller key in your browser wallet."}
          </p>
        </div>

        {mode === "polkadot" && (
          <label className="block">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Agent address (SS58)
            </span>
            <input
              value={agentId}
              onChange={(e) => setAgentId(e.target.value.trim())}
              placeholder="5GrwvaEF…"
              autoFocus
              className="mt-2 w-full border-b border-slate-400/60 bg-transparent py-2 font-mono text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-600/60 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-indigo-300"
            />
          </label>
        )}

        <div className="grid gap-2">
          {agents.map((a) => {
            const active = a.id === agentId;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setAgentId(a.id)}
                className={cn(
                  "group grid grid-cols-[44px_1fr_auto] items-center gap-x-4 border px-4 py-4 text-left transition-colors",
                  active
                    ? "border-indigo-500/60 bg-indigo-50/60 dark:border-indigo-300/40 dark:bg-indigo-500/10"
                    : "border-slate-300/70 hover:border-slate-500/60 dark:border-slate-700/55 dark:hover:border-slate-500/60",
                )}
              >
                <Sigil seed={a.id + a.abgHash} size={40} />
                <div className="min-w-0">
                  <p
                    className={cn(
                      "font-serif text-lg leading-tight tracking-tight",
                      active
                        ? "text-indigo-700 dark:text-indigo-300"
                        : "text-slate-900 dark:text-slate-50",
                    )}
                  >
                    {a.name}
                  </p>
                  {a.summary && (
                    <p className="mt-1 line-clamp-1 text-[12px] text-slate-600 dark:text-slate-300">
                      {a.summary}
                    </p>
                  )}
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    {a.sovereign ? "sovereign" : "controller-retained"} ·{" "}
                    verification: {a.grade}
                  </p>
                </div>
                <span className="font-serif text-xl italic leading-none text-slate-700 dark:text-slate-100">
                  {checksumFromSeed(a.id + a.abgHash)}
                </span>
              </button>
            );
          })}
        </div>

        {mode === "fixture" && (
          <details className="border-t border-slate-300/70 pt-4 dark:border-slate-700/55">
            <summary className="cursor-pointer">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-700 dark:text-slate-200">
                Or enter an address directly
              </span>
            </summary>
            <label className="mt-4 block">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Agent address (SS58)
              </span>
              <input
                value={agentId}
                onChange={(e) => setAgentId(e.target.value.trim())}
                placeholder="5GrwvaEF…"
                className="mt-2 w-full border-b border-slate-400/60 bg-transparent py-2 font-mono text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-600/60 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-indigo-300"
              />
            </label>
          </details>
        )}
      </div>

      {/* Preview */}
      {state.kind === "loading-preview" && (
        <div className="border border-dashed border-slate-300/70 px-4 py-6 dark:border-slate-700/55">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            <span className="inline-block animate-pulse text-indigo-700 dark:text-indigo-300">
              ▌
            </span>{" "}
            reading on-chain state…
          </p>
        </div>
      )}
      {(state.kind === "preview" || state.kind === "running") && (
        <SnapshotPreviewCard snapshot={state.snapshot} />
      )}

      {/* Action */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <button
          type="submit"
          disabled={state.kind !== "preview"}
          className={cn(
            "cta-ink inline-flex items-center  px-8 py-4 text-base font-medium tracking-wide",
            state.kind !== "preview" && "opacity-60",
          )}
        >
          {state.kind === "running"
            ? "Creating…"
            : state.kind === "done"
              ? "Done"
              : state.kind === "preview"
                ? state.snapshot.sovereign
                  ? "Create credential"
                  : "Sign and create credential"
                : "Create credential"}
        </button>
        {state.kind === "preview" && (
          <>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              attestation:{" "}
              <span className="text-slate-800 dark:text-slate-100">
                {state.snapshot.sovereign ? "snapshot" : "controller-attested"}
              </span>
            </span>
            <span
              className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500"
              aria-hidden
            >
              ⌘ ↵ to mint
            </span>
          </>
        )}
      </div>

      {/* Live detail line during run */}
      {state.kind === "running" && (
        <div className="border-t border-slate-300/70 pt-5 dark:border-slate-700/55">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            <span className="inline-block w-2 animate-pulse text-indigo-700 dark:text-indigo-300">
              ▌
            </span>{" "}
            {state.detail}
          </p>
        </div>
      )}

      {state.kind === "error" && (
        <div
          ref={errorRef}
          aria-live="polite"
          className="flex flex-wrap items-start justify-between gap-3 border border-rose-400/40 bg-rose-50/50 p-4 dark:border-rose-500/30 dark:bg-rose-500/5"
        >
          <div className="flex items-start gap-3">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-rose-700 dark:text-rose-300">
              Failed
            </span>
            <code className="font-mono text-[12px] text-rose-700 dark:text-rose-200">
              {state.message}
            </code>
          </div>
          <button
            type="button"
            onClick={onTryAgain}
            className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-rose-700 underline decoration-rose-400/60 underline-offset-[4px] hover:text-rose-900 dark:text-rose-300 dark:hover:text-rose-200"
          >
            Try again
          </button>
        </div>
      )}

      {state.kind === "done" && (
        <ShareReceipt
          jti={state.response.jti}
          agentId={state.response.agentId}
          issuedAt={state.response.issuedAt}
          pageUrl={state.response.pageUrl}
          credentialUrl={state.response.credentialUrl}
        />
      )}
    </form>
  );
}
