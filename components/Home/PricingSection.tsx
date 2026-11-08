"use client"

import Link from "next/link"
import { useState } from "react"
import { Check, Crown, Gem, Sparkles } from "lucide-react"

const plans = [
  {
    name: "Starter",
    icon: Sparkles,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Get started with the essentials.",
    features: [
      "Up to 5 job applications",
      "Basic job search",
      "Application tracking",
      "Weekly job alerts",
    ],
  },
  {
    name: "Growth",
    icon: Crown,
    monthlyPrice: 17,
    yearlyPrice: 14,
    description: "Everything you need to move forward.",
    features: [
      "Unlimited job applications",
      "Advanced job search",
      "AI-powered job matching",
      "Priority job alerts",
    ],
    featured: true,
  },
  {
    name: "Premium",
    icon: Gem,
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: "A personal advantage for your next move.",
    features: [
      "Everything in Growth",
      "Personal career coaching",
      "Priority application review",
      "Exclusive career resources",
    ],
  },
]

export function PricingSection() {
  const [yearly, setYearly] = useState(false)

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-black px-4 py-16 text-white sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-2.5 text-xs sm:text-sm font-semibold tracking-[0.25em] text-violet-400 uppercase">
            <span aria-hidden="true" className="mr-2 text-violet-400">
              ✦
            </span>
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white"
          >
            Pay for the leverage,
            <br />
            not the listings
          </h2>
          <div
            aria-label="Billing period"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#141418] p-1 text-sm"
          >
            <button
              type="button"
              aria-pressed={!yearly}
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-1.5 font-medium transition-all cursor-pointer ${
                !yearly ? "bg-white text-black shadow-sm" : "text-neutral-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={yearly}
              onClick={() => setYearly(true)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-medium transition-all cursor-pointer ${
                yearly ? "bg-white text-black shadow-sm" : "text-neutral-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase text-white">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        <ul className="grid items-center gap-5 sm:grid-cols-3 lg:gap-6 pt-3">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice

            return (
              <li
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-2xl border transition-all ${
                  plan.featured
                    ? "border-violet-500/60 bg-[#12121b] p-7 sm:py-10 sm:px-8 shadow-2xl shadow-violet-500/15 ring-2 ring-violet-500/40 z-10 sm:scale-[1.03]"
                    : "border-white/10 bg-[#0a0a0f] p-6 sm:p-7 hover:border-white/20"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3.5 py-0.5 text-[11px] font-bold tracking-wider uppercase text-white shadow-md">
                    Most Popular
                  </span>
                )}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-base font-semibold text-white">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400">
                        <Icon aria-hidden="true" className="size-4.5" strokeWidth={2} />
                      </span>
                      {plan.name}
                    </div>
                  </div>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                      ${price}
                    </span>
                    <span className="text-sm font-medium text-neutral-400">
                      /month
                    </span>
                  </div>

                  <p className="mt-2.5 text-sm text-neutral-400 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="my-5 h-px bg-white/10" />

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-neutral-300"
                      >
                        <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400">
                          <Check aria-hidden="true" className="size-3" strokeWidth={2.5} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/signup"
                  className={`mt-7 inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition-all cursor-pointer ${
                    plan.featured
                      ? "bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-600/30 hover:scale-[1.01]"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  Get Started
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
