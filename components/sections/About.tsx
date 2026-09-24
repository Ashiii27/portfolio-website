"use client";

import { motion } from "framer-motion";

const proof = [
  { value: "Top 2%", label: "TryHackMe global ranking" },
  { value: "200+", label: "Hands-on security rooms" },
  { value: "01", label: "CES CTF first place" },
  { value: "3", label: "Core languages — C++, Python, TS" },
];

const timeline = [
  {
    marker: "Now",
    title: "Building detection & forensic systems",
    body: "SentinelX, MCPGuard, WinLogin Forensics, and hands-on blue-team research.",
  },
  {
    marker: "2024",
    title: "First place — CES Capture The Flag",
    body: "Team competition across web exploitation, reverse engineering, and cryptography.",
  },
  {
    marker: "2023",
    title: "Blue-team practice became the focus",
    body: "SOC analysis, threat hunting, malware analysis, network forensics, and incident response labs.",
  },
  {
    marker: "B.Tech",
    title: "Computer Science & Engineering",
    body: "Madan Mohan Malaviya University of Technology, Gorakhpur.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-[#f0eee7] text-[#191917]">
      <div className="site-shell border-x border-[#191917]/20">
        <div className="grid border-b border-[#191917]/20 md:grid-cols-12">
          <div className="border-b border-[#191917]/20 p-5 md:col-span-3 md:border-b-0 md:border-r md:p-8">
            <span className="eyebrow text-[#f04d2f]">Profile</span>
          </div>
          <div className="p-5 md:col-span-9 md:p-10 lg:p-16">
            <motion.h2
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-6xl text-[clamp(2.8rem,7.4vw,7.8rem)] font-semibold leading-[0.94] tracking-[-0.07em]"
            >
              Curious enough to break it. Disciplined enough to <span className="display-serif text-[#3155e7]">defend it.</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid md:grid-cols-12">
          <div className="border-b border-[#191917]/20 p-5 md:col-span-3 md:border-b-0 md:border-r md:p-8">
            <div className="sticky top-28">
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-[#585750]">Ashish Kumar</div>
              <div className="mt-3 max-w-[14rem] text-sm leading-relaxed">
                Security-focused computer science student, builder, and competitive problem solver.
              </div>
              <div className="mt-8 flex items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.08em]">
                <span className="h-2.5 w-2.5 bg-[#f04d2f]" />
                Gorakhpur, India
              </div>
            </div>
          </div>

          <div className="md:col-span-9">
            <div className="grid border-b border-[#191917]/20 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border-b border-[#191917]/20 p-5 md:border-b-0 md:border-r md:p-10 lg:p-14"
              >
                <p className="text-[clamp(1.35rem,2.4vw,2.25rem)] font-medium leading-[1.24] tracking-[-0.035em]">
                  I am most interested in the exact moment noisy technical data becomes a clear, defensible decision.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="p-5 text-base leading-[1.65] text-[#585750] md:p-10 lg:p-14"
              >
                <p>
                  That is why my work crosses boundaries: low-level packet processing in C++, analysis workflows in Python,
                  and full-stack interfaces that make the result useful to a human operator.
                </p>
                <p className="mt-5">
                  Away from the terminal, I captain a basketball team. Both disciplines reward the same things — awareness,
                  preparation, and knowing when to act.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 border-b border-[#191917]/20 lg:grid-cols-4">
              {proof.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="min-h-40 border-b border-r border-[#191917]/20 p-5 last:border-r-0 even:border-r-0 lg:border-b-0 lg:even:border-r lg:last:border-r-0"
                >
                  <div className="text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-none tracking-[-0.06em]">{item.value}</div>
                  <div className="mt-4 max-w-[10rem] font-mono text-[0.6rem] uppercase leading-[1.5] tracking-[0.07em] text-[#585750]">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-5 md:p-10 lg:p-14">
              <div className="mb-8 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-[#585750]">Trajectory / Selected moments</div>
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="grid gap-3 border-t border-[#191917] py-6 md:grid-cols-[7rem_1fr_1fr] md:gap-6"
                >
                  <span className="font-mono text-[0.64rem] uppercase tracking-[0.08em] text-[#f04d2f]">{item.marker}</span>
                  <h3 className="text-lg font-semibold tracking-[-0.025em]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#585750]">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
