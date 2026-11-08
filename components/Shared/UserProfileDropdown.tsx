"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  LayoutDashboard,
  User,
  Bookmark,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react"

import { signOut } from "@/lib/auth-client"

interface UserProfileDropdownProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function UserProfileDropdown({ user }: UserProfileDropdownProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [avatarSrc, setAvatarSrc] = useState<string>(
    user.image || "/profile.jpg"
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Update avatarSrc if user.image changes
  useEffect(() => {
    setAvatarSrc(user.image || "/profile.jpg")
  }, [user.image])

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const handleSignOut = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsOpen(false)
            router.push("/signin")
            router.refresh()
          },
        },
      })
    } catch (error) {
      console.error("Sign out failed:", error)
      setIsLoggingOut(false)
    }
  }

  const displayName = user.name || "User"
  const displayEmail = user.email || ""

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center justify-center rounded-full p-0.5 cursor-pointer outline-none transition-all hover:ring-2 hover:ring-violet-500/40 focus-visible:ring-2 focus-visible:ring-violet-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Open user profile menu"
      >
        <div className="relative size-9 overflow-hidden rounded-full ring-1 ring-white/15 transition-transform duration-150 group-hover:scale-105">
          <Image
            src={avatarSrc}
            alt={displayName}
            width={36}
            height={36}
            className="size-full object-cover"
            onError={() => setAvatarSrc("/profile.jpg")}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute -right-2 sm:right-0 top-full mt-2 w-64 max-w-[calc(100vw-2rem)] origin-top-right rounded-xl border border-white/10 bg-neutral-900/95 p-1.5 text-white shadow-2xl backdrop-blur-xl transition-all duration-150 animate-in fade-in-0 zoom-in-95 z-50"
        >
          {/* User Info Header */}
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
              <Image
                src={avatarSrc}
                alt={displayName}
                width={40}
                height={40}
                className="size-full object-cover"
                onError={() => setAvatarSrc("/profile.jpg")}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {displayName}
              </p>
              {displayEmail && (
                <p className="truncate text-xs text-neutral-400">
                  {displayEmail}
                </p>
              )}
            </div>
          </div>

          <div className="my-1.5 h-px bg-white/10" />

          {/* Navigation Items */}
          <div className="space-y-0.5">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-neutral-200 transition-colors hover:bg-white/10 hover:text-white"
              role="menuitem"
            >
              <LayoutDashboard className="size-4 text-violet-400" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-neutral-200 transition-colors hover:bg-white/10 hover:text-white"
              role="menuitem"
            >
              <User className="size-4 text-blue-400" />
              <span>Profile</span>
            </Link>

            <Link
              href="/saved-jobs"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-neutral-200 transition-colors hover:bg-white/10 hover:text-white"
              role="menuitem"
            >
              <Bookmark className="size-4 text-emerald-400" />
              <span>Saved Jobs</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-neutral-200 transition-colors hover:bg-white/10 hover:text-white"
              role="menuitem"
            >
              <Settings className="size-4 text-neutral-400" />
              <span>Settings</span>
            </Link>
          </div>

          <div className="my-1.5 h-px bg-white/10" />

          {/* Logout Action */}
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
            role="menuitem"
          >
            {isLoggingOut ? (
              <Loader2 className="size-4 animate-spin text-red-400" />
            ) : (
              <LogOut className="size-4 text-red-400" />
            )}
            <span>{isLoggingOut ? "Signing out..." : "Log Out"}</span>
          </button>
        </div>
      )}
    </div>
  )
}
