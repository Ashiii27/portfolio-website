"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, Star, GitBranch } from "lucide-react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const accentCls = {
  cyan:   { text: "text-cyber-cyan",  border: "border-cyber-cyan/30",  bg: "bg-cyber-cyan/10",  bar: "bg-cyber-cyan"  },
  green:  { text: "text-cyber-green", border: "border-cyber-green/30", bg: "bg-cyber-green/10", bar: "bg-cyber-green" },
  purple: { text: "text-purple-400",  border: "border-purple-400/30",  bg: "bg-purple-400/10",  bar: "bg-purple-400"  },
  amber:  { text: "text-amber-400",   border: "border-amber-400/30",   bg: "bg-amber-400/10",   bar: "bg-amber-400"   },
} as const;

type AccentKey = keyof typeof accentCls;

export interface ProjectCardData {
  title: string;
  description: string;
  longDesc?: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  status?: "Completed" | "In Progress" | "Archived";
  accent?: AccentKey;
}

interface ProjectCardProps {
  project: ProjectCardData;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const a = accentCls[project.accent ?? "cyan"];

  const statusColor =
    project.status === "Completed"   ? "text-cyber-green border-cyber-green/40 bg-cyber-green/10"  :
    project.status === "In Progress" ? "text-amber-400  border-amber-400/40  bg-amber-400/10"       :
                                       "text-muted-foreground border-cyber-border bg-cyber-surface";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className="cyber-card rounded-xl overflow-hidden group flex flex-col"
    >
      {/* Accent top bar */}
      <div className={`h-0.5 w-full ${a.bar}`} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {project.featured && (
                <Star className={`w-3 h-3 ${a.text} shrink-0`} />
              )}
              {project.status && (
                <span
                  className={`font-terminal text-[10px] px-1.5 py-0.5 rounded-full border ${statusColor}`}
                >
                  {project.status}
                </span>
              )}
            </div>
            <h3 className={`text-sm font-semibold text-foreground group-hover:${a.text} transition-colors duration-200 leading-snug`}>
              {project.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Long description (expandable) */}
        <AnimatePresence>
          {expanded && project.longDesc && (
            <motion.p
              key="longdesc"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xs text-muted-foreground/80 leading-relaxed overflow-hidden border-t border-cyber-border pt-3"
            >
              {project.longDesc}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-terminal text-[10px] px-1.5 py-0.5 rounded border border-cyber-border bg-cyber-surface text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-cyber-border">
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-terminal text-[10px] text-muted-foreground hover:text-cyber-cyan transition-colors"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 font-terminal text-[10px] ${a.text} hover:underline transition-colors`}
              >
                <ExternalLink className="w-3 h-3" />
                Demo
              </a>
            )}
          </div>
          {project.longDesc && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 font-terminal text-[10px] text-muted-foreground hover:text-cyber-cyan transition-colors"
            >
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              />
              {expanded ? "Less" : "More"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
