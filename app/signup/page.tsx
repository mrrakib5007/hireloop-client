import Link from "next/link"

export default function SignupPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-neutral-950 text-white">
      {/* TODO: Replace this placeholder with the real signup form */}
      <h1 className="text-2xl font-semibold">Sign Up</h1>
      <p className="text-sm text-neutral-400">
        Your signup form will go here.
      </p>
      <Link
        href="/"
        className="text-sm text-violet-400 underline-offset-4 hover:underline"
      >
        Back to home
      </Link>
    </main>
  )
}
