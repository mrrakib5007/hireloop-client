<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop — Agent & Developer Engineering Guide

Welcome to the **HireLoop Client** codebase. This document defines the project architecture, tech stack conventions, authentication flows, and strict design rules that every AI coding assistant and engineer must adhere to.

---

## 1. Project Overview

**HireLoop** is a modern, high-performance job board and talent platform connecting job seekers with world-class employers. It features an atmospheric dark-mode glassmorphic aesthetic, seamless authentication, and pixel-perfect responsive layouts.

---

## 2. Tech Stack & Dependencies

| Layer | Technology | Version / Details |
|---|---|---|
| **Framework** | Next.js (App Router) | `16.4.3` |
| **Language** | TypeScript / JavaScript | Strict TypeScript |
| **UI Library** | React 19 | `19.3.1` |
| **Styling** | Tailwind CSS v4 | PostCSS `@tailwindcss/postcss ^4` |
| **Component Primitives** | `@base-ui/react` | Modern headless UI components |
| **Icons** | `lucide-react` | Standard vector icons |
| **Authentication** | Better Auth | `better-auth ^1.7.18` (Email/Password + Google OAuth) |
| **Database Adapter** | MongoDB Driver | `@better-auth/mongo-adapter ^1.7.18` on `hireloop_db` |
| **Feedback & Notifications** | `react-hot-toast` | Toast alerts for auth & user actions |
| **Animation Utilities** | `tw-animate-css` | Smooth CSS transitions & micro-interactions |

---

## 3. Project Structure

```text
hireloop-client/
├── app/
│   ├── (auth)/
│   │   ├── signin/page.tsx      # Sign In page (session redirect + validation)
│   │   └── signup/page.tsx      # Sign Up page (account registration + role selector)
│   ├── api/
│   │   └── auth/[...all]/       # Better Auth API route handler
│   ├── globals.css              # Tailwind v4 theme, OKLCH colors, layers
│   ├── layout.tsx               # Root layout (ThemeProvider, Navbar, suppressHydrationWarning)
│   └── page.tsx                 # Home landing page
├── components/
│   ├── Home/                    # Landing page feature sections
│   │   ├── HeroSection.tsx      # Globe atmosphere, search bar, stats cards
│   │   ├── FeaturesSection.tsx  # Platform capabilities grid
│   │   ├── PricingSection.tsx   # Billing toggle + tiered plan cards
│   │   └── CTASection.tsx       # Bottom call-to-action banner
│   ├── Shared/                  # Shared global layout components
│   │   ├── Navbar.tsx           # Sticky glassmorphic navbar with mobile drawer
│   │   ├── UserProfileDropdown.tsx # Session avatar & profile dropdown
│   │   └── Footer.tsx           # Multi-column footer & copyright
│   ├── ui/                      # Base UI primitives (button.tsx, sheet.tsx)
│   └── Loading.tsx              # Centered spinner loading component
├── lib/
│   ├── auth.ts                  # Better Auth server instance, role schema & MongoDB adapter
│   ├── auth-client.ts           # Client auth helpers (useSession, signIn, signOut)
│   └── utils.ts                 # Utility functions (cn class merging)
├── public/
│   ├── images/                  # Platform artwork (globe, cta-bg, logo.png)
│   ├── logos/                   # Partner & employer SVG logos
│   └── profile.jpg              # Default user avatar fallback
```

---

## 4. Tailwind CSS v4 Canonical Rules (STRICT)

This project strictly runs **Tailwind CSS v4**. To avoid `suggestCanonicalClasses` linting warnings and maintain clean CSS generation:

### A. Opacity Utilities
Always use integer percentages instead of arbitrary decimal brackets:
* ✅ `bg-white/2` instead of ❌ `bg-white/[0.02]`
* ✅ `bg-white/4` instead of ❌ `bg-white/[0.04]`
* ✅ `border-white/6` instead of ❌ `border-white/[0.06]`
* ✅ `border-white/8` instead of ❌ `border-white/[0.08]`
* ✅ `border-white/10` instead of ❌ `border-white/[0.1]`
* ✅ `text-white/80` instead of ❌ `text-white/[0.8]`

### B. Spacing, Heights, Widths & Max/Min Constraints
Tailwind CSS v4 replaces arbitrary pixel bracket notation (`[Npx]`) with canonical numeric units based on the 4px scale (`N / 4`):
* **Widths & Max-Widths:**
  * ✅ `max-w-31.25` instead of ❌ `max-w-[125px]` (125 / 4 = 31.25)
  * ✅ `max-w-47.5` instead of ❌ `max-w-[190px]` (190 / 4 = 47.5)
  * ✅ `max-w-26.25` instead of ❌ `max-w-[105px]` (105 / 4 = 26.25)
  * ✅ `max-w-38.75` instead of ❌ `max-w-[155px]` (155 / 4 = 38.75)
  * ✅ `max-w-23.75` instead of ❌ `max-w-[95px]` (95 / 4 = 23.75)
  * ✅ `max-w-36.25` instead of ❌ `max-w-[145px]` (145 / 4 = 36.25)
  * ✅ `w-220` instead of ❌ `w-[880px]`
  * ✅ `min-w-212.5` instead of ❌ `min-w-[850px]`
* **Heights & Margins:**
  * ✅ `h-px` and `w-px` instead of ❌ `h-[1px]` / `w-[1px]`
  * ✅ `min-h-115` instead of ❌ `min-h-[460px]`
  * ✅ `min-h-130` instead of ❌ `min-h-[520px]`
  * ✅ `h-105` instead of ❌ `h-[420px]`
  * ✅ `md:-mt-75` instead of ❌ `md:-mt-[300px]`
  * ✅ `lg:-mt-90` instead of ❌ `lg:-mt-[360px]`
* **Strict Rule:** Never write arbitrary pixel bracket classes like `max-w-[...px]`, `w-[...px]`, `h-[...px]` when Tailwind v4 can express it canonically as `valueInPx / 4`.

### C. Gradients (Tailwind v4 syntax)
* ✅ `bg-linear-to-r` instead of ❌ `bg-gradient-to-r`
* ✅ `bg-linear-to-t` instead of ❌ `bg-gradient-to-t`
* ✅ `bg-linear-to-b` instead of ❌ `bg-gradient-to-b`

### D. Modern Mask Utility
* ✅ `mask-[...]` instead of ❌ `[mask-image:...]`

---

## 5. Authentication, Roles & State Best Practices

1. **Client Hook Import:**
   Always import authentication utilities directly from `@/lib/auth-client`:
   ```ts
   import { useSession, signOut, signIn, signUp } from "@/lib/auth-client"
   ```

2. **Role System & Validation:**
   - Supported user roles are strictly: `"candidate"`, `"recruiter"`, and `"admin"`.
   - Role validation is enforced on both the client (UI check in `SignUpPage`) and server (`databaseHooks.user.create.before` and `databaseHooks.user.update.before` in `lib/auth.ts`).
   - If an unauthorized or arbitrary role value is submitted, an `APIError("BAD_REQUEST")` is returned.

3. **No Navigation During Render (Zero Side-Effects in Component Body):**
   Never call `router.push()` or trigger navigation directly inside the body of a React component during render. Always execute route changes inside a `useEffect`:
   ```tsx
   useEffect(() => {
     if (!isPending && session) {
       router.push(callbackUrl)
     }
   }, [session, isPending, callbackUrl, router])
   ```

4. **User Profile Image Fallback:**
   When rendering user avatars, always provide an image fallback to `/profile.jpg` in case `user.image` is null, empty, or fails to load:
   ```tsx
   <Image
     src={user.image || "/profile.jpg"}
     alt={user.name || "Profile"}
     width={36}
     height={36}
     className="rounded-full object-cover"
     onError={(e) => { e.currentTarget.src = "/profile.jpg" }}
   />
   ```

5. **Rules of Hooks:**
   All React hooks (`useState`, `useRouter`, `useSearchParams`, `useSession`, `useEffect`) must be declared unconditionally at the very top of components before any early returns.

---

## 6. UI & Design System Standards

* **Aesthetic:** Dark universe / deep cosmic theme (`bg-neutral-950` / `#0c0d12` / `#12121b`).
* **Glassmorphism:** Use `backdrop-blur-xl`, `border-white/10`, and translucent backgrounds (`bg-neutral-900/90` or `bg-white/5`).
* **Brand Accents:** Vibrant violet/indigo (`#6055f6`, `bg-violet-600`, `text-violet-400`).
* **Responsiveness:** Mobile-first approach. Verify layouts at 360px (mobile), 768px (tablet), 1024px (desktop), and 1440px+ (large display).

---

## 7. Documentation Synchronization with README.md (MANDATORY)

Whenever a new feature is added, updated, or modified in the codebase:
1. **Always update `README.md` immediately** to reflect the new feature under the `## Features` section (or update `## Technology` / `## Description` if a new dependency, model, or capability is introduced).
2. **Preserve strict formatting in `README.md`:**
   - Keep only four primary sections: `# HireLoop`, `## Description`, `## Technology`, and `## Features`.
   - Do NOT add emojis, unnecessary marketing badges, or redundant icons to `README.md`.
   - Keep bullet points concise, accurate, and professional.
