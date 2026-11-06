"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

function Logo() {
  return (
    <Link href="/" aria-label="HireLoop home" className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
      <Image
        src="/images/logo.png"
        alt="HireLoop"
        width={104}
        height={28}
        style={{ width: "auto", height: "1.75rem" }}
        priority
      />
    </Link>
  )
}

function NavLink({
  href,
  children,
  className,
  onNavigate,
}: {
  href: string
  children: React.ReactNode
  className?: string
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={
        className ??
        "rounded-md px-3 py-1.5 text-sm font-medium text-neutral-300 transition-colors hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      }
    >
      {children}
    </Link>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-300 hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        }
      />
      <SheetContent
        side="right"
        className="w-72 bg-neutral-900 text-white border-white/10"
      >
        <SheetHeader>
          <SheetTitle>
            <Image
              src="/images/logo.png"
              alt="HireLoop"
              width={104}
              height={28}
              style={{ width: "auto", height: "1.75rem" }}
            />
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 pb-6">
          <div className="flex flex-col items-start gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                onNavigate={close}
                className="w-full rounded-md px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div aria-hidden className="my-3 h-px bg-white/10" />
          <NavLink
            href="/signin"
            onNavigate={close}
            className="w-full rounded-md px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            Sign In
          </NavLink>
          <Link href="/signup" onClick={close} className="mt-2 outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
            <Button className="h-10 w-full bg-violet-500 text-white hover:bg-violet-500/80">
              Get Started
            </Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full px-2 pt-2 sm:px-4 sm:pt-3">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-xl border border-white/6 bg-neutral-900 px-4 shadow-xl shadow-black/40 sm:px-5">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden items-center md:flex">
          <nav aria-label="Main" className="flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div aria-hidden className="mx-3 h-6 w-px bg-white/20" />
          <div className="flex items-center gap-3">
            <NavLink
              href="/signin"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-100 transition-colors hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              Sign In
            </NavLink>
            <Button
              render={<Link href="/signup" />}
              nativeButton={false}
              size="lg"
              className="h-10 bg-violet-500 px-5 text-white hover:bg-violet-500/80"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <MobileMenu />
      </div>
    </header>
  )
}
