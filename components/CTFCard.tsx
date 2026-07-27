"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, ExternalLink, Terminal, Lock, Cpu, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import type { Writeup } from "@/types";

const difficultyConfig = {
  Easy:   { color: "text-cyber-green",  bg: "bg-cyber-green/10",  border: "border-cyber-green/40"  },
  Medium: { color: "text-amber-400",    bg: "bg-amber-400/10",    border: "border-amber-400/40"    },
  Hard:   { color: "text-orange-400",   bg: "bg-orange-400/10",   border: "border-orange-400/40"   },
  Insane: { color: "text-red-400",      bg: "bg-red-400/10",      border: "border-red-400/40"      },
} as const;

const categoryConfig: Record<string, { icon: React.ElementType; color: string }> = {
  Web:       { icon: Globe,    color: "text-cyber-cyan"  },
  Pwn:       { icon: Terminal, color: "text-red-400"     },
  Crypto:    { icon: Lock,     color: "text-purple-400"  },
  Forensics: { icon: Cpu,      color: "text-amber-400"   },
  Misc:      { icon: Flag,     color: "text-cyber-green" },
};

interface CTFCardProps {
  writeup: Writeup;
  index?: number;
  href?: string;
}

export default function CTFCard({ writeup, index = 0, href }: CTFCardProps) {
  const [expanded, setExpanded] = useState(false);
  const diff = difficultyConfig[writeup.difficulty];
  const cat = categoryConfig[writeup.category] ?? categoryConfig["Misc"];
  const CatIcon = cat.icon;

  const topBar =
    writeup.difficulty === "Easy"   ? "bg-cyber-green" :
    writeup.difficulty === "Medium" ? "bg-amber-400"   :
    writeup.difficulty === "Hard"   ? "bg-orange-400"  : "bg-red-400";

  const cardContent = (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="cyber-card rounded-xl overflow-hidden group"
    >
      <div className={`h-0.5 w-full ${topBar}`} />

      <div className="p-5 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-cyber-surface border border-cyber-border">
              <CatIcon className={`w-3.5 h-3.5 ${cat.color}`} />
            </div>
            <div>
              <p className="font-terminal text-[10px] text-muted-foreground tracking-widest">
                {writeup.event} · {writeup.year}
              </p>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-cyber-cyan transition-colors duration-200 leading-snug mt-0.5">
                {writeup.title}
              </h3>
            </div>
          </div>
          <span
            className={`font-terminal text-[10px] shrink-0 px-2 py-0.5 rounded-full border ${diff.bg} ${diff.border} ${diff.color}`}
          >
            {writeup.difficulty}
          </span>
        </div>

        {/* Tags + points */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {writeup.tags.map((tag) => (
              <span
                key={tag}
                className="font-terminal text-[10px] px-1.5 py-0.5 rounded border border-cyber-border bg-cyber-surface text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="font-terminal text-[10px] text-cyber-cyan shrink-0">
            {writeup.points} pts
          </span>
        </div>

        {/* Expandable summary */}
        <AnimatePresence>
          {expanded && (
            <motion.p
              key="summary"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xs text-muted-foreground leading-relaxed overflow-hidden border-t border-cyber-border pt-3"
            >
              {writeup.summary}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-cyber-border">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 font-terminal text-xs text-muted-foreground hover:text-cyber-cyan transition-colors"
            >
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              />
              {expanded ? "Hide" : "Details"}
            </button>
            {writeup.solvedAt && (
              <span className="font-terminal text-[10px] text-muted-foreground">
                ⏱ {writeup.solvedAt}
              </span>
            )}
          </div>
          {writeup.link && (
            <a
              href={writeup.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-cyber-cyan transition-colors"
              aria-label="Read writeup"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
