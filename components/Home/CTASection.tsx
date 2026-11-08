import Image from "next/image"
import Link from "next/link"

export function CTASection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative isolate flex min-h-115 items-center justify-center overflow-hidden bg-black px-4 py-20 text-center text-white sm:min-h-130 sm:px-6 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full"
      >
        <Image
          src="/images/cta-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-85"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(83,68,255,0.45),transparent_72%),linear-gradient(to_bottom,transparent_10%,rgba(0,0,0,0.3)_50%,#000_100%)]" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <h2
          id="cta-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15]"
        >
          Your next role is
          <br />
          already looking for you
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base sm:text-lg leading-relaxed text-neutral-300">
          Find your next opportunity with HireLoop. Your future starts with the
          right connection.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/signup"
            className="inline-flex h-12 w-48 sm:w-52 items-center justify-center rounded-xl bg-violet-600 px-6 text-sm sm:text-base font-semibold text-white shadow-lg shadow-violet-600/30 transition-all hover:bg-violet-500 hover:scale-[1.02] cursor-pointer text-center"
          >
            Create an account
          </Link>
          <Link
            href="/#pricing"
            className="inline-flex h-12 w-48 sm:w-52 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/15 hover:scale-[1.02] cursor-pointer text-center"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
