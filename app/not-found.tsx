import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-neutral-950 px-4 py-16 text-white">
      {/* Ambient Cosmic Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-140 rounded-full bg-indigo-600/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-1/4 size-100 rounded-full bg-violet-600/10 blur-[100px]"
      />

      {/* Main Glassmorphic Card */}
      <div className="relative z-10 mx-auto w-full max-w-140 rounded-3xl border border-white/10 bg-[#0d101d]/80 p-8 sm:p-12 text-center shadow-2xl backdrop-blur-2xl">
        {/* Glowing 404 Headline */}
        <div className="relative inline-block mb-2">
          <span className="select-none text-7xl sm:text-9xl font-black tracking-tight bg-linear-to-b from-white via-neutral-200 to-indigo-400/40 bg-clip-text text-transparent">
            404
          </span>
        </div>

        {/* Title & Description */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
          Lost in the Talent Loop
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable. Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/40 active:scale-[0.99] cursor-pointer"
          >
            <Home className="size-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/dashboard/candidate"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <Search className="size-4" />
            <span>Browse Opportunities</span>
          </Link>
        </div>
        
      </div>
    </main>
  );
}
