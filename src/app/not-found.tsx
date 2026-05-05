import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen site-shell flex items-center justify-center px-6 py-20 text-slate-900 dark:text-white">
      <div className="hero-card relative w-full max-w-3xl rounded-2xl bg-[#F1EAE1] px-8 py-16 text-center sm:px-12 sm:py-20 lg:rounded-3xl dark:bg-slate-900">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          404
        </p>
        <h1 className="mt-6 font-serif text-5xl font-normal tracking-[-0.02em] leading-[1.05] sm:text-6xl">
          This <span className="italic">route</span> doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base text-slate-600 dark:text-slate-300 sm:text-lg">
          The page you&apos;re looking for may have moved or never existed.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <Link
            href="/"
            className="primary-cta inline-flex items-center rounded-md px-7 py-3 text-base font-medium tracking-wide"
          >
            Back to home
          </Link>
          <Link
            href="/docs"
            className="text-base font-medium text-slate-800 underline underline-offset-[6px] decoration-slate-400/70 transition-colors hover:decoration-current dark:text-slate-100 dark:decoration-slate-500/70"
          >
            Browse docs →
          </Link>
        </div>
      </div>
    </main>
  );
}
