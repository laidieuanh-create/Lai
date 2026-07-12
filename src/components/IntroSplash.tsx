import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface IntroSplashProps {
  key?: React.Key;
  onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    // Total display duration of the splash sequence before starting transition
    const timer = setTimeout(() => {
      onComplete();
    }, 3600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const headingText = "Hi, i'm Dieu Anh";
  const characters = headingText.split("");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom elegant cubic bezier curve
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 w-full h-full bg-[#0C0C0C] z-[9999] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center px-6 text-center max-w-4xl">
        {/* Centered Heading */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-heading font-black uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-[#D7E2EA] drop-shadow-[0_4px_12px_rgba(255,255,255,0.08)] flex flex-wrap justify-center"
          style={{ fontSize: "clamp(2.5rem, 9vw, 130px)" }}
        >
          {characters.map((char, index) => {
            if (char === " ") {
              return <span key={index} className="inline-block">&nbsp;</span>;
            }
            return (
              <motion.span
                key={index}
                variants={charVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Subtext below heading with custom breathing animation sequence */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={
            isPulsing
              ? { opacity: [0.6, 1, 0.6], y: 0 }
              : { opacity: 0.6, y: 0 }
          }
          transition={
            isPulsing
              ? {
                  opacity: {
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  },
                }
              : {
                  opacity: { delay: 1.2, duration: 0.8, ease: "easeOut" },
                  y: { delay: 1.2, duration: 0.8, ease: "easeOut" },
                }
          }
          onAnimationComplete={() => {
            if (!isPulsing) {
              setIsPulsing(true);
            }
          }}
          className="text-[#D7E2EA] font-light tracking-wide text-lg sm:text-xl mt-6 sm:mt-8 select-none"
        >
          Want to know about me?
        </motion.p>
      </div>
    </motion.div>
  );
}
