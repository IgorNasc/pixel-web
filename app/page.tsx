"use client"

import { useState } from "react"
import Header from "@/components/sections/header"
import HeroSection from "@/components/sections/hero-section"
import PricingSection from "@/components/sections/pricing-section"
import FeaturesSection from "@/components/sections/features-section"
import DemoSection from "@/components/sections/demo-section"
import HowItWorksSection from "@/components/sections/how-it-works-section"
import InterestFormSection from "@/components/sections/interest-form-section"
import SEOContent from "@/components/sections/seo-content"
import Footer from "@/components/sections/footer"

export default function AdTracker() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <PricingSection scrollToSection={scrollToSection} />
      <FeaturesSection />
      <DemoSection />
      <HowItWorksSection />
      <SEOContent />
      <InterestFormSection />
      <Footer scrollToSection={scrollToSection} />
    </div>
  )
}
