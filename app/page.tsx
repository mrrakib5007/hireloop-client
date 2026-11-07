import HeroSection from "@/components/Home/HeroSection"
import { FeaturesSection } from "@/components/Home/FeaturesSection"
import { PricingSection } from "@/components/Home/PricingSection"
import { CTASection } from "@/components/Home/CTASection"

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030305]">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </main>
  )
}
