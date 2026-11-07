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
      className="bg-black px-4 py-16 text-white sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-9 text-center sm:mb-11">
          <p className="mb-3 text-[9px] font-medium tracking-[0.3em] text-violet-300 uppercase">
            <span aria-hidden="true" className="mr-2 text-violet-400">
              ✦
            </span>
            Pricing 02
          </p>
          <h2
            id="pricing-heading"
            className="text-2xl leading-tight font-medium tracking-tight sm:text-3xl"
          >
            Pay for the leverage,
            <br />
            not the listings
          </h2>
          <div
            aria-label="Billing period"
            className="mt-5 inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#151515] p-1 text-[10px]"
          >
            <button
              type="button"
              aria-pressed={!yearly}
              onClick={() => setYearly(false)}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                !yearly ? "bg-white text-black" : "text-neutral-400"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={yearly}
              onClick={() => setYearly(true)}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                yearly ? "bg-white text-black" : "text-neutral-400"
              }`}
            >
              Yearly
            </button>
            <span className="rounded-full bg-fuchsia-500 px-2 py-1 text-[9px] font-semibold text-white">
              SAVE 20%
            </span>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice

            return (
              <li
                key={plan.name}
                className={`flex flex-col rounded-xl border p-4 sm:p-5 ${
                  plan.featured
                    ? "border-white/30 bg-[#141414]"
                    : "border-white/10 bg-[#080808]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <Icon
                      aria-hidden="true"
                      className="size-3.5 text-violet-300"
                      strokeWidth={1.7}
                    />
                    {plan.name}
                  </div>
                  <p className="text-lg font-semibold tracking-tight">
                    ${price}
                    <span className="ml-1 text-[10px] font-normal text-neutral-500">
                      /mo
                    </span>
                  </p>
                </div>
                <p className="mt-2 text-[10px] text-neutral-400">
                  {plan.description}
                </p>
                <ul className="mt-5 flex-1 space-y-3 border-t border-white/10 pt-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-[10px] text-neutral-300"
                    >
                      <Check
                        aria-hidden="true"
                        className="size-3 shrink-0 text-neutral-500"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`mt-5 inline-flex h-9 items-center justify-center rounded-md px-3 text-[10px] font-medium transition-colors ${
                    plan.featured
                      ? "bg-white text-black hover:bg-neutral-200"
                      : "bg-[#202020] text-white hover:bg-[#2b2b2b]"
                  }`}
                >
                  Create for Free
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
