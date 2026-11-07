"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react"

const namePattern = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const passwordPattern = /^.{8,}$/

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage("")

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const password = String(formData.get("password") || "")

    if (!namePattern.test(name)) {
      setErrorMessage("Enter a valid name.")
      return
    }

    if (!emailPattern.test(email)) {
      setErrorMessage("Enter a valid email address.")
      return
    }

    if (!passwordPattern.test(password)) {
      setErrorMessage("Password must be at least 8 characters.")
      return
    }

    console.log("Sign up data:", { name, email, password })
  }

  return (
    <main className="relative flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden px-4 py-12 text-white sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_20%,rgba(83,68,255,0.2),transparent_72%)]"
      />
      <section
        aria-labelledby="signup-heading"
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0b10]/90 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-8"
      >
        <div className="mb-7 text-center">
          <Link
            href="/"
            aria-label="HireLoop home"
            className="mb-6 inline-flex rounded outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Image
              src="/images/logo.png"
              alt="HireLoop"
              width={98}
              height={28}
              className="h-7 w-auto"
            />
          </Link>
          <p className="mb-2 text-[10px] font-medium tracking-[0.25em] text-violet-300 uppercase">
            Join HireLoop
          </p>
          <h1
            id="signup-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Create your account
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Build your profile and find your next opportunity.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-neutral-200"
            >
              Name
            </label>
            <div className="relative">
              <UserRound
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-neutral-500"
              />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                required
                className="h-11 w-full rounded-lg border border-white/10 bg-black/50 pr-3 pl-10 text-sm text-white transition outline-none placeholder:text-neutral-600 focus:border-violet-400/70 focus:ring-2 focus:ring-violet-400/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-neutral-200"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-neutral-500"
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="h-11 w-full rounded-lg border border-white/10 bg-black/50 pr-3 pl-10 text-sm text-white transition outline-none placeholder:text-neutral-600 focus:border-violet-400/70 focus:ring-2 focus:ring-violet-400/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-neutral-200"
            >
              Password
            </label>
            <div className="relative">
              <LockKeyhole
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-neutral-500"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your password"
                required
                className="h-11 w-full rounded-lg border border-white/10 bg-black/50 pr-11 pl-10 text-sm text-white transition outline-none placeholder:text-neutral-600 focus:border-violet-400/70 focus:ring-2 focus:ring-violet-400/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute top-1/2 right-3 flex size-7 -translate-y-1/2 items-center justify-center rounded text-neutral-400 transition outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-violet-500 px-5 text-sm font-medium text-white transition-colors hover:bg-violet-500/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-violet-300 outline-none hover:text-violet-200 focus-visible:underline"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  )
}
