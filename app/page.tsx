import HeroSection from "@/components/Home/HeroSection"
import { FeaturesSection } from "@/components/Home/FeaturesSection"

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030305]">
      <HeroSection />
      <FeaturesSection />
    </main>
  )
}
