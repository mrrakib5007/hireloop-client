import Image from "next/image"
import Link from "next/link"

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Create an account", href: "/signup" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Browse opportunities", href: "/jobs" },
      { label: "Career tools", href: "/#features" },
      { label: "Get started", href: "/#cta" },
    ],
  },
  {
    title: "HireLoop",
    links: [
      { label: "Home", href: "/" },
      { label: "Company", href: "/company" },
      { label: "Pricing plans", href: "/#pricing" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-14 text-white sm:px-6 sm:py-18">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-12">
          <div className="max-w-xs">
            <Link href="/" aria-label="HireLoop home" className="inline-flex outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
              <Image
                src="/images/logo.png"
                alt="HireLoop"
                width={154}
                height={44}
                className="h-7 w-auto"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Connecting world-class talent with leading companies around the globe.
            </p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold tracking-wider text-white uppercase">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} HireLoop Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
