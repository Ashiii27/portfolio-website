import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ashish Kumar | Security Engineer & Full-Stack Developer",
    template: "%s | Ashish Kumar",
  },
  description:
    "B.Tech CSE student specializing in cybersecurity — SOC analysis, network intrusion detection, malware analysis, and full-stack development. Building tools that defend.",
  keywords: [
    "cybersecurity", "SOC analyst", "blue team", "network intrusion detection",
    "NIDS", "malware analysis", "DFIR", "full-stack developer", "Next.js",
    "React", "MERN", "MITRE ATT&CK", "CTF", "TryHackMe", "Ashish Kumar", "MMMUT",
  ],
  authors: [{ name: "Ashish Kumar", url: "https://github.com/Ashiii27" }],
  creator: "Ashish Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ashish Kumar | Security Engineer & Full-Stack Developer",
    description:
      "Building security tools and full-stack applications. SOC analyst targeting Blue Team roles.",
    siteName: "Ashish Kumar — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Kumar | Security Engineer & Full-Stack Developer",
    description:
      "Building security tools and full-stack applications. SOC analyst targeting Blue Team roles.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        {children}
      </body>
    </html>
  );
}