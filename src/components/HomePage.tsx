import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "./HeroSection";
import MarqueeSection from "./MarqueeSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import ExperiencesSection from "./ExperiencesSection";
import ContactSection from "./ContactSection";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash scroll after page mount
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="w-full bg-[#0C0C0C] text-[#D7E2EA] overflow-x-clip">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ExperiencesSection />
      <ContactSection />
    </div>
  );
}
