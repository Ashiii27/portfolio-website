# AGENTS.md

> This file defines coding standards and project guidelines for AI agents.

## 🎨 Project: ashiii27.github.io
- **Primary Language**: TypeScript
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn UI (Radix-based)

## 🎯 Coding Standards

### File Organization
- Create folders under `app/` for pages (route segments)
- Use `components/` for reusable components
- Keep business logic in `lib/`
- Store assets in `public/`

### Component Guidelines
- Use React Functional Components
- All components must be in TypeScript
- Use Tailwind classes for styling (avoid inline styles)
- Use shadcn/ui components when available
- All components must be exported as `default export`

### TypeScript Rules
- No `any` types allowed
- Use strict type checking
- All props must have defined interfaces

### Git Commit Standards
Commits must follow conventional commits:
- `feat: ...` for new features
- `fix: ...` for bug fixes
- `docs: ...` for documentation changes
- `style: ...` for formatting changes
- `refactor: ...` for refactoring
- `perf: ...` for performance improvements

## ❌ Prohibited Patterns
- Do NOT use Tailwind `!important`
- Do NOT use inline styles (use Tailwind classes instead)
- Do NOT use `any` in TypeScript
- Do NOT modify `app/page.tsx` unless explicitly requested
- Do NOT modify `components/Footer.tsx` unless explicitly requested
- Do NOT modify `components/Navbar.tsx` unless explicitly requested

## 📁 Current Directory Structure

```
portfolio-website/
├── app/
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── components/
│   ├── Footer.tsx         # Footer component
│   └── Navbar.tsx         # Navigation component
│   └── sections/
│       ├── Hero.tsx       # Hero section
│       ├── About.tsx      # About section
│       ├── Blog.tsx       # Blog section
│       └── CTFWriteups.tsx  # CTF writeups section
├── public/
├── lib/
└── ...
```
