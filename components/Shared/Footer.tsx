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
      { label: "Browse opportunities", href: "/" },
      { label: "Career tools", href: "/#features" },
      { label: "Get started", href: "/#cta" },
    ],
  },
  {
    title: "HireLoop",
    links: [
      { label: "Home", href: "/" },
      { label: "Our platform", href: "/#cta" },
      { label: "Plans", href: "/#pricing" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-black px-4 py-9 text-white sm:px-6 sm:py-11">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-10">
          <div className="max-w-56">
            <Link href="/" aria-label="HireLoop home" className="inline-flex">
              <Image
                src="/images/logo.png"
                alt="HireLoop"
                width={98}
                height={28}
                className="h-6 w-auto"
              />
            </Link>
            <p className="mt-3 text-[10px] leading-relaxed text-neutral-500">
              Connecting great people with opportunities.
            </p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-[10px] font-medium text-neutral-300">
                {group.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[10px] text-neutral-500 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-8 border-t border-white/8 pt-4 text-[9px] text-neutral-600">
          <p>© {new Date().getFullYear()} HireLoop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
