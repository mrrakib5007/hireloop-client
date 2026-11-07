"use client"

import Image from "next/image"
import { useState } from "react"
import { BriefcaseBusiness, Search } from "lucide-react"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const stats = [
  {
    icon: (
      <svg
        className="size-5 text-zinc-400 group-hover:text-zinc-200 transition-colors"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: (
      <svg
        className="size-5 text-zinc-400 group-hover:text-zinc-200 transition-colors"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
        <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
        <path d="M10 6h4" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
        <path d="M10 18h4" />
      </svg>
    ),
    value: "12K",
    label: "Companies",
  },
  {
    icon: (
      <svg
        className="size-5 text-zinc-400 group-hover:text-zinc-200 transition-colors"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10" cy="8" r="4" />
        <path d="M3 21v-2a5 5 0 0 1 10-2" />
        <circle cx="17.5" cy="17.5" r="3.5" />
        <path d="m20 20 2 2" />
      </svg>
    ),
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: (
      <svg
        className="size-5 text-zinc-400 group-hover:text-zinc-200 transition-colors"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 2 2.3 4.6 5.1.7-3.7 3.6.9 5.1-4.6-2.4-4.6 2.4.9-5.1-3.7-3.6 5.1-.7L12 2z" />
        <circle cx="12" cy="10" r="1.5" />
      </svg>
    ),
    value: "97%",
    label: "Satisfaction Rate",
  },
]

export function HeroSection() {
  const [jobQuery, setJobQuery] = useState("")
  const [locationQuery, setLocationQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search:", {
      jobTitle: jobQuery,
      location: locationQuery,
    })
  }

  const handleTagClick = (tag: string) => {
    setJobQuery(tag)
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#030305] text-white flex flex-col items-center justify-start pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-24">
      {/* Top ambient white / silver soft glow on left and right sides below navbar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 inset-x-0 h-105 bg-[radial-gradient(ellipse_55%_65%_at_0%_15%,rgba(255,255,255,0.18),transparent_70%),radial-gradient(ellipse_55%_65%_at_100%_15%,rgba(255,255,255,0.18),transparent_70%)]"
      />

      {/* Background Globe Illustration - masked at the very top to allow clean white ambient shadows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_100%)]"
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-220 sm:w-287.5 md:w-330 lg:w-360 shrink-0 -mt-8 sm:-mt-20 md:-mt-75 lg:-mt-90">
          <Image
            src="/images/globe.png"
            alt="HireLoop Globe"
            width={1440}
            height={1882}
            priority
            className="w-full h-auto object-cover object-top"
          />
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Top Badge: 50,000+ NEW JOBS THIS MONTH */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-6 max-w-full">
          <span
            aria-hidden="true"
            className="hidden sm:block h-px w-8 sm:w-14 md:w-20 bg-linear-to-r from-transparent to-white/20"
          />
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#12131b]/80 px-3 sm:px-4 py-1 text-xs backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] max-w-full">
            <BriefcaseBusiness className="size-4 sm:size-4.5 text-amber-400 shrink-0" />
            <span className="font-semibold tracking-tight shrink-0 text-white">
              50,000+
            </span>
            <span className="text-zinc-400 font-medium tracking-wider uppercase text-[10px] sm:text-[11px] truncate">
              NEW JOBS THIS MONTH
            </span>
          </div>
          <span
            aria-hidden="true"
            className="hidden sm:block h-px w-8 sm:w-14 md:w-20 bg-linear-to-l from-transparent to-white/20"
          />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-bold tracking-tight text-white text-center leading-[1.18] sm:leading-[1.12] max-w-4xl mx-auto px-1 sm:px-2">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-[17px] text-zinc-400 text-center max-w-2xl mx-auto leading-relaxed px-2">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role -
          faster.
        </p>

        {/* Search Bar Container */}
        <div className="mt-6 sm:mt-8 w-full max-w-full sm:max-w-2xl lg:max-w-170">
          <form
            onSubmit={handleSearch}
            role="search"
            className="relative flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl sm:rounded-full bg-[#0e0f15]/90 border border-white/10 p-2 sm:p-1.5 sm:pl-4 sm:pr-1.5 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] focus-within:border-indigo-500/40 focus-within:shadow-[0_0_35px_rgba(99,102,241,0.2)] transition-all duration-300 gap-2 sm:gap-0"
          >
            {/* Input 1: Job title, skill or company */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0 px-2 py-1">
              <Search className="size-4 sm:size-4.5 text-zinc-400 shrink-0" />
              <input
                type="text"
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
                placeholder="Job title, skill or company"
                className="w-full min-w-0 bg-transparent text-sm sm:text-[15px] text-white placeholder:text-zinc-500 focus:outline-none"
              />
            </div>

            {/* Divider */}
            <div
              aria-hidden="true"
              className="hidden sm:block h-6 w-px bg-zinc-800 shrink-0 mx-2"
            />
            <div
              aria-hidden="true"
              className="sm:hidden h-px w-full bg-zinc-800/60 my-0.5"
            />

            {/* Input 2: Location or Remote */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0 px-2 py-1">
              <svg
                className="size-4 sm:size-4.5 text-zinc-400 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="7" />
                <circle cx="12" cy="12" r="2" />
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
              </svg>
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Location or Remote"
                className="w-full min-w-0 bg-transparent text-sm sm:text-[15px] text-white placeholder:text-zinc-500 focus:outline-none"
              />
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              aria-label="Search jobs"
              className="flex items-center justify-center rounded-xl bg-[#6055f6] hover:bg-[#5246ee] text-white h-10 sm:h-10 px-4 sm:px-3 sm:w-10 transition-all duration-200 shadow-md shadow-indigo-600/30 active:scale-95 cursor-pointer shrink-0"
            >
              <Search className="size-4 sm:size-4.5 text-white stroke-[2.2]" />
            </button>
          </form>
        </div>

        {/* Trending Positions */}
        <div className="mt-4 sm:mt-4.5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs sm:text-sm">
          <span className="text-zinc-400 font-normal mr-1">Trending Position</span>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
            {trendingPositions.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="rounded-full border border-white/10 bg-[#13141b]/80 hover:bg-[#1a1c26] hover:border-white/20 px-3 sm:px-3.5 py-1 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Mid-Hero Globe Caption */}
        <div className="mt-14 sm:mt-18 md:mt-24 lg:mt-28 text-center px-4">
          <p className="text-base sm:text-lg md:text-xl lg:text-[22px] font-medium tracking-tight text-white/95 leading-snug drop-shadow-md max-w-xl mx-auto">
            Assisting over 15,000 job seekers
            <br />
            find their dream positions.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="mt-7 sm:mt-8 md:mt-10 w-full max-w-full lg:max-w-5xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 w-full">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl border border-white/8 bg-[#0c0d12]/90 hover:bg-[#111219]/95 p-3.5 sm:p-5 md:p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:-translate-y-1 shadow-[0_12px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-31.25 sm:min-h-38.75 min-w-0"
              >
                <div>
                  {stat.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-white mb-1 truncate">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-[13px] text-zinc-400 font-normal truncate">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#030305] to-transparent"
      />
    </section>
  )
}

export default HeroSection
