export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  category: string;
  featured?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

export type BlogTag = "All" | "Security" | "CTF" | "Dev" | "AI/ML";

export type Difficulty = "Easy" | "Medium" | "Hard" | "Insane";

export type CTFCategory =
  | "All"
  | "Web"
  | "Pwn"
  | "Crypto"
  | "Forensics"
  | "Misc";

export interface Writeup {
  id: string;
  title: string;
  event: string;
  year: number;
  category: CTFCategory;
  difficulty: Difficulty;
  points: number;
  tags: string[];
  summary: string;
  link?: string;
  solvedAt?: string;
}
