import React from "react";
import FadeIn from "./FadeIn";

const services = [
  {
    num: "01",
    name: "Event Planning",
    desc: "Coordinating event logistics, vendor and budget management, and on-site execution from concept to delivery.",
  },
  {
    num: "02",
    name: "Event Marketing",
    desc: "Integrated marketing campaigns, social media promotion, and audience engagement strategies that maximize event visibility before, during, and after every experience.",
  },
  {
    num: "03",
    name: "Bilingual Hosting (MC)",
    desc: "MC hosting and English–Vietnamese interpretation for conferences, forums, and cross-cultural business events.",
  },
  {
    num: "04",
    name: "Project Management",
    desc: "Efficient timeline management, vendor coordination, budgeting, and on-site execution to deliver events smoothly, on time, and within scope.",
  },
  {
    num: "05",
    name: "Creative Design",
    desc: "Designing presentations, event branding, and short-form videos using CapCut, Canva, and AI-assisted creative tools.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="skills"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 sm:mb-20 md:mb-28">
          <FadeIn delay={0} y={40}>
            <h2
              className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight inline-block"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              Skills
            </h2>
          </FadeIn>
        </div>

        {/* Services List */}
        <div className="flex flex-col">
          {services.map((item, i) => (
            <FadeIn
              key={i}
              delay={i * 0.1}
              y={30}
              className={`flex flex-col md:flex-row md:items-center py-8 sm:py-10 md:py-12 gap-6 md:gap-12 border-[#0C0C0C]/15 ${
                i > 0 ? "border-t" : ""
              }`}
            >
              {/* Number Left */}
              <div
                className="font-black text-[#0C0C0C] tracking-tight leading-none min-w-[120px] md:min-w-[180px] shrink-0"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {item.num}
              </div>

              {/* Name & Description Right */}
              <div className="flex flex-col gap-2 md:gap-4 flex-1">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1.2rem, 2.2vw, 2.1rem)" }}
                >
                  {item.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/70"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
