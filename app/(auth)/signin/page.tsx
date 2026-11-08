"use client"

import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useRouter, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import Loading from "@/components/Loading"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const passwordPattern = /^.{8,}$/

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const { data: session, isPending } = authClient.useSession()

  // Redirect to callbackUrl if user is already authenticated
  useEffect(() => {
    if (!isPending && session) {
      router.push(callbackUrl)
    }
  }, [session, isPending, callbackUrl, router])

  if (isPending || session) {
    return (
      <main className="flex min-h-[calc(100svh-4.5rem)] items-center justify-center">
        <Loading text={session ? "Redirecting..." : "Checking session..."} />
      </main>
    )
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage("")

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") || "").trim()
    const password = String(formData.get("password") || "")

    if (!emailPattern.test(email)) {
      setErrorMessage("Enter a valid email address.")
      return
    }

    if (!passwordPattern.test(password)) {
      setErrorMessage("Password must be at least 8 characters.")
      return
    }

    setIsSubmitting(true)
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      })

      if (error) {
        setIsSubmitting(false)
        return toast.error(`Login failed: ${error.message}`)
      }

      if (data) {
        toast.success("Login successful!")
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err: unknown) {
      setIsSubmitting(false)
      const message = err instanceof Error ? err.message : "Something went wrong"
      toast.error(`Login failed: ${message}`)
    }
  }

  return (
    <main className="relative flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden px-4 py-12 text-white sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_20%,rgba(83,68,255,0.2),transparent_72%)]"
      />
      <section
        aria-labelledby="signin-heading"
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0b10]/90 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-8"
      >
        <div className="mb-7 text-center">
          <p className="mb-2 text-[10px] font-medium tracking-[0.25em] text-violet-300 uppercase">
            Welcome back
          </p>
          <h1
            id="signin-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Sign in to HireLoop
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Pick up where you left off in your job search.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                disabled={isSubmitting}
                className="h-11 w-full rounded-lg border border-white/10 bg-black/50 pr-3 pl-10 text-sm text-white transition outline-none placeholder:text-neutral-600 focus:border-violet-400/70 focus:ring-2 focus:ring-violet-400/20 disabled:opacity-50"
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
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                disabled={isSubmitting}
                className="h-11 w-full rounded-lg border border-white/10 bg-black/50 pr-11 pl-10 text-sm text-white transition outline-none placeholder:text-neutral-600 focus:border-violet-400/70 focus:ring-2 focus:ring-violet-400/20 disabled:opacity-50"
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
            disabled={isSubmitting}
            className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-violet-500 px-5 text-sm font-medium text-white transition-colors hover:bg-violet-500/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          New to HireLoop?{" "}
          <Link
            href="/signup"
            className="font-medium text-violet-300 outline-none hover:text-violet-200 focus-visible:underline"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  )
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[calc(100svh-4.5rem)] items-center justify-center">
          <Loading text="Loading..." />
        </main>
      }
    >
      <SignInForm />
    </Suspense>
  )
}
