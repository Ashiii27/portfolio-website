"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, ExternalLink, Terminal, Lock, Cpu, Globe, ChevronDown } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────
type Difficulty = "Easy" | "Medium" | "Hard" | "Insane";
type CTFCategory = "All" | "Web" | "Pwn" | "Crypto" | "Forensics" | "Misc";

interface Writeup {
  id: string;
  title: string;
  event: string;
  year: number;
  category: CTFCategory;
  difficulty: Difficulty;
  points: number;
  tags: string[];
  summary: string;
  link?: string;
  solvedAt?: string;
}

// ── Data ──────────────────────────────────────────────────────────────
const writeups: Writeup[] = [
  {
    id: "1",
    title: "JWT None Algorithm Bypass",
    event: "HackTheBox CTF",
    year: 2024,
    category: "Web",
    difficulty: "Medium",
    points: 350,
    tags: ["JWT", "Authentication", "OWASP"],
    summary:
      "Exploited a misconfigured JWT implementation accepting the 'none' algorithm to forge admin tokens and access restricted endpoints without a valid signature.",
    solvedAt: "02:14",
  },
  {
    id: "2",
    title: "ret2libc Buffer Overflow",
    event: "PicoCTF 2024",
    year: 2024,
    category: "Pwn",
    difficulty: "Hard",
    points: 500,
    tags: ["Buffer Overflow", "ROP", "ASLR Bypass"],
    summary:
      "Bypassed ASLR and stack canaries using a ret2libc technique with a carefully crafted ROP chain via pwntools to gain a root shell on the remote binary.",
    solvedAt: "04:37",
  },
  {
    id: "3",
    title: "RSA Small Public Exponent",
    event: "CryptoCTF 2024",
    year: 2024,
    category: "Crypto",
    difficulty: "Medium",
    points: 400,
    tags: ["RSA", "Number Theory", "SageMath"],
    summary:
      "Recovered plaintext from an RSA ciphertext with e=3 and a small message using Håstad's broadcast attack across three different moduli.",
    solvedAt: "01:52",
  },
  {
    id: "4",
    title: "PCAP Traffic Analysis",
    event: "NahamCon CTF",
    year: 2024,
    category: "Forensics",
    difficulty: "Easy",
    points: 200,
    tags: ["Wireshark", "PCAP", "HTTP"],
    summary:
      "Analyzed a packet capture to reconstruct a stolen file transferred over unencrypted HTTP, then decoded a base64-hidden flag inside a PNG metadata field.",
    solvedAt: "00:28",
  },
  {
    id: "5",
    title: "SSRF → Internal AWS Metadata",
    event: "CTFd Platform",
    year: 2025,
    category: "Web",
    difficulty: "Hard",
    points: 475,
    tags: ["SSRF", "AWS", "Cloud Security"],
    summary:
      "Chained a Server-Side Request Forgery vulnerability with an open redirect to reach the EC2 instance metadata service and exfiltrate IAM credentials.",
    solvedAt: "03:10",
  },
  {
    id: "6",
    title: "Steganography LSB Extraction",
    event: "PicoCTF 2024",
    year: 2024,
    category: "Forensics",
    difficulty: "Easy",
    points: 150,
    tags: ["Steganography", "LSB", "Python"],
    summary:
      "Wrote a Python script to extract the LSB of each RGB channel in a PNG image, revealing a QR code that decoded to the hidden flag.",
    solvedAt: "00:15",
  },
];

// ── Difficulty config ──────────────────────────────────────────────────
const difficultyConfig: Record<Difficulty, { color: string; bg: string; border: string }> = {
  Easy:   { color: "text-cyber-green",  bg: "bg-cyber-green/10",  border: "border-cyber-green/40"  },
  Medium: { color: "text-amber-400",    bg: "bg-amber-400/10",    border: "border-amber-400/40"    },
  Hard:   { color: "text-orange-400",   bg: "bg-orange-400/10",   border: "border-orange-400/40"   },
  Insane: { color: "text-red-400",      bg: "bg-red-400/10",      border: "border-red-400/40"      },
};

// ── Category config ────────────────────────────────────────────────────
const categoryConfig: Record<string, { icon: React.ElementType; color: string }> = {
  Web:      { icon: Globe,    color: "text-cyber-cyan"  },
  Pwn:      { icon: Terminal, color: "text-red-400"     },
  Crypto:   { icon: Lock,     color: "text-purple-400"  },
  Forensics:{ icon: Cpu,      color: "text-amber-400"   },
  Misc:     { icon: Flag,     color: "text-cyber-green" },
};

const CATEGORIES: CTFCategory[] = ["All", "Web", "Pwn", "Crypto", "Forensics", "Misc"];

// ── Writeup Card ──────────────────────────────────────────────────────
function WriteupCard({ writeup, index }: { writeup: Writeup; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const diff = difficultyConfig[writeup.difficulty];
  const cat = categoryConfig[writeup.category] ?? categoryConfig["Misc"];
  const CatIcon = cat.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="cyber-card rounded-xl overflow-hidden group"
    >
      {/* Top color bar based on difficulty */}
      <div className={`h-0.5 w-full ${
        writeup.difficulty === "Easy" ? "bg-cyber-green" :
        writeup.difficulty === "Medium" ? "bg-amber-400" :
        writeup.difficulty === "Hard" ? "bg-orange-400" : "bg-red-400"
      }`} />

      <div className="p-5 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-md bg-cyber-surface border border-cyber-border`}>
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
          <span className={`font-terminal text-[10px] shrink-0 px-2 py-0.5 rounded-full border ${diff.bg} ${diff.border} ${diff.color}`}>
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
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────
export default function CTFWriteups() {
  const [activeCategory, setActiveCategory] = useState<CTFCategory>("All");

  const filtered =
    activeCategory === "All"
      ? writeups
      : writeups.filter((w) => w.category === activeCategory);

  const totalPoints = writeups.reduce((sum, w) => sum + w.points, 0);

  return (
    <section id="ctf" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,oklch(0.75_0.18_300/0.05),transparent)]" />

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
            {"// ctf writeups"}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
            Capture The Flag<span className="text-cyber-cyan text-glow-cyan">.</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-lg">
            Selected writeups from competitions I&apos;ve participated in — documenting my approach to breaking things (legally).
          </p>
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
        >
          {[
            { label: "Writeups",   value: writeups.length,  accent: "text-cyber-cyan"  },
            { label: "Total Pts",  value: totalPoints,       accent: "text-cyber-green" },
            { label: "Events",     value: new Set(writeups.map(w => w.event)).size, accent: "text-purple-400" },
            { label: "Hard+",      value: writeups.filter(w => w.difficulty === "Hard" || w.difficulty === "Insane").length, accent: "text-orange-400" },
          ].map(({ label, value, accent }) => (
            <div key={label} className="cyber-card rounded-xl p-4 text-center">
              <p className={`font-terminal text-2xl font-bold ${accent}`}>{value}</p>
              <p className="font-terminal text-[10px] text-muted-foreground tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Category filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const cfg = cat !== "All" ? categoryConfig[cat] : null;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200
                  ${isActive
                    ? "bg-cyber-cyan/10 border-cyber-cyan/50 text-cyber-cyan"
                    : "border-cyber-border text-muted-foreground hover:text-foreground hover:border-cyber-cyan/30 hover:bg-cyber-surface"
                  }`}
              >
                {cfg && <cfg.icon className={`w-3 h-3 ${isActive ? "text-cyber-cyan" : cfg.color}`} />}
                {cat}
                <span className="font-terminal text-[10px] opacity-60">
                  ({cat === "All" ? writeups.length : writeups.filter(w => w.category === cat).length})
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Grid ── */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((writeup, i) => (
              <WriteupCard key={writeup.id} writeup={writeup} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 cyber-card rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="font-terminal text-xs text-cyber-cyan tracking-widest mb-1">ACTIVE COMPETITOR</p>
            <p className="text-sm text-muted-foreground">
              Competing on HackTheBox, TryHackMe &amp; CTFtime. More writeups published regularly.
            </p>
          </div>
          <a
            href="https://ctftime.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyber-cyan/40 text-cyber-cyan font-terminal text-xs hover:bg-cyber-cyan/10 hover:border-cyber-cyan transition-all duration-200 shrink-0"
          >
            <Flag className="w-3.5 h-3.5" />
            CTFtime Profile
          </a>
        </motion.div>

      </div>
    </section>
  );
}
