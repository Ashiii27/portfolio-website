"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const capabilities = [
  {
    number: "01",
    title: "Detection & response",
    summary: "Finding signal in network, endpoint, and application telemetry — then turning it into repeatable detection logic.",
    skills: ["SOC analysis", "Threat hunting", "SIEM", "Incident response", "MITRE ATT&CK", "YARA", "Network forensics"],
  },
  {
    number: "02",
    title: "Forensics & research",
    summary: "Investigating artifacts with a bias toward evidence integrity, reproducibility, and reports that another analyst can trust.",
    skills: ["Windows artifacts", "Malware analysis", "EVTX", "Volatility", "Wireshark", "Ghidra", "OSINT"],
  },
  {
    number: "03",
    title: "Systems & product",
    summary: "Shipping the engine and the interface — from performance-sensitive C++ and Python services to usable web products.",
    skills: ["C++", "Python", "TypeScript", "React / Next.js", "Node.js", "FastAPI", "Docker", "Linux"],
  },
];

export default function Skills() {
  return (
    <section id="capabilities" className="overflow-hidden bg-[#3155e7] text-[#f7f3e8]">
      <div className="site-shell py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="eyebrow text-[#d8f45a]">Capabilities</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-8 md:col-start-5"
          >
            <h2 className="text-balance text-[clamp(3rem,7vw,7.3rem)] font-semibold leading-[0.91] tracking-[-0.07em]">
              From packet to <span className="display-serif text-[#d8f45a]">product.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#f7f3e8]/68 md:text-lg">
              I work across the stack because defensive systems are only as strong as the path between collection, logic, and action.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-[#f7f3e8]/35">
        {capabilities.map((capability, index) => (
          <motion.article
            key={capability.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: index * 0.06 }}
            className="group border-b border-[#f7f3e8]/35 transition-colors duration-500 hover:bg-[#f7f3e8] hover:text-[#191917]"
          >
            <div className="site-shell grid gap-6 py-8 md:grid-cols-12 md:py-12">
              <div className="flex items-start justify-between md:col-span-2">
                <span className="font-mono text-[0.68rem] tracking-[0.1em]">/ {capability.number}</span>
                <ArrowDownRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45 md:hidden" />
              </div>
              <div className="md:col-span-4">
                <h3 className="text-[clamp(2rem,3.8vw,4rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
                  {capability.title}
                </h3>
              </div>
              <div className="md:col-span-3">
                <p className="max-w-md text-sm leading-[1.65] opacity-70">{capability.summary}</p>
              </div>
              <div className="md:col-span-3">
                <div className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.06em]">
                  {capability.skills.map((skill) => (
                    <span key={skill} className="border-b border-current/35 pb-0.5">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="site-shell grid gap-6 py-10 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-[#f7f3e8]/65 sm:grid-cols-3">
        <div>Daily drivers / Linux · Git · VS Code</div>
        <div>Currently exploring / Rust · AWS security</div>
        <div className="sm:text-right">Method / Build · test · document</div>
      </div>
    </section>
  );
}
