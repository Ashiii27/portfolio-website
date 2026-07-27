import { getAllBlogPosts } from "@/lib/mdx";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Tag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Security research, CTF breakdowns, and engineering deep-dives by Ashish Kumar.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_80%,oklch(0.89_0.28_142/0.05),transparent)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="font-terminal text-xs text-cyber-cyan tracking-widest uppercase">
            // blog
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
            Thoughts &amp; Writeups
            <span className="text-cyber-cyan text-glow-cyan">.</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-3 max-w-lg">
            Security research, CTF breakdowns, and engineering deep-dives —
            written to share what I learn.
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="cyber-card rounded-xl p-12 text-center">
            <BookOpen className="w-10 h-10 text-cyber-cyan/40 mx-auto mb-4" />
            <p className="text-muted-foreground font-terminal text-sm">
              No posts published yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="cyber-card rounded-xl p-6 group hover:border-cyber-cyan/40 transition-colors duration-200">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-terminal text-[10px] tracking-widest text-cyber-cyan">
                      {post.category.toUpperCase()}
                    </span>
                    {post.featured && (
                      <span className="font-terminal text-[10px] px-2 py-0.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-cyber-cyan transition-colors duration-200 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-terminal text-xs text-muted-foreground">
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1 font-terminal text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min read
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyber-cyan opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 font-terminal text-[10px] px-1.5 py-0.5 rounded border border-cyber-border bg-cyber-surface text-muted-foreground"
                      >
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
