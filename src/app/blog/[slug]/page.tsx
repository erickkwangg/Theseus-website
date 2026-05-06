import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { getPost, listSlugs, formatDate } from "@/lib/blog";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return listSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  const description = post.excerpt ?? `${post.title} — Theseus blog`;
  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `https://theseus.network/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: post.heroImage
        ? [{ url: `https://theseus.network${post.heroImage}` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

export default async function BlogPostPage(props: { params: Params }) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />

      <article className="px-4 pt-28 pb-24 sm:px-6 lg:pt-36">
        <header className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 transition-colors hover:text-indigo-700 dark:text-slate-400 dark:hover:text-indigo-300"
          >
            &larr; Blog
          </Link>
          <h1 className="mt-6 font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.02em] [text-wrap:balance]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-5 font-serif text-xl italic leading-snug text-slate-600 dark:text-slate-300 sm:text-2xl">
              {post.excerpt}
            </p>
          )}
          <div className="mt-7 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.author && (
              <>
                <span aria-hidden>&middot;</span>
                <span>{post.author}</span>
              </>
            )}
          </div>

          {post.heroImage && (
            <div className="mt-10 overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
              <Image
                src={post.heroImage}
                alt=""
                width={1600}
                height={840}
                className="aspect-[1600/840] w-full object-cover"
                priority
                unoptimized={post.heroImage.endsWith(".gif") || post.heroImage.endsWith(".svg")}
              />
            </div>
          )}
        </header>

        <div className="prose-blog mx-auto mt-12 max-w-2xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[
              rehypeRaw,
              rehypeKatex,
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

      </article>

      <Footer />
    </main>
  );
}
