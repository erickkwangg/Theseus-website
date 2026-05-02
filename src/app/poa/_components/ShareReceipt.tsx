"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { cn } from "@/lib/utils";
import CopyButton from "./CopyButton";

type Props = {
  jti: string;
  agentId: string;
  issuedAt: number;
  pageUrl: string;
  credentialUrl: string;
};

export default function ShareReceipt({
  jti,
  agentId,
  issuedAt,
  pageUrl,
  credentialUrl,
}: Props) {
  const [showQr, setShowQr] = useState(false);
  const [qrSvg, setQrSvg] = useState<string | null>(null);
  const fullPageUrl =
    typeof window !== "undefined"
      ? new URL(pageUrl, window.location.origin).toString()
      : pageUrl;

  useEffect(() => {
    if (!showQr) return;
    QRCode.toString(fullPageUrl, {
      type: "svg",
      margin: 1,
      width: 200,
      color: { dark: "#1e293b", light: "#0000" },
    })
      .then((svg) => setQrSvg(svg))
      .catch(() => setQrSvg(null));
  }, [showQr, fullPageUrl]);

  return (
    <div className="poa-paper poa-materialize relative border border-indigo-700/30 bg-white/72 dark:border-indigo-300/30 dark:bg-slate-900/45">
      <header className="flex items-center justify-between border-b border-slate-300/70 px-4 py-3 dark:border-slate-700/55">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
          credential issued
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">
          ✓ attested ·{" "}
          {new Date(issuedAt).toISOString().slice(0, 10).replace(/-/g, ".")}
        </span>
      </header>

      <div className="space-y-3 px-4 py-4">
        <Kv k="JTI" v={jti} copyable />
        <Kv k="Subject" v={agentId} copyable />
        <Kv k="Public URL" v={fullPageUrl} copyable />
      </div>

      <div className="border-t border-slate-300/70 px-4 py-3 dark:border-slate-700/55">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            href={pageUrl}
            className="cta-ink inline-flex items-center  px-5 py-2 text-sm font-medium tracking-wide"
          >
            View public page →
          </Link>
          <Link
            href={credentialUrl}
            target="_blank"
            className="font-mono text-[11px] underline decoration-slate-400/60 underline-offset-[4px] hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            Raw credential JSON
          </Link>
          <button
            type="button"
            onClick={() => setShowQr((v) => !v)}
            className={cn(
              "font-mono text-[11px] underline decoration-slate-400/60 underline-offset-[4px] hover:text-indigo-700 dark:hover:text-indigo-300",
            )}
          >
            {showQr ? "Hide QR" : "Show QR"}
          </button>
        </div>
        {showQr && (
          <div className="mt-4 flex flex-wrap items-center gap-6">
            {qrSvg ? (
              <div
                className="rounded border border-slate-300/70 bg-white p-3 dark:border-slate-700/55 dark:bg-slate-50"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
            ) : (
              <div className="flex h-[206px] w-[206px] items-center justify-center rounded border border-slate-300/70 dark:border-slate-700/55">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  generating…
                </span>
              </div>
            )}
            <p className="max-w-xs text-[12px] leading-relaxed text-slate-600 dark:text-slate-300">
              Scan to open the public credential page. The page is openly
              readable; anyone can verify the JWS without permission.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Kv({ k, v, copyable }: { k: string; v: string; copyable?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-y-0.5 sm:grid-cols-[100px_1fr_auto] sm:gap-x-4">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        {k}
      </span>
      <code className="break-all font-mono text-[12px] text-slate-800 dark:text-slate-100">
        {v}
      </code>
      {copyable && <CopyButton value={v} label={k} />}
    </div>
  );
}
