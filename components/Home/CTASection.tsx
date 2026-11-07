import Image from "next/image"
import Link from "next/link"

export function CTASection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative isolate flex min-h-85 items-center justify-center overflow-hidden bg-black px-4 py-16 text-center text-white sm:min-h-95 sm:px-6"
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
          className="object-cover object-top opacity-80"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_0%,rgba(83,68,255,0.45),transparent_72%),linear-gradient(to_bottom,transparent_10%,rgba(0,0,0,0.25)_52%,#000_100%)]" />
      </div>

      <div className="relative mx-auto max-w-xl">
        <h2
          id="cta-heading"
          className="text-2xl leading-tight font-medium tracking-tight sm:text-3xl"
        >
          Your next role is
          <br />
          already looking for you
        </h2>
        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-neutral-300 sm:text-sm">
          Find your next opportunity with HireLoop. Your future starts with the
          right connection.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/signup"
            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 text-[11px] font-medium text-black transition-colors hover:bg-neutral-200"
          >
            Create an account
          </Link>
          <Link
            href="/#pricing"
            className="inline-flex h-9 items-center justify-center rounded-md border border-white/15 bg-black/30 px-4 text-[11px] font-medium text-white transition-colors hover:bg-white/10"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
