"use client"

import { LandingHeader } from "@/components/landing-header"
import { HeroSection } from "@/components/hero-section"
import { StatsBlock } from "@/components/stats-block"
import { ProblemSection } from "@/components/problem-section"
import { FeaturesGrid } from "@/components/features-grid"
import { PricingSection } from "@/components/pricing-section"
import { CTAFooter } from "@/components/cta-footer"
import { FloatingContactButton } from "@/components/floating-contact-button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <HeroSection />
      <StatsBlock />
      <ProblemSection />
      <FeaturesGrid />
      <PricingSection />
      <CTAFooter />
      <FloatingContactButton />
    </div>
  )
}
