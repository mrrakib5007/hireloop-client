import {
  Briefcase,
  Building2,
  Sparkles,
  TrendingUp,
} from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Job Matching",
    description: "Get personalized job recommendations powered by intelligent machine learning.",
  },
  {
    icon: Briefcase,
    title: "Direct Applications",
    description: "Apply directly to hiring managers without going through recruitment black holes.",
  },
  {
    icon: Building2,
    title: "Verified Companies",
    description: "Connect with vetted top-tier employers actively hiring top talent.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Resources",
    description: "Find the guidance, salary insights, and tools you need for your next move.",
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="bg-[#121215] px-4 py-16 text-white sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-xs sm:text-sm font-semibold tracking-[0.25em] text-violet-400 uppercase">
            <span aria-hidden="true" className="mr-2 text-violet-400">
              ✦
            </span>
            Features Jobs
          </p>
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white"
          >
            Everything you need
            <br />
            to succeed
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="flex flex-col items-start gap-4 rounded-2xl border border-white/8 bg-white/2 p-6 transition-all hover:border-violet-500/30 hover:bg-white/4"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-violet-500/10 text-violet-400 shadow-inner">
                <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
