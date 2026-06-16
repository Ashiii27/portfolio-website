"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Shield, Code2, Brain, Star } from "lucide-react";

// Inline GitHub SVG — lucide-react dropped brand icons in recent versions
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// ── Types ───────────────────────────────────────────────────────────
type Tag = "All" | "Security" | "Web" | "AI/ML";

interface Project {
  title: string;
  description: string;
  longDesc: string;
  tags: Tag[];
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  status: "Completed" | "In Progress" | "Archived";
  accent: "cyan" | "green" | "purple" | "amber";
}

// ── Project Data ─────────────────────────────────────────────────────
const projects: Project[] = [
  {
    title: "Network Intrusion Detection System",
    description: "Real-time packet inspection engine with rule-based anomaly detection.",
    longDesc:
      "A high-performance NIDS written in C++ using libpcap. Detects port scans, SYN floods, ARP spoofing, and custom YARA-like signature rules. Logs alerts to a local SIEM dashboard built in React.",
    tags: ["Security"],
    tech: ["C++", "libpcap", "React", "SQLite", "YARA"],
    github: "https://github.com/Ashiii27",
    featured: true,
    status: "In Progress",
    accent: "cyan",
  },
  {
    title: "GenAI Malware Analysis Pipeline",
    description: "LLM-powered static & dynamic analysis tool for suspicious executables.",
    longDesc:
      "Combines Ghidra scripting, Python sandbox automation, and the Gemini API to auto-generate human-readable threat reports from malware samples. Reduces manual triage time by ~60%.",
    tags: ["Security", "AI/ML"],
    tech: ["Python", "Ghidra", "Gemini API", "Docker", "FastAPI"],
    github: "https://github.com/Ashiii27",
    featured: true,
    status: "In Progress",
    accent: "green",
  },
  {
    title: "Portfolio Website",
    description: "This very site — a dark-themed, animated portfolio built with Next.js.",
    longDesc:
      "Designed and built from scratch using Next.js 15, TypeScript, Framer Motion, and a fully custom dark cyber design system. Features typewriter effects, scroll-driven animations, and a terminal-style UI.",
    tags: ["Web"],
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/Ashiii27/Portfolio-Website",
    demo: "#",
    featured: false,
    status: "In Progress",
    accent: "purple",
  },
  {
    title: "CTF Toolkit",
    description: "Curated collection of scripts and helpers for Capture The Flag competitions.",
    longDesc:
      "A growing library of Python utilities covering cryptography (RSA/AES/XOR), steganography extraction, binary exploitation helpers (ret2libc, format strings), and automated recon scripts.",
    tags: ["Security"],
    tech: ["Python", "Bash", "pwntools", "Crypto"],
    github: "https://github.com/Ashiii27",
    featured: false,
    status: "In Progress",
    accent: "amber",
  },
  {
    title: "SIEM Log Analyzer",
    description: "Parses and correlates Splunk/ELK logs to surface high-fidelity alerts.",
    longDesc:
      "A Python CLI tool that ingests structured log exports from Splunk or the ELK stack, applies correlation rules (MITRE ATT&CK mapping), and produces actionable incident summaries in Markdown.",
    tags: ["Security", "AI/ML"],
    tech: ["Python", "Elasticsearch", "MITRE ATT&CK", "Click"],
    github: "https://github.com/Ashiii27",
    featured: false,
    status: "Completed",
    accent: "cyan",
  },
  {
    title: "Threat Intel Dashboard",
    description: "Aggregates feeds from AlienVault OTX, VirusTotal & abuse.ch into one UI.",
    longDesc:
      "A React + FastAPI application that pulls from multiple threat intelligence APIs and presents IOCs (IPs, hashes, domains) in a searchable, filterable dashboard with severity scoring.",
    tags: ["Security", "Web"],
    tech: ["React", "FastAPI", "Python", "VirusTotal API", "OTX"],
    github: "https://github.com/Ashiii27",
    featured: false,
    status: "Completed",
    accent: "green",
  },
];

// ── Filter tabs ───────────────────────────────────────────────────────
const TABS: { label: Tag; icon: React.ElementType }[] = [
  { label: "All",      icon: Star    },
  { label: "Security", icon: Shield  },
  { label: "Web",      icon: Code2   },
  { label: "AI/ML",    icon: Brain   },
];

// ── Accent helpers ────────────────────────────────────────────────────
const accent = {
  cyan:   { text: "text-cyber-cyan",   border: "border-cyber-cyan/40",   bg: "bg-cyber-cyan/10",   bar: "bg-cyber-cyan"   },
  green:  { text: "text-cyber-green",  border: "border-cyber-green/40",  bg: "bg-cyber-green/10",  bar: "bg-cyber-green"  },
  purple: { text: "text-purple-400",   border: "border-purple-400/40",   bg: "bg-purple-400/10",   bar: "bg-purple-400"   },
  amber:  { text: "text-amber-400",    border: "border-amber-400/40",    bg: "bg-amber-400/10",    bar: "bg-amber-400"    },
};

const statusColor: Record<string, string> = {
  "Completed":   "text-cyber-green border-cyber-green/40",
  "In Progress": "text-amber-400 border-amber-400/40",
  "Archived":    "text-muted-foreground border-cyber-border",
};

// ── Project Card ──────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const a = accent[project.accent];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className={`cyber-card rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden group ${
        project.featured ? `${a.border} border-2` : ""
      }`}
    >
      {/* Featured badge */}
      {project.featured && (
        <span
          className={`absolute top-3 right-3 font-terminal text-[10px] px-2 py-0.5 rounded-full border ${a.bg} ${a.border} ${a.text}`}
        >
          ★ Featured
        </span>
      )}

      {/* Top row: icon + status */}
      <div className="flex items-start justify-between gap-3">
        <div className={`p-2.5 rounded-lg border ${a.bg} ${a.border} shrink-0`}>
          <Shield className={`w-4 h-4 ${a.text}`} />
        </div>
        <span
          className={`font-terminal text-[10px] border rounded-full px-2 py-0.5 ${statusColor[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      {/* Title + short description */}
      <div>
        <h3 className={`text-base font-semibold text-foreground group-hover:${a.text} transition-colors duration-200 mb-1`}>
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Expanded long description */}
      <AnimatePresence>
        {expanded && (
          <motion.p
            key="long"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-muted-foreground leading-relaxed overflow-hidden"
          >
            {project.longDesc}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-terminal text-[10px] px-2 py-0.5 rounded border border-cyber-border bg-cyber-surface text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Footer: toggle + links */}
      <div className="flex items-center justify-between pt-2 border-t border-cyber-border">
        <button
          onClick={() => setExpanded((v) => !v)}
          className={`font-terminal text-xs ${a.text} hover:underline transition-colors`}
        >
          {expanded ? "Show less ↑" : "Read more ↓"}
        </button>

        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${a.text} hover:opacity-80 transition-opacity`}
              aria-label="Live demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────
export default function Projects() {
  const [activeTag, setActiveTag] = useState<Tag>("All");

  const filtered = activeTag === "All"
    ? projects
    : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_70%,oklch(0.82_0.15_205/0.06),transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="font-terminal text-xs text-cyber-cyan tracking-widest uppercase">
            // projects
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
            What I&apos;ve Built<span className="text-cyber-cyan text-glow-cyan">.</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-lg">
            A collection of security tools, web applications, and AI-powered pipelines I&apos;ve shipped or am actively building.
          </p>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {TABS.map(({ label, icon: Icon }) => {
            const isActive = activeTag === label;
            return (
              <button
                key={label}
                onClick={() => setActiveTag(label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200
                  ${isActive
                    ? "bg-cyber-cyan/10 border-cyber-cyan/50 text-cyber-cyan"
                    : "border-cyber-border text-muted-foreground hover:text-foreground hover:border-cyber-cyan/30 hover:bg-cyber-surface"
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
                <span className="font-terminal text-[10px] opacity-70">
                  ({label === "All" ? projects.length : projects.filter(p => p.tags.includes(label as Tag)).length})
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Project grid ── */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Want to see more? All my work is on GitHub.
          </p>
          <a
            href="https://github.com/Ashiii27"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyber-cyan/40 text-cyber-cyan font-terminal text-sm hover:bg-cyber-cyan/10 hover:border-cyber-cyan transition-all duration-200"
          >
            <GitHubIcon className="w-4 h-4" />
            github.com/Ashiii27
          </a>
        </motion.div>

      </div>
    </section>
  );
}
