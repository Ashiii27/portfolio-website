"use client";

import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/useTypewriter";

const roles = [
  "SOC Analyst",
  "Blue Team Engineer",
  "Malware Analyst",
  "Full-Stack Developer",
  "CTF Player",
];

const stats = [
  { label: "THM Rank", value: "Top 2%" },
  { label: "Projects", value: "10+" },
  { label: "CTF Wins", value: "Multiple College CTFs" },
  { label: "Stack", value: "C++ · Py · TS" },
];

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socials = [
  { label: "GitHub", href: "https://github.com/Ashiii27", icon: GitHubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/ashiii27", icon: LinkedInIcon },
  { label: "TryHackMe", href: "https://tryhackme.com/p/Ashiii27", icon: ExternalLink },
];

// ── Terminal line helper ──────────────────────────────────────────
function TerminalLine({
  children, delay, prompt = false, output = false,
}: {
  children: React.ReactNode;
  delay: number;
  prompt?: boolean;
  output?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={`flex items-start gap-2 ${output ? "pl-4" : ""}`}
    >
      {prompt && <span className="text-cyber-cyan select-none shrink-0">$</span>}
      {output && <span className="text-cyber-green/60 select-none shrink-0">→</span>}
      <span className={prompt ? "text-foreground" : "text-muted-foreground"}>
        {children}
      </span>
    </motion.div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────
export default function Hero() {
  const role = useTypewriter({ words: roles });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.82_0.15_205/0.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.82_0.15_205/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,oklch(0.82_0.15_205/0.12),transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Content ── */}
          <div className="space-y-6">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan text-xs font-terminal">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                Open to Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold tracking-tight"
            >
              <span className="text-foreground">Ashish</span>{" "}
              <span className="text-cyber-cyan text-glow-cyan">Kumar</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-8"
            >
              <p className="font-terminal text-lg text-muted-foreground">
                <span className="text-cyber-cyan/60">&gt; </span>
                <span className="text-foreground">{role}</span>
                <span className="animate-pulse text-cyber-cyan ml-0.5">|</span>
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground text-base leading-relaxed max-w-lg"
            >
              B.Tech CSE @ MMMUT Gorakhpur. I build tools that detect, analyze, and
              respond to threats — from network intrusion detection systems to GenAI-powered
              malware analysis pipelines. Top 2% on TryHackMe globally.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                onClick={() =>
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-cyber-cyan text-background hover:bg-cyber-cyan/90 font-terminal text-sm glow-cyan"
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                className="border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/10 hover:border-cyber-cyan font-terminal text-sm"
                asChild
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  resume.pdf
                </a>
              </Button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-5 pt-1"
            >
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-cyber-cyan transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-terminal text-xs">{label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Terminal window ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="cyber-card rounded-lg overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-cyber-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-cyber-green/70" />
                </div>
                <span className="font-terminal text-xs text-muted-foreground ml-2">
                  ashish@kali ~ $
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-terminal text-sm space-y-2 min-h-72">
                <TerminalLine delay={0.6} prompt>whoami</TerminalLine>
                <TerminalLine delay={0.9} output>Ashish — security engineer</TerminalLine>

                <TerminalLine delay={1.3} prompt>cat skills.txt</TerminalLine>
                <TerminalLine delay={1.6} output>SOC Analysis · Blue Team · DFIR</TerminalLine>
                <TerminalLine delay={1.75} output>Network IDS · Malware Analysis</TerminalLine>
                <TerminalLine delay={1.9} output>Next.js · React · Node.js · C++</TerminalLine>

                <TerminalLine delay={2.2} prompt>cat achievements.txt</TerminalLine>
                <TerminalLine delay={2.5} output>🏆 CTF 1st Place — MMMUT CES</TerminalLine>
                <TerminalLine delay={2.65} output>🛡  TryHackMe Top 2% Globally</TerminalLine>
                <TerminalLine delay={2.8} output>🏀 Basketball Team Captain 2025</TerminalLine>

                <TerminalLine delay={3.1} prompt>
                  <span className="animate-pulse">_</span>
                </TerminalLine>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-cyber-cyan font-bold text-lg font-terminal">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2 mt-12"
        >
          <span className="text-muted-foreground text-xs font-terminal">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-cyber-cyan/60" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}