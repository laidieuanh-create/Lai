import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Navbar from "./Navbar";
import ContactButton from "./ContactButton";
import Magnet from "./Magnet";
import FadeIn from "./FadeIn";

function VerticalMarquee({ text, speed = 25, reverse = false }: { text: string; speed?: number; reverse?: boolean }) {
  const marqueeText = `${text} • `;
  
  return (
    <div 
      className="relative h-[200px] sm:h-[260px] md:h-[320px] w-6 sm:w-8 flex items-center justify-center overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
      }}
    >
      <div className="absolute rotate-[-90deg] whitespace-nowrap">
        <motion.div
          animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: speed,
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap text-[#D7E2EA] opacity-50 font-medium uppercase tracking-[0.3em] text-[10px] sm:text-xs md:text-sm"
        >
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </motion.div>
      </div>
    </div>
  );
}

function TypewriterSubtitle({ introState }: { introState: number }) {
  const [displayedText, setDisplayedText] = React.useState("");
  const [showCursor, setShowCursor] = React.useState(true);

  // Blinking cursor
  React.useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (introState === 1) {
      setDisplayedText("");
      return;
    }

    let isCancelled = false;

    if (introState === 2) {
      const fullText = "Chào mừng bạn đến với Portfolio của tôi!";
      let currentIndex = 0;
      
      const type = () => {
        if (isCancelled) return;
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
          setTimeout(type, 55);
        }
      };
      
      const delayTimeout = setTimeout(type, 100);
      return () => {
        isCancelled = true;
        clearTimeout(delayTimeout);
      };
    }

    if (introState === 3) {
      const fullText = "Chào mừng bạn đến với Portfolio của tôi!";
      const nextText = "Chào mừng!";
      
      let currentIndex = fullText.length;
      
      const erase = () => {
        if (isCancelled) return;
        if (currentIndex >= 0) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex--;
          setTimeout(erase, 12);
        } else {
          setTimeout(typeNext, 50);
        }
      };

      let nextIndex = 0;
      const typeNext = () => {
        if (isCancelled) return;
        if (nextIndex <= nextText.length) {
          setDisplayedText(nextText.slice(0, nextIndex));
          nextIndex++;
          setTimeout(typeNext, 40);
        }
      };

      erase();
      return () => {
        isCancelled = true;
      };
    }
  }, [introState]);

  if (introState === 1) return null;

  const isWelcome = introState === 3 || introState === 4;

  return (
    <motion.div 
      initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      animate={introState === 4 ? { opacity: 0, scale: 0.8, filter: "blur(8px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="flex items-center justify-center font-mono tracking-wider mt-4 h-8 select-none"
    >
      <span className={
        isWelcome 
          ? "text-base sm:text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-slate-200 to-white drop-shadow-[0_0_12px_rgba(168,85,247,0.5)] transition-all duration-300" 
          : "text-xs sm:text-sm md:text-base text-[#D7E2EA] opacity-80"
      }>
        {displayedText}
      </span>
      {introState < 4 && (
        <span className={`inline-block w-1.5 h-4 ml-1 bg-purple-400 ${showCursor ? "opacity-100" : "opacity-0"}`} />
      )}
    </motion.div>
  );
}

export default function HeroSection() {
  const [introState, setIntroState] = React.useState(1);

  React.useEffect(() => {
    // Step 2 (1.5s - 4s): Types out "Want to know about me?"
    const t2 = setTimeout(() => {
      setIntroState(2);
    }, 1500);

    // Step 3 (4s - 4.8s): Erases previous text and types "Welcome"
    const t3 = setTimeout(() => {
      setIntroState(3);
    }, 4000);

    // Step 4 (4.8s - 5.8s+): Settles into final layout, fades in other elements
    const t4 = setTimeout(() => {
      setIntroState(4);
    }, 4800);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const headlineVariants = {
    initial: {
      scale: 1.15,
      filter: "blur(12px)",
      opacity: 0,
      y: 15,
    },
    step1: {
      scale: 1.1,
      filter: "blur(0px)",
      opacity: 1,
      y: -25,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    step4: {
      scale: 1.0,
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  };

  const getHeadlineState = () => {
    if (introState === 4) return "step4";
    return "step1";
  };

  return (
    <section id="hero" className="relative h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none">
      {/* Navbar with FadeIn */}
      <div className={`z-50 ${introState < 4 ? "pointer-events-none" : ""}`}>
        <Navbar active={introState === 4} />
      </div>

      {/* Left Flanking Element (Event Planner Marquee) - Absolute positioned at the left edge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={introState === 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="hidden sm:flex absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-0 flex-col items-center justify-center w-6 sm:w-8 pointer-events-none"
      >
        <VerticalMarquee text="LẬP KẾ HOẠCH SỰ KIỆN • QUẢN LÝ NGÂN SÁCH • ĐIỀU PHỐI NHÀ CUNG CẤP • HẬU CẦN • CHỈ ĐẠO SÁNG TẠO • QUẢN LÝ TIẾN ĐỘ" speed={25} />
      </motion.div>

      {/* Right Flanking Element (Available for projects Marquee with Sparkles icon) - Absolute positioned at the right edge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={introState === 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="hidden sm:flex absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-0 flex-col items-center justify-center w-6 sm:w-8 gap-6 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#D7E2EA] opacity-50 flex-shrink-0" />
          <VerticalMarquee text="SẴN SÀNG • KIẾN TẠO • SỰ KIỆN • ĐÁNG NHỚ • NGHỆ THUẬT • CHUYÊN NGHIỆP" speed={25} reverse={true} />
        </div>
      </motion.div>

      {/* Hero Heading Container */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 md:px-10 overflow-hidden relative z-0">
        <div className="flex flex-col items-center justify-center w-full">
          <motion.h1
            variants={headlineVariants}
            initial="initial"
            animate={getHeadlineState()}
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-[#D7E2EA] text-[6.2vw] sm:text-[6.4vw] md:text-[6.4vw] lg:text-[6.2vw] xl:text-[6vw] drop-shadow-[0_4px_12px_rgba(255,255,255,0.08)] mt-6 sm:mt-4 md:-mt-5"
          >
            XIN CHÀO, TÔI LÀ DIỆU ANH
          </motion.h1>
          
          <TypewriterSubtitle introState={introState} />
        </div>
      </div>

      {/* Hero Portrait Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={introState === 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none sm:pointer-events-auto"
      >
        <Magnet padding={150} strength={3}>
          <img
            src="https://res.cloudinary.com/g1xdn507/image/upload/v1783753887/Untitled_design_8_otyhrc.png"
            alt="Dieu Anh"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain select-none pointer-events-none"
          />
        </Magnet>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={introState === 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className={`flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20 ${introState < 4 ? "pointer-events-none" : ""}`}
      >
        <p
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
        >
          Nơi đam mê tạo nên những sự kiện khó quên
        </p>

        <ContactButton />
      </motion.div>
    </section>
  );
}
