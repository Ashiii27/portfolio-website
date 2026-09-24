import { getCTFPost, getAllCTFSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCTFSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getCTFPost(slug);
  if (!post) return { title: "Writeup Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default async function CTFPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getCTFPost(slug);
  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-[#e4b73b] pt-[4.55rem] text-[#191917]">
      <article>
        <div className="site-shell border-x border-[#191917]/25">
          <div className="border-b border-[#191917]/25 p-5 md:p-8">
            <Link href="/ctf" className="link-arrow">
              <ArrowLeft className="h-3.5 w-3.5" /> CTF archive
            </Link>
          </div>

          <header className="grid border-b border-[#191917]/25 md:grid-cols-12">
            <div className="border-b border-[#191917]/25 p-5 md:col-span-3 md:border-b-0 md:border-r md:p-8">
              <span className="eyebrow text-[#3155e7]">{post.category}</span>
              <div className="mt-8 space-y-2 font-mono text-[0.6rem] uppercase leading-[1.6] tracking-[0.07em] text-[#191917]/60">
                <div>{post.date}</div>
                <div>{post.readTime} minute read</div>
                <div>{post.tags.join(" / ")}</div>
              </div>
            </div>
            <div className="p-5 md:col-span-9 md:p-10 lg:p-16">
              <h1 className="max-w-6xl text-[clamp(3rem,7vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.07em]">
                {post.title}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#191917]/65">{post.excerpt}</p>
            </div>
          </header>

          <div className="grid md:grid-cols-12">
            <aside className="hidden border-r border-[#191917]/25 p-8 md:col-span-3 md:block">
              <div className="sticky top-28 font-mono text-[0.58rem] uppercase leading-[1.8] tracking-[0.08em] text-[#191917]/60">
                Controlled environment<br />Educational writeup<br />Reproduce responsibly
              </div>
            </aside>
            <div className="p-5 md:col-span-9 md:p-10 lg:p-16">
              {post.content.trim() ? (
                <div className="article-prose">
                  <MDXRemote source={post.content} />
                </div>
              ) : (
                <p className="border-t border-[#191917] py-10 font-mono text-xs uppercase tracking-[0.08em]">Content coming soon.</p>
              )}
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
