"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const notes = [
  {
    index: "01",
    type: "Malware analysis",
    title: "Android APK Analysis: Uncovering Malicious Behavior",
    date: "20 Jun 2025",
    readTime: "10 min",
    href: "/blog/apk-analysis",
  },
  {
    index: "02",
    type: "Security engineering",
    title: "Building a Real-Time NIDS with C++ and libpcap",
    date: "12 Jun 2025",
    readTime: "12 min",
    href: "/blog/nids-architecture",
  },
  {
    index: "03",
    type: "CTF / Web security",
    title: "JWT None Algorithm Bypass — HackTheBox CTF",
    date: "15 May 2025",
    readTime: "6 min",
    href: "/ctf/ctf-1",
  },
];

export default function Blog() {
  return (
    <section id="notes" className="bg-[#f0eee7] text-[#191917]">
      <div className="site-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="eyebrow text-[#f04d2f]">Field notes</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-8 md:col-start-5"
          >
            <h2 className="text-balance text-[clamp(3rem,6.8vw,7rem)] font-semibold leading-[0.93] tracking-[-0.07em]">
              Learning, made <span className="display-serif text-[#f04d2f]">legible.</span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#585750] md:text-lg">
              Build logs, forensic walkthroughs, and notes from breaking systems in controlled environments.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 md:mt-24">
          {notes.map((note, index) => (
            <motion.div
              key={note.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <Link href={note.href} className="note-row group">
                <span className="font-mono text-[0.65rem] tracking-[0.08em] opacity-55">/ {note.index}</span>
                <div>
                  <div className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-[#f04d2f] group-hover:text-[#d8f45a]">
                    {note.type}
                  </div>
                  <h3 className="mt-2 max-w-4xl text-[clamp(1.35rem,3vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
                    {note.title}
                  </h3>
                </div>
                <div className="flex items-center gap-5 font-mono text-[0.58rem] uppercase tracking-[0.06em] opacity-60">
                  <span>{note.date}</span>
                  <span>{note.readTime}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-100 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:opacity-0 md:group-hover:opacity-100" />
                </div>
              </Link>
            </motion.div>
          ))}
          <div className="border-t border-[#191917]" />
        </div>

        <div className="mt-8 flex flex-wrap gap-6">
          <Link href="/blog" className="link-arrow">
            View all articles <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/ctf" className="link-arrow">
            View CTF archive <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
