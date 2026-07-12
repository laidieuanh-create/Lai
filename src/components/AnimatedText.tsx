import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharacterProps {
  progress: MotionValue<number>;
  start: number;
  end: number;
  char: string;
  key?: React.Key;
}

function Character({ progress, start, end, char }: CharacterProps) {
  const opacity = useTransform(progress, [start, end], [0.25, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre-wrap">
      {char}
    </motion.span>
  );
}

export default function AnimatedText({ text, className = "", style }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const characters = text.split("");

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap justify-center gap-y-1`} style={style}>
      {characters.map((char, index) => {
        const start = index / characters.length;
        const end = (index + 1) / characters.length;
        return (
          <Character
            key={index}
            progress={scrollYProgress}
            start={start}
            end={end}
            char={char}
          />
        );
      })}
    </p>
  );
}
