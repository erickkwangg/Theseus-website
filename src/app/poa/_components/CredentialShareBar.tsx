"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { track } from "./analytics";

// CredentialShareBar: copy-link, share-to-Twitter, and embed-snippet for
// /poa/[agentId]. The credential page is the artifact; this is the toolbar
// people use to put it in front of someone else.

type Props = {
  agentId: string;
  agentName: string;
};

const SITE_URL = "https://theseus.network";

export default function CredentialShareBar({ agentId, agentName }: Props) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const [embedState, setEmbedState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const [embedOpen, setEmbedOpen] = useState(false);

  const url = `${SITE_URL}/poa/${agentId}`;
  const tweet = `${agentName} has a Proof of Agenthood credential. Verify it: ${url}`;
  const embed = `<a href="${url}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border:1px solid #14110D;background:#FBF7F1;color:#14110D;font:600 12px ui-monospace,monospace;text-decoration:none;letter-spacing:0.04em;text-transform:uppercase;border-radius:2px"><span style="color:#7B1E1E">&#9733;</span> Verified by Proof of Agenthood</a>`;

  async function copy(text: string, set: typeof setCopyState) {
    try {
      await navigator.clipboard.writeText(text);
      set("copied");
      setTimeout(() => set("idle"), 1400);
    } catch {
      set("failed");
      setTimeout(() => set("idle"), 1400);
    }
  }

  // Web Share API on mobile (iOS Safari, Android Chrome) gives the user
  // their full system share sheet. Falls back to opening the X intent in
  // a new tab on desktop, where Web Share isn't available.
  async function nativeShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: `${agentName} · Proof of Agenthood`,
          text: tweet,
          url,
        });
        return;
      } catch {
        // user cancel or share failed; fall through to X intent
      }
    }
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(tweet)}`,
      "_blank",
      "noopener",
    );
  }

  return (
    <section
      aria-label="Share this credential"
      className="border-t pt-6 print:hidden"
      style={{ borderColor: "var(--poa-rule)" }}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
        <span className="poa-stamp mr-2">Share</span>

        <Button
          onClick={() => {
            track("poa.share.url_copied", { agentId });
            copy(url, setCopyState);
          }}
          state={copyState}
          idle="Copy URL"
          aria-label="Copy public credential URL"
        />

        <button
          type="button"
          onClick={() => {
            track("poa.share.native", { agentId });
            void nativeShare();
          }}
          className="cta-shareLink"
          aria-label="Share this credential"
        >
          Share
        </button>

        <button
          type="button"
          onClick={() => {
            setEmbedOpen((o) => {
              if (!o) track("poa.share.embed_opened", { agentId });
              return !o;
            });
          }}
          aria-expanded={embedOpen}
          className="cta-shareLink"
        >
          {embedOpen ? "Hide embed" : "Embed badge"}
        </button>

        <button
          type="button"
          onClick={() => {
            track("poa.share.print", { agentId });
            window.print();
          }}
          aria-label="Print this credential"
          className="cta-shareLink"
        >
          Print
        </button>
      </div>

      {embedOpen && (
        <div className="mt-4 border-t pt-4" style={{ borderColor: "var(--poa-rule)" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[12.5px] leading-relaxed text-[var(--poa-ink-soft)]">
              Paste this anywhere HTML renders. Links to{" "}
              <code className="font-mono text-[12px]">/poa/{agentId.slice(0, 10)}…</code>.
            </p>
            <Button
              onClick={() => {
                track("poa.share.embed_copied", { agentId });
                copy(embed, setEmbedState);
              }}
              state={embedState}
              idle="Copy snippet"
              aria-label="Copy embed snippet"
            />
          </div>
          <pre
            className="mt-3 overflow-x-auto border bg-white/40 p-3 font-mono text-[11px] leading-relaxed dark:bg-slate-900/40"
            style={{ borderColor: "var(--poa-rule)", color: "var(--poa-ink)" }}
          >
            <code>{embed}</code>
          </pre>
          <div className="mt-3">
            <span className="poa-stamp mr-3">Preview</span>
            <span dangerouslySetInnerHTML={{ __html: embed }} />
          </div>
        </div>
      )}
    </section>
  );
}

function Button({
  onClick,
  state,
  idle,
  ...rest
}: {
  onClick: () => void;
  state: "idle" | "copied" | "failed";
  idle: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cta-shareLink",
        state === "copied" && "cta-shareLink-success",
        state === "failed" && "cta-shareLink-fail",
      )}
      {...rest}
    >
      {state === "copied" ? "Copied" : state === "failed" ? "Failed" : idle}
    </button>
  );
}
