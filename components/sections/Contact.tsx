"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

const socials = [
  { label: "GitHub", handle: "Ashiii27", href: "https://github.com/Ashiii27" },
  { label: "LinkedIn", handle: "Ashish Kumar", href: "https://linkedin.com/in/ashiii27" },
  { label: "TryHackMe", handle: "Ashiii27", href: "https://tryhackme.com/p/Ashiii27" },
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, subject: "Portfolio enquiry" }),
      });

      if (!response.ok) throw new Error("Unable to send message");
      setFields({ name: "", email: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="overflow-hidden bg-[#191917] text-[#f0eee7]">
      <div className="site-shell py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="eyebrow text-[#f04d2f]">Contact</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.75 }}
            className="md:col-span-9"
          >
            <h2 className="text-balance text-[clamp(3.5rem,9.7vw,10.5rem)] font-semibold uppercase leading-[0.79] tracking-[-0.08em]">
              Let&apos;s make<br />systems <span className="display-serif normal-case text-[#f04d2f]">safer.</span>
            </h2>
          </motion.div>
        </div>

        <div className="mt-16 grid border-t border-[#f0eee7]/28 md:mt-24 md:grid-cols-12">
          <div className="border-b border-[#f0eee7]/28 py-8 md:col-span-4 md:border-b-0 md:border-r md:py-12 md:pr-10">
            <p className="max-w-sm text-xl font-medium leading-[1.35] tracking-[-0.025em]">
              Have a security role, useful collaboration, or an interesting problem in mind?
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f0eee7]/55">
              Send the short version. I usually respond within a day and I am open to internships, project work, and research conversations.
            </p>

            <div className="mt-10 space-y-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border-t border-[#f0eee7]/28 pt-3"
                >
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-[#f0eee7]/50">{social.label}</span>
                  <span className="flex items-center gap-2 text-sm">
                    {social.handle}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="py-8 md:col-span-7 md:col-start-6 md:py-12">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex min-h-[25rem] flex-col items-start justify-center"
                >
                  <span className="grid h-12 w-12 place-items-center bg-[#d8f45a] text-[#191917]">
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="mt-7 text-4xl font-semibold tracking-[-0.055em]">Message received.</h3>
                  <p className="mt-3 max-w-md text-[#f0eee7]/58">Thanks for reaching out. I&apos;ll get back to you as soon as I can.</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="link-arrow mt-8"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={submit}
                  className="space-y-8"
                >
                  <div>
                    <label htmlFor="contact-name" className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[#f0eee7]/50">
                      01 / Your name
                    </label>
                    <input
                      id="contact-name"
                      required
                      maxLength={100}
                      autoComplete="name"
                      className="form-line text-lg"
                      placeholder="How should I address you?"
                      value={fields.name}
                      onChange={(event) => setFields({ ...fields, name: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[#f0eee7]/50">
                      02 / Your email
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      maxLength={160}
                      autoComplete="email"
                      className="form-line text-lg"
                      placeholder="Where can I reply?"
                      value={fields.email}
                      onChange={(event) => setFields({ ...fields, email: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[#f0eee7]/50">
                      03 / The short version
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      maxLength={4000}
                      rows={4}
                      className="form-line resize-none text-lg"
                      placeholder="Project, role, idea — tell me what matters."
                      value={fields.message}
                      onChange={(event) => setFields({ ...fields, message: event.target.value })}
                    />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="font-mono text-xs text-[#f04d2f]">
                      The message could not be sent. Please reach out through LinkedIn instead.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group flex w-full items-center justify-between bg-[#f04d2f] px-5 py-4 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[#191917] transition-colors hover:bg-[#d8f45a] disabled:cursor-wait disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending" : "Send message"}
                    {status === "sending" ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
