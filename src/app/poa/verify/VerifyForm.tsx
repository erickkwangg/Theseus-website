"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FreshnessGauge from "../_components/FreshnessGauge";
import Glyph from "../_components/Glyph";

type FreshnessOk = { status: "current" };
type FreshnessRevoked = { status: "revoked"; reason: string };
type FreshnessUnknown = { status: "unknown"; detail: string };
type Freshness = FreshnessOk | FreshnessRevoked | FreshnessUnknown;

type VerifyResponse = {
  valid: boolean;
  reason?: string;
  claims?: {
    sub: string;
    jti: string;
    iat: number;
    attestation: { kind: string };
    agent: { name: string; summary?: string };
  };
  agentId?: string;
  jti?: string;
  issuedAt?: number;
  freshness?: Freshness;
  kid?: string;
  bundles?: {
    derived: true;
    list: { category: string; name: string; intentTypes: string[] }[];
  };
};

// /poa/verify is the "advanced" verify surface — JWS paste + recipes. The
// quick "look up by address" path lives on the /poa landing instead.

export default function VerifyForm() {
  return <JwsForm />;
}

function JwsForm() {
  const [jws, setJws] = useState("");
  const [state, setState] = useState<
    | { kind: "idle" }
    | { kind: "running" }
    | { kind: "result"; data: VerifyResponse }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!jws.trim()) return;
    setState({ kind: "running" });
    try {
      const res = await fetch("/poa/api/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jws: jws.trim() }),
      });
      const data = (await res.json()) as VerifyResponse;
      setState({ kind: "result", data });
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "verify failed",
      });
    }
  }

  return (
    <form onSubmit={onVerify} className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between border-b border-slate-300/70 pb-3 dark:border-slate-700/55">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-700 dark:text-slate-200">
          Verify a JWS credential
        </span>
        <span className="font-mono text-[10.5px] tabular-nums text-slate-400 dark:text-slate-500">
          01
        </span>
      </div>
      <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
        Paste a compact JWS issued by{" "}
        <code className="font-mono">theseus.network/poa</code>. Server checks
        the signature against the published JWKS and reports the freshness
        against the chain.
      </p>
      <label className="block">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          JWS (compact)
        </span>
        <textarea
          value={jws}
          onChange={(e) => setJws(e.target.value)}
          rows={6}
          spellCheck={false}
          placeholder="eyJhbGciOi…"
          className="mt-2 w-full border border-slate-300/70 bg-white/60 p-3 font-mono text-[11px] leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700/55 dark:bg-slate-900/40 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-indigo-300"
        />
      </label>
      <button
        type="submit"
        disabled={state.kind === "running" || !jws.trim()}
        className={cn(
          "primary-cta inline-flex w-fit items-center rounded-md px-6 py-3 text-sm font-medium tracking-wide",
          (state.kind === "running" || !jws.trim()) && "opacity-60",
        )}
      >
        {state.kind === "running" ? "Verifying…" : "Verify credential"}
      </button>

      {state.kind === "result" && <ResultCard data={state.data} />}
      {state.kind === "error" && (
        <div className="border border-rose-400/40 bg-rose-50/50 p-4 dark:border-rose-500/30 dark:bg-rose-500/5">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-rose-700 dark:text-rose-300">
            request failed
          </span>
          <code className="mt-2 block font-mono text-[12px] text-rose-700 dark:text-rose-200">
            {state.message}
          </code>
        </div>
      )}
    </form>
  );
}

function ResultCard({ data }: { data: VerifyResponse }) {
  if (!data.valid) {
    return (
      <div className="poa-result-press border border-rose-400/40 bg-rose-50/50 p-4 dark:border-rose-500/30 dark:bg-rose-500/5">
        <div className="flex items-start gap-3">
          <FreshnessGauge status="revoked" size={56} />
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-rose-700 dark:text-rose-300">
              invalid
            </span>
            <p className="mt-2 text-[13px] text-rose-800 dark:text-rose-200">
              The signature did not verify against the published JWKS.
            </p>
            <code className="mt-2 block break-all font-mono text-[11px] text-rose-700 dark:text-rose-200">
              {data.reason}
            </code>
          </div>
        </div>
      </div>
    );
  }

  const freshness = data.freshness;
  const freshStatus: "current" | "revoked" | "unknown" =
    freshness?.status === "current"
      ? "current"
      : freshness?.status === "revoked"
        ? "revoked"
        : "unknown";

  return (
    <article className="poa-result-press poa-paper relative border border-indigo-700/30 bg-white/72 dark:border-indigo-300/30 dark:bg-slate-900/45">
      <header className="flex items-center justify-between border-b border-slate-300/70 px-4 py-3 dark:border-slate-700/55">
        <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">
          <Glyph name="attest" size={13} />
          signature valid
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          kid · {data.kid}
        </span>
      </header>

      {/* Freshness gauge — the verifier's "moment". */}
      <div className="flex items-start gap-5 px-4 py-5 sm:px-6">
        <FreshnessGauge status={freshStatus} size={72} />
        <div className="flex-1">
          <p
            className={cn(
              "font-mono text-[10.5px] uppercase tracking-[0.18em]",
              freshStatus === "current"
                ? "text-indigo-700 dark:text-indigo-300"
                : freshStatus === "revoked"
                  ? "text-rose-700 dark:text-rose-300"
                  : "text-amber-700 dark:text-amber-300",
            )}
          >
            freshness · {freshStatus}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-700 dark:text-slate-200">
            {freshStatus === "current" &&
              "Chain state matches the credential. Nothing has changed that would invalidate it."}
            {freshStatus === "revoked" &&
              freshness &&
              "status" in freshness &&
              freshness.status === "revoked" &&
              `Revoked: ${freshness.reason.replace(/-/g, " ")}.`}
            {freshStatus === "unknown" &&
              "Couldn't verify against the chain right now. The signature itself is valid."}
          </p>
        </div>
      </div>
      <div className="space-y-2 px-4 py-4">
        <Kv k="Subject" v={data.agentId ?? ""} />
        <Kv k="Agent name" v={data.claims?.agent.name ?? ""} />
        <Kv k="Attestation" v={data.claims?.attestation.kind ?? ""} />
        <Kv k="JTI" v={data.jti ?? ""} />
        <Kv
          k="Issued"
          v={data.issuedAt ? new Date(data.issuedAt).toISOString() : "—"}
        />
      </div>

      {data.bundles && data.bundles.list.length > 0 && (
        <div className="border-t border-slate-300/70 px-4 py-4 dark:border-slate-700/55">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
              skills (derived)
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
              not signed
            </span>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-slate-600 dark:text-slate-300">
            Computed by this server from the signed{" "}
            <code className="font-mono">intentTypes</code>. Convenient for
            humans; gate on the raw strings inside <code className="font-mono">claims</code> for
            anything programmatic.
          </p>
          <div className="mt-3 space-y-1.5">
            {data.bundles.list.map((b) => (
              <div
                key={b.category}
                className="grid grid-cols-1 gap-y-0.5 sm:grid-cols-[160px_1fr] sm:gap-x-4"
              >
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-indigo-700 dark:text-indigo-300">
                  {b.name}
                </span>
                <code className="font-mono text-[12px] text-slate-700 dark:text-slate-200">
                  {b.intentTypes.join(" · ")}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}
      <footer className="border-t border-slate-300/70 px-4 py-3 dark:border-slate-700/55">
        {data.agentId && (
          <Link
            className="font-mono text-[11px] underline decoration-slate-400/60 underline-offset-[4px] hover:text-indigo-700 dark:hover:text-indigo-300"
            href={`/poa/${data.agentId}`}
          >
            View public credential page →
          </Link>
        )}
      </footer>
    </article>
  );
}

function Kv({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-1 gap-y-0.5 sm:grid-cols-[110px_1fr] sm:gap-x-4">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        {k}
      </span>
      <code className="break-all font-mono text-[12px] text-slate-800 dark:text-slate-100">
        {v}
      </code>
    </div>
  );
}
