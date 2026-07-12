import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Briefcase, Tag } from "lucide-react";
import Navbar from "./Navbar";
import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";
import GhostButton from "./GhostButton";
import ContactSection from "./ContactSection";
import { experiencesData } from "../data";

export default function ExperienceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const experience = experiencesData.find((exp) => exp.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!experience) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-bold uppercase tracking-widest text-[#D7E2EA] mb-4">
          Experience Not Found
        </h1>
        <p className="text-[#D7E2EA]/60 max-w-md mb-8">
          The requested portfolio project could not be found. It may have been moved or renamed.
        </p>
        <GhostButton label="Back to Homepage" to="/" />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0C0C0C] text-[#D7E2EA] overflow-x-clip min-h-screen flex flex-col justify-between">
      {/* Top Navbar & Back Bar */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-6 sm:pt-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link
            to="/#experiences"
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#D7E2EA]/60 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Experiences</span>
          </Link>
        </div>
        <Navbar />
      </div>

      {/* Main Container */}
      <main className="w-full max-w-7xl mx-auto px-6 py-12 sm:py-16 md:py-24 flex flex-col gap-16 sm:gap-24">
        {/* Header Block */}
        <header className="flex flex-col gap-6 max-w-4xl">
          <FadeIn delay={0} y={30}>
            <div className="flex items-center gap-2 text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm font-semibold">
              <Tag className="w-4 h-4 text-[#D7E2EA]/50" />
              <span>{experience.category} Showcase</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} y={30}>
            <h1
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 8vw, 100px)" }}
            >
              {experience.name}
            </h1>
          </FadeIn>

          {/* Meta Details Row */}
          <FadeIn delay={0.2} y={20}>
            <div className="flex flex-wrap gap-4 sm:gap-8 text-xs sm:text-sm text-[#D7E2EA]/75 mt-2">
              <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#D7E2EA]/10 rounded-full px-4 py-2">
                <Briefcase className="w-4 h-4 text-[#D7E2EA]/60" />
                <span>{experience.role}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#D7E2EA]/10 rounded-full px-4 py-2">
                <Calendar className="w-4 h-4 text-[#D7E2EA]/60" />
                <span>{experience.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#D7E2EA]/10 rounded-full px-4 py-2">
                <MapPin className="w-4 h-4 text-[#D7E2EA]/60" />
                <span>{experience.location}</span>
              </div>
            </div>
          </FadeIn>
        </header>

        {/* Content Paragraphs (with Character Reveal on first block) */}
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          {experience.paragraphs.map((p, idx) => {
            if (idx === 0) {
              return (
                <div key={idx} className="w-full">
                  <AnimatedText
                    text={p}
                    className="text-[#D7E2EA] font-medium leading-relaxed"
                    style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" } as React.CSSProperties}
                  />
                </div>
              );
            }
            return (
              <FadeIn key={idx} delay={idx * 0.15} y={20}>
                <p className="text-[#D7E2EA]/80 font-normal leading-relaxed text-base sm:text-lg">
                  {p}
                </p>
              </FadeIn>
            );
          })}
        </div>

        {/* Dynamic Gallery Grid (6 slots, fully seeded) */}
        <section className="flex flex-col gap-6">
          <FadeIn delay={0} y={30}>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/50">
              Event Gallery
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experience.gallery.map((imgUrl, i) => (
              <FadeIn key={i} delay={i * 0.08} y={30}>
                <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] border border-[#D7E2EA]/10 aspect-[4/3] w-full">
                  <img
                    src={imgUrl}
                    alt={`${experience.name} Gallery visual ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="flex flex-col items-center text-center gap-8 py-12 sm:py-16">
          <FadeIn delay={0} y={30}>
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
              Interested in planning a similar event?
            </h3>
            <p className="text-[#D7E2EA]/60 text-sm sm:text-base mt-2 max-w-md">
              Let's create customized visual layouts, workflows, and production designs together.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} y={20}>
            <ContactButton />
          </FadeIn>

          <FadeIn delay={0.2} y={20}>
            <GhostButton label="← Back to Experiences" to="/#experiences" />
          </FadeIn>
        </section>
      </main>

      {/* Reused Footer */}
      <ContactSection />
    </div>
  );
}
