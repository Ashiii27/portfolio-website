import type { Metadata } from "next";
import "@fontsource-variable/archivo";
import "@fontsource/dm-mono/300.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-website-flax-seven-68.vercel.app"),
  title: {
    default: "Ashish Kumar — Security Engineer & Systems Builder",
    template: "%s — Ashish Kumar",
  },
  description:
    "Security engineer and developer building detection systems, forensic tooling, and secure full-stack products.",
  keywords: [
    "Ashish Kumar",
    "security engineer",
    "detection engineering",
    "digital forensics",
    "network intrusion detection",
    "SOC analyst",
    "C++",
    "Python",
    "Next.js",
  ],
  authors: [{ name: "Ashish Kumar", url: "https://github.com/Ashiii27" }],
  creator: "Ashish Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ashish Kumar — Security Engineer & Systems Builder",
    description:
      "Detection systems, forensic tooling, and secure full-stack products.",
    siteName: "Ashish Kumar — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Kumar — Security Engineer & Systems Builder",
    description:
      "Detection systems, forensic tooling, and secure full-stack products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-full bg-background text-foreground antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
