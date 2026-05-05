import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { listPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Theseus essays and updates: thesis, technical deep-dives, and progress notes from the team building the runtime for autonomous AI agents.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Theseus Blog",
    description:
      "Theseus essays and updates: thesis, technical deep-dives, and progress notes.",
    url: "https://theseus.network/blog",
    type: "website",
  },
};

export const dynamic = "force-static";

export default function BlogIndex() {
  const posts = listPosts();
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />

      <section className="px-4 pt-32 pb-16 sm:px-6 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Blog
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em] [text-wrap:balance]">
            Notes from <span className="italic">Theseus.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Thesis, architecture, and progress reports from the team building a
            runtime for autonomous AI agents.
          </p>
        </div>
      </section>

      <section className="px-4 pb-32 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {posts.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">
              No posts yet.
            </p>
          ) : (
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block py-10 transition-colors"
                  >
                    <div className="grid gap-8 lg:grid-cols-[140px_1fr] lg:gap-10">
                      <time
                        dateTime={post.date}
                        className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 lg:pt-2"
                      >
                        {formatDate(post.date)}
                      </time>
                      <div>
                        <h2 className="font-serif text-2xl leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-indigo-700 sm:text-[1.75rem] dark:text-slate-100 dark:group-hover:text-indigo-300 [text-wrap:balance]">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                            {post.excerpt}
                          </p>
                        )}
                        {post.heroImage && (
                          <div className="mt-5 overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
                            <Image
                              src={post.heroImage}
                              alt=""
                              width={1200}
                              height={630}
                              className="aspect-[1200/630] w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                              unoptimized={post.heroImage.endsWith(".gif")}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
