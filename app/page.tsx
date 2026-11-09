import HeroSection from "@/components/Home/HeroSection"
import { FeaturesSection } from "@/components/Home/FeaturesSection"
import { PricingSection } from "@/components/Home/PricingSection"
import { CTASection } from "@/components/Home/CTASection"
import { SiteNavbar } from "@/components/Shared/Navbar"
import { SiteFooter } from "@/components/Shared/Footer"

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030305]">
      <SiteNavbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <SiteFooter />
    </main>
  )
}
