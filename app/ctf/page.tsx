import { getAllCTFPosts } from "@/lib/mdx";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CTF Archive",
  description: "Capture The Flag writeups and security challenge solutions by Ashish Kumar.",
};

export default function CTFPage() {
  const posts = getAllCTFPosts();

  return (
    <main className="min-h-screen bg-[#e4b73b] pt-[4.55rem] text-[#191917]">
      <div className="site-shell border-x border-[#191917]/25">
        <div className="border-b border-[#191917]/25 p-5 md:p-8">
          <Link href="/" className="link-arrow">
            <ArrowLeft className="h-3.5 w-3.5" /> Home
          </Link>
        </div>

        <header className="grid border-b border-[#191917]/25 md:grid-cols-12">
          <div className="border-b border-[#191917]/25 p-5 md:col-span-3 md:border-b-0 md:border-r md:p-8">
            <span className="eyebrow text-[#3155e7]">CTF archive / {String(posts.length).padStart(2, "0")}</span>
          </div>
          <div className="p-5 md:col-span-9 md:p-10 lg:p-16">
            <h1 className="text-[clamp(3.6rem,9.2vw,9.5rem)] font-semibold leading-[0.82] tracking-[-0.08em]">
              Break it.<br />Write it <span className="display-serif text-[#3155e7]">down.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[#191917]/65 md:text-lg">
              Reproducible notes from web, binary, crypto, and forensic challenges — all in controlled environments.
            </p>
          </div>
        </header>

        <div className="p-5 md:p-10 lg:p-16">
          {posts.length === 0 ? (
            <p className="border-t border-[#191917] py-10 font-mono text-xs uppercase tracking-[0.08em]">No writeups published yet.</p>
          ) : (
            <div className="border-b border-[#191917]">
              {posts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/ctf/${post.slug}`}
                  className="group grid gap-3 border-t border-[#191917] py-7 transition-[padding,background,color] duration-300 hover:bg-[#191917] hover:px-5 hover:text-[#f0eee7] md:grid-cols-[4rem_1fr_auto] md:items-center"
                >
                  <span className="font-mono text-[0.62rem] tracking-[0.08em] opacity-50">/{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-[#3155e7] group-hover:text-[#d8f45a]">{post.category}</div>
                    <h2 className="mt-2 text-[clamp(1.4rem,3vw,2.7rem)] font-semibold leading-[1.05] tracking-[-0.045em]">{post.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed opacity-60">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-5 font-mono text-[0.58rem] uppercase tracking-[0.06em] opacity-60">
                    <span>{post.date}</span>
                    <span>{post.readTime} min</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
