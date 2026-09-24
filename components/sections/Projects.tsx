"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.56 9.56 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const projects = [
  {
    number: "01",
    name: "SentinelX",
    label: "Network detection system",
    description:
      "A host-deployable NIDS that captures raw packets, runs real-time detections in a C++ engine, and streams MITRE ATT&CK-mapped alerts into a live SOC dashboard.",
    details: ["C++17 + libpcap", "YARA detection", "Node + React", "MITRE ATT&CK"],
    callouts: ["Packet capture", "Rule engine", "Live alerting"],
    href: "https://github.com/Ashiii27/sentinelX",
    kind: "sentinel" as const,
    background: "#191917",
    ink: "#f0eee7",
    accent: "#f04d2f",
  },
  {
    number: "02",
    name: "MCPGuard",
    label: "AI security proxy",
    description:
      "A zero-dependency, fail-closed security proxy for MCP. It inspects tool calls before execution to block leaked secrets, prompt injection, and unsafe file operations.",
    details: ["Python", "JSON-RPC 2.0", "Zero dependencies", "Audit logging"],
    callouts: ["Inspect", "Decide", "Forward"],
    href: "https://github.com/Ashiii27/mcpguard",
    kind: "mcp" as const,
    background: "#3155e7",
    ink: "#f7f3e8",
    accent: "#d8f45a",
  },
  {
    number: "03",
    name: "WinLogin Forensics",
    label: "DFIR workbench",
    description:
      "A Windows login artifact extraction and analysis framework with correlation, detection, live monitoring, and chain-of-custody aware forensic reporting.",
    details: ["Python 3.10+", "EVTX + Registry", "MITRE mapping", "HTML / PDF reports"],
    callouts: ["Acquire", "Correlate", "Report"],
    href: "https://github.com/Ashiii27/WinLogin-Forensics",
    kind: "forensics" as const,
    background: "#e4b73b",
    ink: "#191917",
    accent: "#3155e7",
  },
  {
    number: "04",
    name: "Honeypot Network",
    label: "Threat intelligence lab",
    description:
      "A multi-protocol honeypot network that emulates six services, captures adversary behavior, maps activity to ATT&CK, and turns observations into searchable IOCs.",
    details: ["Go", "6 emulated services", "IOC extraction", "Realtime dashboard"],
    callouts: ["Observe", "Enrich", "Visualize"],
    href: "https://github.com/Ashiii27/honeypot-network",
    kind: "honeypot" as const,
    background: "#d8f45a",
    ink: "#191917",
    accent: "#f04d2f",
  },
];

type Project = (typeof projects)[number];

function SentinelVisual() {
  return (
    <div className="project-visual" aria-hidden="true">
      <div className="visual-grid" />
      {[25, 42, 59, 76].map((top) => (
        <div className="packet-lane" style={{ top: `${top}%` }} key={top}>
          <span className="packet-dot" />
        </div>
      ))}
      <div className="absolute left-[8%] top-[8%] font-mono text-[0.6rem] uppercase tracking-[0.1em]">
        interface / eth0<br />capture active
      </div>
      <div className="alert-panel">
        <div className="alert-row"><span>12:08:22</span><span>TCP SYN scan</span><span>T1046</span></div>
        <div className="alert-row"><span>12:08:24</span><span>YARA match</span><span>T1204</span></div>
        <div className="alert-row"><span>12:08:27</span><span>HTTP anomaly</span><span>T1190</span></div>
      </div>
    </div>
  );
}

function MCPVisual() {
  return (
    <div className="project-visual" aria-hidden="true">
      <div className="visual-grid" />
      <div className="pipeline-payload" />
      <div className="pipeline">
        <div className="pipeline-node">MCP<br />client</div>
        <div className="pipeline-node">Policy<br />engine</div>
        <div className="pipeline-node">Tool<br />server</div>
      </div>
      <div className="block-stamp">BLOCKED</div>
      <div className="absolute bottom-[5%] left-[5%] font-mono text-[0.55rem] uppercase tracking-[0.08em]">
        deterministic inspection / fail closed
      </div>
    </div>
  );
}

function ForensicsVisual() {
  const rows = [
    ["4624", "Successful logon", "10.0.0.34"],
    ["4625", "Failed logon", "185.41.8.22"],
    ["4672", "Special privileges", "10.0.0.34"],
    ["4769", "Kerberos service", "10.0.0.12"],
  ];
  return (
    <div className="project-visual" aria-hidden="true">
      <div className="visual-grid" />
      <div className="forensic-list">
        <div className="forensic-head"><span>Event</span><span>Artifact</span><span>Source</span><span>Flag</span></div>
        {rows.map((row) => (
          <div className="forensic-row" key={row[0]}>
            {row.map((cell) => <span key={cell}>{cell}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function HoneypotVisual() {
  const active = new Set([4, 10, 17, 23, 31]);
  return (
    <div className="project-visual" aria-hidden="true">
      <div className="visual-grid" />
      <div className="honeypot-map">
        {Array.from({ length: 35 }).map((_, index) => (
          <span className={`honey-node ${active.has(index) ? "active" : ""}`} key={index} />
        ))}
      </div>
      <div className="absolute bottom-[3%] right-[4%] bg-[var(--project-bg)] px-2 font-mono text-[0.55rem] uppercase tracking-[0.08em]">
        06 services listening
      </div>
    </div>
  );
}

function ProjectVisual({ kind }: { kind: Project["kind"] }) {
  if (kind === "mcp") return <MCPVisual />;
  if (kind === "forensics") return <ForensicsVisual />;
  if (kind === "honeypot") return <HoneypotVisual />;
  return <SentinelVisual />;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
      <article
        className="project-card"
        style={{
          "--project-bg": project.background,
          "--project-ink": project.ink,
          "--visual-accent": project.accent,
          zIndex: index + 1,
        } as React.CSSProperties}
      >
        <div className="project-noise" />
        <div className="site-shell relative z-10 grid min-h-full gap-8 py-8 md:grid-cols-12 md:gap-6 md:py-12">
          <div className="flex flex-col justify-between border-b border-current/30 pb-5 md:col-span-2 md:border-b-0 md:border-r md:pb-0 md:pr-6">
            <div>
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.12em]">Case / {project.number}</div>
              <div className="mt-3 text-sm opacity-65">{project.label}</div>
            </div>
            <div className="mt-5 font-mono text-[0.58rem] uppercase leading-[1.7] tracking-[0.08em] opacity-65 md:mt-0">
              {project.callouts.map((item) => <div key={item}>{item}</div>)}
            </div>
          </div>

          <div className="flex flex-col justify-between md:col-span-4 md:px-3">
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.4 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(3rem,7vw,7.5rem)] font-bold leading-[0.84] tracking-[-0.075em]"
              >
                {project.name}
              </motion.h3>
              <p className="mt-7 max-w-xl text-base font-medium leading-[1.45] tracking-[-0.015em] opacity-85 md:text-lg">
                {project.description}
              </p>
            </div>

            <div className="mt-8 md:mt-10">
              <div className="grid grid-cols-2 border-t border-current/35 font-mono text-[0.58rem] uppercase tracking-[0.06em]">
                {project.details.map((detail) => (
                  <div className="border-b border-current/35 py-3 odd:pr-3 even:border-l even:pl-3" key={detail}>
                    {detail}
                  </div>
                ))}
              </div>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-3 border-b border-current pb-1 font-mono text-[0.68rem] uppercase tracking-[0.08em]"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                View repository
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
            className="self-center md:col-span-6"
          >
            <ProjectVisual kind={project.kind} />
          </motion.div>
        </div>
      </article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="bg-[#191917] text-[#f0eee7]">
      <div className="site-shell grid gap-8 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-3">
          <span className="eyebrow text-[#f04d2f]">Selected work</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="md:col-span-8 md:col-start-5"
        >
          <h2 className="text-balance text-[clamp(2.7rem,6.4vw,6.8rem)] font-semibold leading-[0.95] tracking-[-0.065em]">
            Security tools built from the wire <span className="display-serif text-[#f04d2f]">up.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#f0eee7]/62 md:text-lg">
            Selected systems where detection logic, engineering discipline, and a usable interface all matter.
          </p>
        </motion.div>
      </div>

      {projects.map((project, index) => (
        <ProjectCard project={project} index={index} key={project.name} />
      ))}

      <div className="site-shell flex flex-col items-start justify-between gap-6 border-t border-[#f0eee7]/30 py-12 md:flex-row md:items-center">
        <div>
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-[#f0eee7]/50">Project archive</div>
          <p className="mt-2 text-lg">CVE Explorer, automation scripts, CTF tooling, and more.</p>
        </div>
        <a
          href="https://github.com/Ashiii27?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="link-arrow"
        >
          Browse all repositories <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}
