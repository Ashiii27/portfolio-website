"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const expertise = [
  "Detection engineering",
  "Digital forensics",
  "Secure systems",
  "Full-stack development",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const metaY = useTransform(scrollYProgress, [0, 1], [0, -45]);

  return (
    <>
      <motion.div
        className="intro-curtain"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.85, delay: 0.55, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -10] }}
          transition={{ duration: 1, times: [0, 0.2, 0.72, 1] }}
          className="flex items-center gap-4"
        >
          <span className="grid h-10 w-10 place-items-center bg-[#f04d2f] font-bold text-[#191917]">AK</span>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em]">Portfolio / 2026</span>
        </motion.div>
      </motion.div>

      <section
        ref={ref}
        id="hero"
        className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f0eee7] pt-[4.55rem]"
      >
        <div className="site-shell flex flex-1 flex-col border-x border-[#191917]/20">
          <motion.div
            style={{ y: metaY }}
            className="grid grid-cols-2 border-b border-[#191917]/20 font-mono text-[0.62rem] uppercase tracking-[0.1em] md:grid-cols-4"
          >
            <div className="border-r border-[#191917]/20 p-3.5">Portfolio / Vol. 01</div>
            <div className="hidden border-r border-[#191917]/20 p-3.5 md:block">Based in India</div>
            <div className="border-r border-[#191917]/20 p-3.5 md:border-r">B.Tech CSE · MMMUT</div>
            <div className="hidden items-center justify-end gap-2 p-3.5 md:flex">
              <span className="h-2 w-2 animate-pulse bg-[#f04d2f]" />
              Open to opportunities
            </div>
          </motion.div>

          <div className="relative flex flex-1 flex-col justify-center py-10 md:py-14">
            <motion.div style={{ y: titleY }} className="relative z-10 px-2 md:px-5">
              <h1 className="hero-title" aria-label="Security engineer and systems builder">
                <span className="hero-line">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 1.02, ease: [0.76, 0, 0.24, 1] }}
                  >
                    Security
                  </motion.span>
                </span>
                <span className="hero-line text-[#f04d2f]">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 1.1, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <span className="display-serif normal-case">Engineer</span>
                    <span className="text-[#191917]">&amp;</span>
                  </motion.span>
                </span>
                <span className="hero-line">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 1.18, ease: [0.76, 0, 0.24, 1] }}
                  >
                    Builder
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.75, rotate: -35 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 1.45, ease: "backOut" }}
              className="absolute right-[5%] top-[43%] z-20 text-[#3155e7] md:right-[12%] md:top-[35%]"
              aria-hidden="true"
            >
              <div className="signal-cross"><span /></div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
            className="grid border-t border-[#191917]/20 md:grid-cols-12"
          >
            <div className="flex items-end border-b border-[#191917]/20 p-5 md:col-span-2 md:border-b-0 md:border-r md:p-6">
              <a
                href="#work"
                className="group flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.08em]"
              >
                <span className="grid h-9 w-9 place-items-center border border-[#191917] transition-colors group-hover:bg-[#191917] group-hover:text-[#f0eee7]">
                  <ArrowDown className="h-3.5 w-3.5" />
                </span>
                Explore work
              </a>
            </div>

            <div className="border-b border-[#191917]/20 p-5 md:col-span-6 md:border-b-0 md:border-r md:p-6">
              <p className="max-w-2xl text-[clamp(1.05rem,1.7vw,1.55rem)] font-medium leading-[1.24] tracking-[-0.025em]">
                I turn raw telemetry into useful decisions — building detection systems,
                forensic tooling, and secure products from packet capture to interface.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-5 p-5 md:col-span-4 md:p-6">
              <div className="font-mono text-[0.62rem] uppercase leading-[1.8] tracking-[0.06em] text-[#585750]">
                TryHackMe top 2%<br />
                Blue team / DFIR focus<br />
                C++ · Python · TypeScript
              </div>
              <div className="flex gap-5">
                <a className="link-arrow" href="https://github.com/Ashiii27" target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight className="h-3 w-3" />
                </a>
                <a className="link-arrow" href="https://tryhackme.com/p/Ashiii27" target="_blank" rel="noreferrer">
                  TryHackMe <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="overflow-hidden bg-[#191917] py-3 text-[#f0eee7]">
          <div className="marquee" aria-hidden="true">
            {[0, 1].map((group) => (
              <div className="marquee-group" key={group}>
                {expertise.map((item) => (
                  <span key={`${group}-${item}`} className="flex items-center font-mono text-[0.66rem] uppercase tracking-[0.12em]">
                    <span className="mx-5 h-2 w-2 bg-[#f04d2f]" />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
