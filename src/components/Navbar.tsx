import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export default function Navbar({ active = true }: { active?: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (id: string) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  const navItems = [
    { label: "Giới thiệu", id: "about" },
    { label: "Kỹ năng", id: "skills" },
    { label: "Kinh nghiệm", id: "experiences" },
    { label: "Liên hệ", id: "contact" },
  ];

  return (
    <nav id="global-navbar" className="flex justify-between items-center w-full px-6 md:px-10 pt-6 md:pt-8 z-50">
      {navItems.map((item, index) => (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, y: -10 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{
            opacity: { duration: 0.5, ease: "easeOut" },
            y: { duration: 0.5, ease: "easeOut" },
            delay: index * 0.05,
          }}
          onClick={() => handleLinkClick(item.id)}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer focus:outline-none"
        >
          {item.label}
        </motion.button>
      ))}
    </nav>
  );
}

