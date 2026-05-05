// File-based blog loader. Posts are markdown in /content/blog with gray-matter
// frontmatter. Read at request time on the Node runtime (the App Router page
// importing this opts into 'force-static' so reads happen at build, not on
// every request).

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;          // ISO-8601, e.g. "2025-08-12"
  excerpt?: string;
  heroImage?: string;
  author?: string;
};

export type Post = PostMeta & {
  content: string;       // raw markdown
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function readPost(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  if (typeof data.title !== "string" || typeof data.date !== "string") {
    return null;
  }
  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : undefined,
    heroImage: typeof data.heroImage === "string" ? data.heroImage : undefined,
    author: typeof data.author === "string" ? data.author : undefined,
    content,
  };
}

export function listPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const posts = files
    .map((f) => readPost(f.replace(/\.md$/, "")))
    .filter((p): p is Post => p !== null)
    .map((p): PostMeta => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      excerpt: p.excerpt,
      heroImage: p.heroImage,
      author: p.author,
    }));
  // Newest first.
  posts.sort((a, b) => b.date.localeCompare(a.date));
  return posts;
}

export function getPost(slug: string): Post | null {
  return readPost(slug);
}

export function listSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  // Frontmatter dates are calendar dates ("2025-08-12"), not timestamps. Pin
  // to UTC so a Pacific-time render doesn't shift the day backwards.
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
