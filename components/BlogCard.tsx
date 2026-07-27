"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import type { PostMeta } from "@/types";

interface BlogCardProps {
  post: PostMeta;
  index?: number;
}

const accentMap: Record<string, { text: string; dot: string }> = {
  Security: { text: "text-cyber-cyan", dot: "bg-cyber-cyan" },
  CTF: { text: "text-amber-400", dot: "bg-amber-400" },
  Dev: { text: "text-cyber-green", dot: "bg-cyber-green" },
  "AI/ML": { text: "text-purple-400", dot: "bg-purple-400" },
};

function getAccent(tags: string[]) {
  for (const tag of tags) {
    if (accentMap[tag]) return accentMap[tag];
  }
  return { text: "text-cyber-cyan", dot: "bg-cyber-cyan" };
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const a = getAccent(post.tags);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="cyber-card rounded-xl p-5 flex flex-col gap-3 group hover:border-cyber-cyan/40 transition-colors duration-200 h-full">
          {/* Category label */}
          <div className="flex items-center justify-between">
            <span className={`font-terminal text-[10px] tracking-widest ${a.text}`}>
              {post.category.toUpperCase()}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
          </div>

          {/* Title */}
          <h3
            className={`text-sm font-semibold text-foreground leading-snug group-hover:${a.text} transition-colors duration-200`}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-muted-foreground leading-relaxed flex-1">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-0.5 font-terminal text-[10px] px-1.5 py-0.5 rounded border border-cyber-border bg-cyber-surface text-muted-foreground"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-cyber-border">
            <div className="flex items-center gap-3">
              <span className="font-terminal text-[10px] text-muted-foreground">
                {post.date}
              </span>
              <span className="flex items-center gap-1 font-terminal text-[10px] text-muted-foreground">
                <Clock className="w-2.5 h-2.5" />
                {post.readTime}m
              </span>
            </div>
            <ArrowRight
              className={`w-3.5 h-3.5 ${a.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200`}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
