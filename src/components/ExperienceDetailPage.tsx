import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Tag
} from "lucide-react";
import Navbar from "./Navbar";
import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";
import GhostButton from "./GhostButton";
import ContactSection from "./ContactSection";
import { experiencesData } from "../data";

function renderHighlightedText(text: string) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <span key={index} className="text-[#D7E2EA] font-semibold select-text">
          {part}
        </span>
      );
    }
    return (
      <span key={index} className="text-[#D7E2EA]/70 font-light select-text">
        {part}
      </span>
    );
  });
}

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
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-10 pt-6 sm:pt-8 flex flex-col gap-4">
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
      <main className="w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-10 py-12 sm:py-16 md:py-24 flex flex-col gap-16 sm:gap-24">
        {/* Header Block */}
        <header className="flex flex-col gap-6 w-full animate-fade-in">
          <FadeIn delay={0} y={30}>
            <div className="flex items-center gap-2 text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm font-semibold">
              <Tag className="w-4 h-4 text-[#D7E2EA]/50" />
              <span>{experience.category}</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} y={30}>
            <h1
              className="hero-heading font-black uppercase leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(2rem, 6vw, 72px)" }}
            >
              {experience.detailName || experience.name}
            </h1>
            {experience.subtitle && (
              <p className="text-base sm:text-lg text-[#D7E2EA]/65 font-medium tracking-wide mt-2">
                {experience.subtitle}
              </p>
            )}
          </FadeIn>

          {/* Meta Details Row - 3 pills with Briefcase, Calendar, and MapPin icons + Partner Logos inline */}
          <FadeIn delay={0.2} y={20}>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#D7E2EA]/75 mt-2">
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
              {experience.partnerLogos && experience.partnerLogos.length > 0 && (
                <div className="flex items-center gap-4 pl-2 sm:pl-4 border-l border-[#D7E2EA]/10">
                  {experience.partnerLogos.map((logo, i) => (
                    <img
                      key={i}
                      src={logo}
                      alt="Partner Logo"
                      className="h-8 w-auto object-contain select-none"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        </header>

        {/* Timeline or Projects Body Section */}
        {experience.projects && experience.projects.length > 0 ? (
          <div className="flex flex-col gap-24 sm:gap-32 w-full">
            {experience.projects.map((project, idx) => {
              return (
                <div key={idx} className="flex flex-col gap-10 w-full animate-fade-in">
                  {/* Divider line before each project except the first */}
                  {idx > 0 && (
                    <div className="w-full h-[1px] bg-[#D7E2EA]/15 mb-12 sm:mb-16" />
                  )}

                  {/* Project Header Block: Left Column & Right Column */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 w-full">
                    {/* LEFT COLUMN: Name, Logo, Time pill, Position pill */}
                    <div className="md:col-span-5 flex flex-col items-start gap-4 sm:gap-5">
                      {/* Project name as bold label */}
                      <h3 className="font-bold uppercase tracking-wider text-xl sm:text-2xl text-white leading-tight">
                        {project.label}
                      </h3>
                      
                      {/* Logo badge and pills inline */}
                      <div className="flex items-center gap-5">
                        {project.logo && (
                          <motion.img
                            src={project.logo}
                            alt={`${project.label} logo`}
                            className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-contain border border-[#D7E2EA]/10 select-none bg-[#111] p-1 shadow-lg"
                            referrerPolicy="no-referrer"
                            animate={{
                              y: [0, -6, 0],
                              rotate: [0, idx % 2 === 0 ? 3 : -3, 0]
                            }}
                            transition={{
                              duration: 5 + idx,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                        <div className="flex flex-col gap-2">
                          <span className="inline-flex items-center text-[11px] sm:text-xs md:text-sm text-[#D7E2EA]/85 bg-[#1A1A1A] border border-[#D7E2EA]/10 rounded-full px-4 py-2 font-medium w-fit whitespace-nowrap">
                            {project.time}
                          </span>
                          <span className="inline-flex items-center text-[11px] sm:text-xs md:text-sm text-[#D7E2EA]/85 bg-[#1A1A1A] border border-[#D7E2EA]/10 rounded-full px-4 py-2 font-medium w-fit whitespace-nowrap">
                            {project.position}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Description text */}
                    <div className="md:col-span-7 flex flex-col justify-start">
                      <FadeIn delay={idx * 0.1} y={20}>
                        <p className="text-lg sm:text-xl md:text-xl leading-relaxed text-[#D7E2EA]/95 select-text">
                          {renderHighlightedText(project.text)}
                        </p>
                      </FadeIn>
                    </div>
                  </div>

                  {/* Project Gallery: Masonry Grid Layout (1 Large + Smaller Tiles) */}
                  {project.gallery && project.gallery.length > 0 && (
                    <div className="w-full mt-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
                        {/* Image 1: Large focal card */}
                        {project.gallery[0] && (
                          <FadeIn delay={0} y={30} className="lg:col-span-6 lg:row-span-2">
                            <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] border border-[#D7E2EA]/10 h-full w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-auto min-h-[250px] sm:min-h-[320px] lg:min-h-[460px]">
                              <img
                                src={project.gallery[0]}
                                alt={`${project.label} image 1`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          </FadeIn>
                        )}

                        {/* Image 2 */}
                        {project.gallery[1] && (
                          <FadeIn delay={0.05} y={30} className="lg:col-span-3">
                            <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] border border-[#D7E2EA]/10 aspect-[4/3] w-full">
                              <img
                                src={project.gallery[1]}
                                alt={`${project.label} image 2`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          </FadeIn>
                        )}

                        {/* Image 3 */}
                        {project.gallery[2] && (
                          <FadeIn delay={0.1} y={30} className="lg:col-span-3">
                            <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] border border-[#D7E2EA]/10 aspect-[4/3] w-full">
                              <img
                                src={project.gallery[2]}
                                alt={`${project.label} image 3`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          </FadeIn>
                        )}

                        {/* Image 4 */}
                        {project.gallery[3] && (
                          <FadeIn delay={0.15} y={30} className="lg:col-span-3">
                            <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] border border-[#D7E2EA]/10 aspect-[4/3] w-full">
                              <img
                                src={project.gallery[3]}
                                alt={`${project.label} image 4`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          </FadeIn>
                        )}

                        {/* Image 5 */}
                        {project.gallery[4] && (
                          <FadeIn delay={0.2} y={30} className="lg:col-span-3">
                            <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] border border-[#D7E2EA]/10 aspect-[4/3] w-full">
                              <img
                                src={project.gallery[4]}
                                alt={`${project.label} image 5`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          </FadeIn>
                        )}

                        {/* Image 6 */}
                        {project.gallery[5] && (
                          <FadeIn delay={0.25} y={30} className="lg:col-span-6">
                            <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] border border-[#D7E2EA]/10 aspect-[16/9] lg:aspect-auto lg:h-[220px] w-full">
                              <img
                                src={project.gallery[5]}
                                alt={`${project.label} image 6`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          </FadeIn>
                        )}

                        {/* Image 7 */}
                        {project.gallery[6] && (
                          <FadeIn delay={0.3} y={30} className="lg:col-span-6">
                            <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] border border-[#D7E2EA]/10 aspect-[16/9] lg:aspect-auto lg:h-[220px] w-full">
                              <img
                                src={project.gallery[6]}
                                alt={`${project.label} image 7`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          </FadeIn>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>


        ) : (
          <>
            {/* Timeline Body Section */}
            <div className="w-full flex flex-col my-4">
              {experience.timelineItems && experience.timelineItems.length > 0 ? (
                <div className="flex flex-col relative pl-2">
                  {experience.timelineItems.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 relative pb-12 sm:pb-16 last:pb-0"
                      >
                        {/* Connecting Timeline Line */}
                        {idx < experience.timelineItems!.length - 1 && (
                          <div className="absolute left-[15.5px] top-6 bottom-0 w-[1px] bg-[#D7E2EA]/20" />
                        )}

                        {/* LEFT Column: Keyword Label & Marker (~30-35% width) */}
                        <div className="md:col-span-4 flex items-start gap-4">
                          {/* Timeline Marker */}
                          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center relative mt-0.5 md:mt-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#D7E2EA] ring-4 ring-[#D7E2EA]/10" />
                          </div>

                          {/* Label */}
                          <h3 className="font-semibold uppercase tracking-wider text-sm sm:text-base text-[#D7E2EA] pt-1.5 md:pt-1">
                            {item.label}
                          </h3>
                        </div>

                        {/* RIGHT Column: Description (~65-70% width) */}
                        <div className="md:col-span-8 md:pl-4 flex flex-col justify-start">
                          <FadeIn delay={idx * 0.1} y={20}>
                            <p className="text-lg sm:text-xl leading-relaxed">
                              {renderHighlightedText(item.text)}
                            </p>
                          </FadeIn>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Fallback to original paragraphs if timelineItems is missing */
                <div className="flex flex-col gap-8 max-w-3xl mr-auto">
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
              )}
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
          </>
        )}

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
