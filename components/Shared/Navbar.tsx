"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Menu, LogOut, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useSession, signOut } from "@/lib/auth-client"
import { UserProfileDropdown } from "./UserProfileDropdown"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

function Logo() {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <Image
        src="/images/logo.png"
        alt="HireLoop"
        width={154}
        height={44}
        className="h-7 w-auto"
        style={{ width: "auto" }}
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

function MobileMenu({
  sessionUser,
}: {
  sessionUser?: {
    name?: string | null
    email?: string | null
    image?: string | null
  } | null
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const close = () => setOpen(false)

  const handleMobileSignOut = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            close()
            router.push("/signin")
            router.refresh()
          },
        },
      })
    } catch (err) {
      console.error("Sign out error:", err)
      setIsLoggingOut(false)
    }
  }

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
        className="flex flex-col justify-between w-72 bg-neutral-900 text-white border-white/10"
      >
        <div>
          <SheetHeader>
            <SheetTitle>
              <Image
                src="/images/logo.png"
                alt="HireLoop"
                width={154}
                height={44}
                className="h-7 w-auto"
                style={{ width: "auto" }}
              />
            </SheetTitle>
          </SheetHeader>

          {/* Navigation: ONLY Browse Jobs, Company, Pricing */}
          <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-6">
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
          </nav>
        </div>

        {/* Bottom actions: Log out if logged in, or Sign In / Get Started if not */}
        <div className="px-4 pb-6">
          <div aria-hidden className="mb-4 h-px bg-white/10" />

          {sessionUser ? (
            <button
              type="button"
              onClick={handleMobileSignOut}
              disabled={isLoggingOut}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300 disabled:opacity-50 cursor-pointer"
            >
              {isLoggingOut ? (
                <Loader2 className="size-4 animate-spin text-red-400" />
              ) : (
                <LogOut className="size-4 text-red-400" />
              )}
              <span>{isLoggingOut ? "Signing out..." : "Log Out"}</span>
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <NavLink
                href="/signin"
                onNavigate={close}
                className="w-full text-center rounded-md px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                Sign In
              </NavLink>
              <Link
                href="/signup"
                onClick={close}
                className="outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <Button className="h-10 w-full bg-violet-500 text-white hover:bg-violet-500/80">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function SiteNavbar() {
  const { data: session } = useSession()
  const user = session?.user

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

          {/* User Profile or Auth Buttons */}
          {user ? (
            <UserProfileDropdown user={user} />
          ) : (
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
          )}
        </div>

        {/* Mobile menu and user profile avatar */}
        <div className="flex items-center gap-2 md:hidden">
          {user && <UserProfileDropdown user={user} />}
          <MobileMenu sessionUser={user} />
        </div>
      </div>
    </header>
  )
}
