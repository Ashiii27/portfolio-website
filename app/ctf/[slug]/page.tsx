import { getCTFPost, getAllCTFSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Calendar, Flag } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCTFSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getCTFPost(slug);
  if (!post) return { title: "Writeup Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function CTFPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getCTFPost(slug);

  if (!post) return notFound();

  return (
    <main className="min-h-screen py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,oklch(0.75_0.18_300/0.05),transparent)]" />

      <article className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/ctf"
          className="inline-flex items-center gap-2 font-terminal text-xs text-muted-foreground hover:text-cyber-cyan transition-colors mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to CTF Writeups
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-2 mb-3">
          <Flag className="w-3.5 h-3.5 text-cyber-cyan" />
          <span className="font-terminal text-[10px] tracking-widest text-cyber-cyan">
            {post.category.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Details row */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-cyber-border">
          <span className="flex items-center gap-1.5 font-terminal text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5 font-terminal text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime} min read
          </span>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 font-terminal text-[10px] px-2 py-0.5 rounded-full border border-cyber-border bg-cyber-surface text-muted-foreground"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* MDX content */}
        {post.content.trim() ? (
          <div className="prose prose-invert prose-sm max-w-none prose-headings:font-bold prose-headings:text-foreground prose-a:text-cyber-cyan prose-code:text-cyber-cyan prose-code:bg-cyber-surface prose-pre:bg-cyber-surface prose-pre:border prose-pre:border-cyber-border">
            <MDXRemote source={post.content} />
          </div>
        ) : (
          <div className="cyber-card rounded-xl p-12 text-center">
            <p className="text-muted-foreground font-terminal text-sm">
              Content coming soon.
            </p>
          </div>
        )}
      </article>
    </main>
  );
}
