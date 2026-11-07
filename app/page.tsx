import HeroSection from "@/components/Home/HeroSection"
import { FeaturesSection } from "@/components/Home/FeaturesSection"
import { PricingSection } from "@/components/Home/PricingSection"

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030305]">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </main>
  )
}
