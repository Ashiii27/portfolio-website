import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Ashish Singh | Security Engineer & Full-Stack Developer",
    template: "%s | Ashish Singh",
  },
  description:
    "B.Tech CSE student specializing in cybersecurity — SOC analysis, network intrusion detection, malware analysis, and full-stack development. Building tools that defend.",
  keywords: [
    "cybersecurity",
    "SOC analyst",
    "blue team",
    "network intrusion detection",
    "NIDS",
    "malware analysis",
    "DFIR",
    "full-stack developer",
    "Next.js",
    "React",
    "MERN",
    "MITRE ATT&CK",
    "CTF",
    "TryHackMe",
    "Ashish Singh",
    "MMMUT",
  ],
  authors: [{ name: "Ashish Singh", url: "https://github.com/Ashiii27" }],
  creator: "Ashish Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ashish Singh | Security Engineer & Full-Stack Developer",
    description:
      "Building security tools and full-stack applications. SOC analyst targeting Blue Team roles.",
    siteName: "Ashish Singh — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Singh | Security Engineer & Full-Stack Developer",
    description:
      "Building security tools and full-stack applications. SOC analyst targeting Blue Team roles.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
        {children}
      </body>
    </html>
  );
}