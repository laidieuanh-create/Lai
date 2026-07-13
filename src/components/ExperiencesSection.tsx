import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import FadeIn from "./FadeIn";
import GhostButton from "./GhostButton";
import { experiencesData } from "../data";

interface ExperienceCardProps {
  exp: typeof experiencesData[0];
  index: number;
  totalCards: number;
  isMobile: boolean;
  progress: any;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, index, totalCards, isMobile, progress }) => {
  const navigate = useNavigate();

  const targetScale = 1 - ((totalCards - 1 - index) * 0.04);
  const range = [index * (1 / totalCards), 1];
  const scale = useTransform(progress, range, [1, targetScale]);

  const stickyTop = isMobile ? 96 : 128; // top-24 is 96px, top-32 is 128px
  const topOffset = `${index * 24}px`;

  return (
    <div
      className="h-screen sticky w-full flex items-start justify-center top-0"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div
        onClick={() => navigate(`/experiences/${exp.slug}`)}
        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-8 md:p-10 transition-shadow hover:shadow-[0_10px_30px_rgba(215,226,234,0.05)] cursor-pointer w-full relative"
        style={{
          scale,
          top: `calc(${stickyTop}px + ${topOffset})`,
          transformOrigin: "top center",
          height: "75vh",
          minHeight: "440px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="flex flex-col h-full w-full justify-between">
          {/* Top Row Layout */}
          <div className="flex items-center justify-between gap-4 border-b border-[#D7E2EA]/15 pb-4 md:pb-6">
            <div className="flex items-center gap-4 md:gap-6">
              <span
                className="font-black leading-none text-[#D7E2EA] select-none"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                {exp.id}
              </span>
              <div>
                <span className="text-[10px] sm:text-xs font-semibold text-[#D7E2EA]/50 uppercase tracking-widest block">
                  {exp.category}
                </span>
                <h3
                  className="font-bold uppercase text-[#D7E2EA] tracking-wide mt-0.5"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 1.8rem)" }}
                >
                  {exp.name}
                </h3>
                {exp.subtitle && (
                  <div className="text-sm sm:text-base text-[#D7E2EA]/60 font-light mt-0.5">
                    {exp.subtitle}
                  </div>
                )}
              </div>
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              <GhostButton
                label="Xem chi tiết"
                to={`/experiences/${exp.slug}`}
                className="py-2 px-5 sm:px-7 sm:py-2.5 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Bottom Row Layout: 2-Column Image Grid (40/60) */}
          <div className="grid grid-cols-1 md:grid-cols-10 gap-3 md:gap-4 flex-1 min-h-0 mt-4 md:mt-6 overflow-hidden">
            {/* Left 40% (2 stacked images) */}
            <div className="md:col-span-4 flex flex-col gap-3 md:gap-4 h-full min-h-0">
              <div className="flex-1 overflow-hidden rounded-[20px] sm:rounded-[25px]">
                <img
                  src={exp.col1Img1}
                  alt={`${exp.name} scene 1`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 overflow-hidden rounded-[20px] sm:rounded-[25px]">
                <img
                  src={exp.col1Img2}
                  alt={`${exp.name} scene 2`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right 60% (1 tall image) */}
            <div className="md:col-span-6 overflow-hidden rounded-[20px] sm:rounded-[25px] h-full min-h-0">
              <img
                src={exp.col2Img}
                alt={`${exp.name} showcase`}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ExperiencesSection() {
  const totalCards = experiencesData.length;
  const [isMobile, setIsMobile] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardsContainerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="experiences"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 py-24 relative z-20 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight inline-block"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              Kinh nghiệm
            </h2>
          </FadeIn>
        </div>

        {/* Sticky Stacking Cards Container */}
        <div ref={cardsContainerRef} className="flex flex-col">
          {experiencesData.map((exp, index) => (
            <ExperienceCard
              key={exp.slug}
              exp={exp}
              index={index}
              totalCards={totalCards}
              isMobile={isMobile}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

