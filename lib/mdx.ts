import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  category: string;
  featured?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

// ── Generic helpers ────────────────────────────────────────────────────

function getFiles(dir: string): string[] {
  const full = path.join(contentRoot, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => f.endsWith(".mdx"));
}

function parseFile(dir: string, filename: string): Post {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(contentRoot, dir, filename), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    date: data.date ?? "",
    readTime: data.readTime ?? 5,
    tags: data.tags ?? [],
    category: data.category ?? "",
    featured: data.featured ?? false,
    content,
  };
}

// ── Blog ───────────────────────────────────────────────────────────────

export function getAllBlogPosts(): PostMeta[] {
  return getFiles("blog")
    .map((file) => parseFile("blog", file))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): Post | null {
  const filename = `${slug}.mdx`;
  const full = path.join(contentRoot, "blog", filename);
  if (!fs.existsSync(full)) return null;
  return parseFile("blog", filename);
}

export function getAllBlogSlugs(): string[] {
  return getFiles("blog").map((f) => f.replace(/\.mdx$/, ""));
}

// ── CTF ────────────────────────────────────────────────────────────────

export function getAllCTFPosts(): PostMeta[] {
  return getFiles("ctf")
    .map((file) => parseFile("ctf", file))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getCTFPost(slug: string): Post | null {
  const filename = `${slug}.mdx`;
  const full = path.join(contentRoot, "ctf", filename);
  if (!fs.existsSync(full)) return null;
  return parseFile("ctf", filename);
}

export function getAllCTFSlugs(): string[] {
  return getFiles("ctf").map((f) => f.replace(/\.mdx$/, ""));
}
