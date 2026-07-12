import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

interface GhostButtonProps {
  label: string;
  to?: string;
  onClick?: () => void;
  className?: string;
}

export default function GhostButton({ label, to, onClick, className = "" }: GhostButtonProps) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base text-center transition-colors hover:bg-[#D7E2EA]/10 cursor-pointer ${className}`}
    >
      {label}
    </motion.div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block" onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="inline-block focus:outline-none">
      {content}
    </button>
  );
}
