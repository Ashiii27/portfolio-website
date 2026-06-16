"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Code2, Wrench, Network, Brain, ChevronRight,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────
type Skill = { name: string; level: number; tag?: string };
type Category = {
  id: string;
  label: string;
  icon: React.ElementType;
  accent: "cyan" | "green" | "purple" | "amber";
  skills: Skill[];
};

// ── Data ──────────────────────────────────────────────────────────
const categories: Category[] = [
  {
    id: "security",
    label: "Security",
    icon: Shield,
    accent: "cyan",
    skills: [
      { name: "SOC Analysis / SIEM",          level: 88, tag: "Core"     },
      { name: "Threat Hunting & DFIR",        level: 82, tag: "Core"     },
      { name: "Malware Analysis",             level: 80, tag: "Core"     },
      { name: "Network Forensics",            level: 85, tag: "Core"     },
      { name: "Vulnerability Assessment",     level: 78, tag: "Applied"  },
      { name: "Incident Response",            level: 75, tag: "Applied"  },
      { name: "OSINT",                        level: 72, tag: "Applied"  },
      { name: "Reverse Engineering",          level: 65, tag: "Learning" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    icon: Code2,
    accent: "green",
    skills: [
      { name: "C++",        level: 85, tag: "Fluent"  },
      { name: "Python",     level: 90, tag: "Fluent"  },
      { name: "TypeScript", level: 80, tag: "Fluent"  },
      { name: "JavaScript", level: 82, tag: "Fluent"  },
      { name: "Bash / Shell", level: 78, tag: "Fluent" },
      { name: "SQL",        level: 70, tag: "Applied" },
      { name: "Rust",       level: 30, tag: "Learning"},
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    accent: "purple",
    skills: [
      { name: "Wireshark",      level: 88, tag: "Expert"  },
      { name: "Splunk / SIEM",  level: 82, tag: "Expert"  },
      { name: "Burp Suite",     level: 75, tag: "Applied" },
      { name: "Nmap / Nessus",  level: 80, tag: "Applied" },
      { name: "Metasploit",     level: 70, tag: "Applied" },
      { name: "Docker",         level: 72, tag: "Applied" },
      { name: "Git / GitHub",   level: 85, tag: "Expert"  },
      { name: "Linux (Kali)",   level: 90, tag: "Expert"  },
    ],
  },
  {
    id: "web",
    label: "Web / Infra",
    icon: Network,
    accent: "amber",
    skills: [
      { name: "React / Next.js", level: 82, tag: "Fluent"  },
      { name: "Node.js",         level: 78, tag: "Fluent"  },
      { name: "REST APIs",       level: 80, tag: "Fluent"  },
      { name: "PostgreSQL",      level: 68, tag: "Applied" },
      { name: "AWS (basics)",    level: 55, tag: "Learning"},
      { name: "Tailwind CSS",    level: 80, tag: "Fluent"  },
    ],
  },
  {
    id: "soft",
    label: "Problem Solving",
    icon: Brain,
    accent: "cyan",
    skills: [
      { name: "CTF Competitions",    level: 85, tag: "Active"  },
      { name: "System Design",       level: 72, tag: "Applied" },
      { name: "Technical Writing",   level: 75, tag: "Applied" },
      { name: "Team Leadership",     level: 80, tag: "Active"  },
      { name: "Open Source Contrib", level: 65, tag: "Applied" },
    ],
  },
];

// ── Accent helpers ────────────────────────────────────────────────
const accentClasses = {
  cyan:   { bar: "bg-cyber-cyan",   text: "text-cyber-cyan",   border: "border-cyber-cyan/30",   bg: "bg-cyber-cyan/10"   },
  green:  { bar: "bg-cyber-green",  text: "text-cyber-green",  border: "border-cyber-green/30",  bg: "bg-cyber-green/10"  },
  purple: { bar: "bg-purple-400",   text: "text-purple-400",   border: "border-purple-400/30",   bg: "bg-purple-400/10"   },
  amber:  { bar: "bg-amber-400",    text: "text-amber-400",    border: "border-amber-400/30",    bg: "bg-amber-400/10"    },
};

const tagClasses: Record<string, string> = {
  Core:     "text-cyber-cyan border-cyber-cyan/40",
  Fluent:   "text-cyber-green border-cyber-green/40",
  Expert:   "text-cyber-green border-cyber-green/40",
  Active:   "text-cyber-cyan border-cyber-cyan/40",
  Applied:  "text-muted-foreground border-cyber-border",
  Learning: "text-amber-400 border-amber-400/40",
};

// ── Skill Bar ─────────────────────────────────────────────────────
function SkillBar({ skill, accent, index }: { skill: Skill; accent: keyof typeof accentClasses; index: number }) {
  const a = accentClasses[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <ChevronRight className={`w-3 h-3 ${a.text} shrink-0`} />
        <span className="text-sm text-foreground group-hover:text-white transition-colors duration-150">
          {skill.name}
        </span>
        {skill.tag && (
          <span className={`font-terminal text-[10px] border rounded-full px-2 py-0.5 ${tagClasses[skill.tag] ?? "text-muted-foreground border-cyber-border"}`}>
            {skill.tag}
          </span>
        )}
      </div>

      {/* Track */}
      <div className="h-1.5 w-full rounded-full bg-cyber-border overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${a.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.7, delay: 0.1 + index * 0.05, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────
export default function Skills() {
  const [active, setActive] = useState<string>("security");
  const current = categories.find((c) => c.id === active)!;
  const a = accentClasses[current.accent];

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Background accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,oklch(0.82_0.15_205/0.06),transparent)]" />

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
            // skills &amp; tools
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
            My Arsenal<span className="text-cyber-cyan text-glow-cyan">.</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-lg">
            A breakdown of my technical capabilities — from security operations to full-stack engineering.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">

          {/* ── Sidebar tabs ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = cat.id === active;
              const ca = accentClasses[cat.accent];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left
                              border transition-all duration-200 whitespace-nowrap shrink-0
                              ${isActive
                                ? `${ca.bg} ${ca.border} ${ca.text}`
                                : "border-cyber-border text-muted-foreground hover:text-foreground hover:border-cyber-cyan/30 hover:bg-cyber-surface"
                              }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? ca.text : "text-muted-foreground"}`} />
                  <span>{cat.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="tab-dot"
                      className={`ml-auto w-1.5 h-1.5 rounded-full ${ca.bar} hidden lg:block`}
                    />
                  )}
                </button>
              );
            })}

            {/* Level legend */}
            <div className="hidden lg:block mt-6 cyber-card rounded-xl p-4 space-y-2">
              <p className="font-terminal text-xs text-muted-foreground tracking-widest mb-3">LEGEND</p>
              {[
                { tag: "Expert / Fluent / Core", cls: "text-cyber-green border-cyber-green/40" },
                { tag: "Applied / Active",        cls: "text-muted-foreground border-cyber-border" },
                { tag: "Learning",                cls: "text-amber-400 border-amber-400/40" },
              ].map(({ tag, cls }) => (
                <div key={tag} className="flex items-center gap-2">
                  <span className={`font-terminal text-[10px] border rounded-full px-2 py-0.5 ${cls}`}>
                    {tag.split(" / ")[0]}
                  </span>
                  <span className="text-xs text-muted-foreground">{tag.split(" / ").slice(1).join(" / ")}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Skill bars panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="cyber-card rounded-xl p-6 lg:p-8">
              {/* Panel header */}
              <div className={`flex items-center gap-3 mb-8 pb-5 border-b border-cyber-border`}>
                <div className={`p-2.5 rounded-lg ${a.bg} border ${a.border}`}>
                  {<current.icon className={`w-5 h-5 ${a.text}`} />}
                </div>
                <div>
                  <h3 className={`font-semibold text-base ${a.text}`}>{current.label}</h3>
                  <p className="font-terminal text-xs text-muted-foreground">
                    {current.skills.length} skills tracked
                  </p>
                </div>
              </div>

              {/* Bars */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {current.skills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      accent={current.accent}
                      index={i}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom: featured tool chips ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 cyber-card rounded-xl p-6"
        >
          <p className="font-terminal text-xs text-muted-foreground tracking-widest mb-4">
            ALSO FAMILIAR WITH
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Snort / Suricata", "Zeek", "TheHive", "MISP", "Velociraptor",
              "ELK Stack", "Volatility", "YARA", "OpenCTI", "Nessus",
              "pfSense", "AWS CloudTrail", "Ghidra", "CyberChef", "Autopsy",
            ].map((tool) => (
              <span
                key={tool}
                className="font-terminal text-xs px-3 py-1.5 rounded-md border border-cyber-border
                           text-muted-foreground bg-cyber-surface hover:border-cyber-cyan/40
                           hover:text-cyber-cyan transition-colors duration-200 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
