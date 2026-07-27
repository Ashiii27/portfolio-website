import { getAllCTFPosts } from "@/lib/mdx";
import Link from "next/link";
import { Flag, Clock, ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CTF Writeups",
  description:
    "CTF competition writeups and solutions by Ashish Kumar — binary exploitation, web security, cryptography, and forensics.",
};

export default function CTFPage() {
  const posts = getAllCTFPosts();

  return (
    <main className="min-h-screen py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,oklch(0.75_0.18_300/0.05),transparent)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="font-terminal text-xs text-cyber-cyan tracking-widest uppercase">
            // ctf writeups
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
            Capture The Flag
            <span className="text-cyber-cyan text-glow-cyan">.</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-3 max-w-lg">
            Selected writeups from competitions — documenting my approach to
            breaking things (legally).
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="cyber-card rounded-xl p-12 text-center">
            <Flag className="w-10 h-10 text-cyber-cyan/40 mx-auto mb-4" />
            <p className="text-muted-foreground font-terminal text-sm">
              No writeups published yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <Link key={post.slug} href={`/ctf/${post.slug}`}>
                <div className="cyber-card rounded-xl p-6 group hover:border-cyber-cyan/40 transition-colors duration-200">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-terminal text-[10px] tracking-widest text-cyber-cyan">
                      {post.category.toUpperCase()}
                    </span>
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
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
