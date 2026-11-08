<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Tailwind CSS v4 Canonical Class Rules

This project uses **Tailwind CSS v4**. Always follow modern Tailwind v4 canonical classes to prevent `suggestCanonicalClasses` IntelliSense warnings:

1. **Color Opacities:**
   - Always use integer percentage values rather than arbitrary decimal brackets:
     - Use `bg-white/2` instead of `bg-white/[0.02]`
     - Use `bg-white/4` instead of `bg-white/[0.04]`
     - Use `border-white/8` instead of `border-white/[0.08]`
     - Use `border-white/6` instead of `border-white/[0.06]`
     - Use `border-white/10` instead of `border-white/[0.1]`

2. **Spacing, Heights & Widths:**
   - Always use standard Tailwind numeric scale (multiples of 4px) instead of arbitrary pixel values:
     - `h-px` and `w-px` instead of `h-[1px]` / `w-[1px]`
     - `min-h-115` instead of `min-h-[460px]`
     - `min-h-130` instead of `min-h-[520px]`
     - `h-105` instead of `h-[420px]`
     - `w-220` instead of `w-[880px]`
     - `md:-mt-75` instead of `md:-mt-[300px]`
     - `lg:-mt-90` instead of `lg:-mt-[360px]`

3. **Gradients (Tailwind v4 syntax):**
   - Use `bg-linear-to-r` instead of `bg-gradient-to-r`
   - Use `bg-linear-to-t` instead of `bg-gradient-to-t`
   - Use `bg-linear-to-b` instead of `bg-gradient-to-b`

4. **Mask & Modern Utilities:**
   - Use `mask-[...]` instead of `[mask-image:...]`
