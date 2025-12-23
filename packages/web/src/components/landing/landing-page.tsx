"use client";

import { AnimatedBackground } from "./animated-background";
import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { LiveStatsSection } from "./live-stats-section";

export function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <HeroSection />
      <FeaturesSection />
      <LiveStatsSection />
    </div>
  );
}
