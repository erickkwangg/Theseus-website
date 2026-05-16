"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { notify, type NotifyState } from "@/app/actions/notify";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

export default function NotifyCTA() {
  const [state, action] = useActionState<NotifyState | null, FormData>(
    notify,
    null,
  );

  useEffect(() => {
    if (state?.ok === true) {
      track("home.build.notify_succeeded");
    } else if (state?.ok === false) {
      track("home.build.notify_failed", {
        reason: state.message ?? "unknown",
      });
    }
  }, [state]);

  return (
    <div id="build-notify" className="mt-8 flex flex-col items-start gap-5">
      <Link
        href="/playground"
        onClick={() => track("home.build.playground_clicked")}
        className="cta-flat inline-flex items-center gap-3 px-6 py-3 text-sm font-medium"
      >
        Open the Playground
        <ArrowRight className="size-4" aria-hidden />
      </Link>

      <form action={action} className="flex w-full max-w-md flex-col gap-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <label htmlFor="notify-email" className="sr-only">
            Email
          </label>
          <input
            id="notify-email"
            type="email"
            name="email"
            required
            placeholder="you@domain.com"
            aria-invalid={state?.ok === false || undefined}
            className={cn(
              "min-w-0 flex-1 rounded-sm border bg-white/60 px-3 py-2 font-mono text-[13px]",
              "text-slate-900 placeholder:text-slate-400 outline-none",
              "border-slate-300/80 focus:border-indigo-500/60",
              "dark:bg-slate-900/50 dark:text-slate-100 dark:placeholder:text-slate-500",
              "dark:border-slate-700/70 dark:focus:border-indigo-400/60",
              state?.ok === false && "border-rose-400/70 dark:border-rose-400/60",
            )}
          />
          <SubmitButton done={state?.ok === true} />
        </div>

        <p
          aria-live="polite"
          className={cn(
            "font-mono text-[11px]",
            state?.ok === false
              ? "text-rose-500 dark:text-rose-300"
              : "text-slate-500 dark:text-slate-400",
          )}
        >
          {state?.message ?? "Get notified about new releases and examples."}
        </p>
      </form>
    </div>
  );
}

function SubmitButton({ done }: { done: boolean }) {
  const { pending } = useFormStatus();

  if (done) {
    return (
      <span className="inline-flex items-center justify-center gap-2 rounded-sm border border-emerald-400/60 bg-emerald-500/10 px-4 py-2 font-mono text-[12px] text-emerald-700 dark:text-emerald-300">
        ✓ on the list
      </span>
    );
  }

  return (
    <button
      type="submit"
      disabled={pending}
      className="cta-flat inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2 font-mono text-[12px] tracking-[0.06em] disabled:opacity-60"
    >
      {pending ? (
        <Loader2 className="size-3.5 animate-spin" aria-hidden />
      ) : (
        <ArrowRight className="size-3.5" aria-hidden />
      )}
      Notify me
    </button>
  );
}
