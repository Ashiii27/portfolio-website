"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#f0eee7]/28 bg-[#191917] text-[#f0eee7]">
      <div className="site-shell grid gap-8 py-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3 text-left"
          >
            <span className="grid h-9 w-9 place-items-center bg-[#f0eee7] text-xs font-bold text-[#191917] transition-transform group-hover:-rotate-6">
              AK
            </span>
            <span className="font-mono text-[0.6rem] uppercase leading-[1.5] tracking-[0.08em] text-[#f0eee7]/60">
              Ashish Kumar<br />Security engineer &amp; builder
            </span>
          </button>
        </div>

        <div className="font-mono text-[0.58rem] uppercase leading-[1.7] tracking-[0.07em] text-[#f0eee7]/45 md:col-span-5">
          © {year} Ashish Kumar<br />Designed and engineered with intent.
        </div>

        <div className="flex items-center justify-between md:col-span-3 md:justify-end md:gap-8">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-[#f0eee7]/45">India / UTC +5:30</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid h-10 w-10 place-items-center border border-[#f0eee7]/45 transition-colors hover:border-[#f04d2f] hover:bg-[#f04d2f] hover:text-[#191917]"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
