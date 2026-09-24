"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Profile", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Notes", href: "#notes" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("work");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 170, damping: 34, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = navLinks.map(({ href }) => {
      const element = document.querySelector(href);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(href.slice(1)),
        { rootMargin: "-38% 0px -54%" }
      );
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const goTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-[#f04d2f]"
        style={{ scaleX }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-[60] border-b transition-colors duration-300 ${
          scrolled ? "border-[#191917]/20 bg-[#f0eee7]/95" : "border-transparent bg-transparent"
        }`}
      >
        <nav className="site-shell flex h-[4.55rem] items-center justify-between" aria-label="Primary navigation">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3 text-left"
            aria-label="Back to top"
          >
            <span className="grid h-8 w-8 place-items-center bg-[#191917] text-[0.68rem] font-bold tracking-[-0.05em] text-[#f0eee7] transition-transform duration-300 group-hover:rotate-6">
              AK
            </span>
            <span className="hidden font-mono text-[0.64rem] uppercase leading-[1.25] tracking-[0.08em] sm:block">
              Ashish Kumar<br />Security Engineer
            </span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, index) => {
              const isActive = active === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => goTo(link.href)}
                  className="group relative py-2 font-mono text-[0.68rem] uppercase tracking-[0.08em]"
                >
                  <span className="mr-1 text-[#191917]/38">{String(index + 1).padStart(2, "0")}</span>
                  {link.label}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px origin-left bg-[#f04d2f] transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => goTo("#contact")}
            className="group hidden items-center gap-2 border-b border-[#191917] pb-1 font-mono text-[0.68rem] uppercase tracking-[0.08em] md:flex"
          >
            Start a conversation
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center border border-[#191917] md:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex bg-[#f04d2f] pt-[4.55rem] md:hidden"
          >
            <div className="site-shell flex flex-1 flex-col justify-between border-t border-[#191917]/30 py-8">
              <div>
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + index * 0.06 }}
                    type="button"
                    onClick={() => goTo(link.href)}
                    className="flex w-full items-baseline gap-4 border-b border-[#191917]/30 py-4 text-left"
                  >
                    <span className="font-mono text-xs">0{index + 1}</span>
                    <span className="text-[clamp(2.7rem,13vw,5rem)] font-bold uppercase leading-none tracking-[-0.06em]">
                      {link.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo("#contact")}
                className="flex items-center justify-between border-b border-[#191917] pb-3 font-mono text-xs uppercase tracking-[0.08em]"
              >
                Start a conversation <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
