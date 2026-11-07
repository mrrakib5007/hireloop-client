import {
  BellRing,
  ChartNoAxesColumnIncreasing,
  FileStack,
  FileUser,
  GraduationCap,
  MousePointerClick,
  SearchCheck,
  Sparkles,
} from "lucide-react"

const features = [
  {
    icon: SearchCheck,
    title: "Smart Search",
    description: "Find the right opportunities with powerful, precise search.",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Salary Insights",
    description: "Know what your skills are worth with real salary insights.",
  },
  {
    icon: FileStack,
    title: "Job Applications",
    description: "Keep every application organized in one place.",
  },
  {
    icon: BellRing,
    title: "Smart Alerts",
    description: "Get notified when the right opportunities appear.",
  },
  {
    icon: MousePointerClick,
    title: "One Click Apply",
    description: "Spend less time applying and more time moving forward.",
  },
  {
    icon: FileUser,
    title: "Resume Builder",
    description: "Create a polished resume that gets noticed.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Matching",
    description: "Discover roles matched to your skills and experience.",
  },
  {
    icon: GraduationCap,
    title: "Career Growth Resources",
    description: "Find the guidance you need for your next career move.",
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="bg-[#171717] px-4 py-14 text-white sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 text-center sm:mb-11">
          <p className="mb-3 text-[9px] font-medium tracking-[0.3em] text-violet-300 uppercase">
            <span aria-hidden="true" className="mr-2 text-violet-400">
              ✦
            </span>
            Features Jobs
          </p>
          <h2
            id="features-heading"
            className="text-2xl leading-tight font-medium tracking-tight sm:text-3xl"
          >
            Everything you need
            <br />
            to succeed
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-x-7 gap-y-6 sm:grid-cols-2 sm:gap-y-7 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/50 text-violet-300">
                <Icon aria-hidden="true" className="size-4" strokeWidth={1.6} />
              </span>
              <div className="min-w-0 pt-0.5">
                <h3 className="text-xs font-medium text-white">{title}</h3>
                <p className="mt-1 text-[10px] leading-relaxed text-neutral-400">
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
