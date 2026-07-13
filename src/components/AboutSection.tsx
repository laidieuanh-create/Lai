import React from "react";
import { motion, AnimatePresence } from "motion/react";
import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";
import graduationCapIcon from "../assets/images/graduation_cap_icon_1783786863491.jpg";

const BASE_IMG_URL = "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/";

// Excluding the moon icon since it's replaced by the interactive graduation cap
const cornerImages = [
  {
    src: "p59_1.4659672e.png",
    alt: "Phần tử trang trí dưới cùng bên trái",
    className: "absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none select-none z-0",
    delay: 0.25,
    x: -80,
  },
  {
    src: "lego_icon-1.703bb594.png",
    alt: "Biểu tượng lego trang trí",
    className: "absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none z-0",
    delay: 0.15,
    x: 80,
  },
  {
    src: "Group_134-1.2e04f3ce.png",
    alt: "Phần tử trang trí dưới cùng bên phải",
    className: "absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none select-none z-0",
    delay: 0.3,
    x: 80,
  },
];

export default function AboutSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHoverSupported, setIsHoverSupported] = React.useState(true);
  const [cardStyle, setCardStyle] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHoverSupported(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsHoverSupported(e.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const updateCardPosition = React.useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Use a responsive card width
    const cardWidth = Math.min(320, viewportWidth - 32);

    // Center the card horizontally relative to the icon center:
    const iconCenter = rect.left + rect.width / 2;
    let cardLeft = iconCenter - cardWidth / 2;

    // Viewport boundaries padding (16px)
    const padding = 16;
    if (cardLeft < padding) {
      cardLeft = padding;
    } else if (cardLeft + cardWidth > viewportWidth - padding) {
      cardLeft = viewportWidth - padding - cardWidth;
    }

    // Convert to relative position for the absolute container
    const relativeLeft = cardLeft - rect.left;

    setCardStyle({
      position: "absolute",
      left: `${relativeLeft}px`,
      width: `${cardWidth}px`,
      top: "100%",
    });
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      updateCardPosition();
      window.addEventListener("resize", updateCardPosition);
      window.addEventListener("scroll", updateCardPosition);
    }
    return () => {
      window.removeEventListener("resize", updateCardPosition);
      window.removeEventListener("scroll", updateCardPosition);
    };
  }, [isOpen, updateCardPosition]);

  React.useEffect(() => {
    if (isHoverSupported) return;
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, isHoverSupported]);

  const handleMouseEnter = () => {
    if (isHoverSupported) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isHoverSupported) {
      setIsOpen(false);
    }
  };

  const handleIconClick = (e: React.MouseEvent) => {
    if (!isHoverSupported) {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 z-20 select-none"
    >
      {/* Interactive Graduation Cap Icon (Top-Left corner) */}
      <div 
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] z-30 select-none"
      >
        <FadeIn delay={0.1} duration={0.9} x={-80} y={0}>
          <div
            ref={containerRef}
            className="relative w-full h-full cursor-pointer pointer-events-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleIconClick}
          >
            {/* Bobbing floating animation for the icon */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full h-full"
            >
              <motion.img
                src={graduationCapIcon}
                alt="Biểu tượng mũ cử nhân tương tác"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain"
                style={{ mixBlendMode: "screen" }}
                whileHover={isHoverSupported ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              />

              {/* Pulsing visual cue / interactive indicator */}
               {!isOpen && (
                <div className="absolute top-[12%] right-[12%] flex h-3.5 w-3.5 z-40">
                  <motion.span
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inline-flex h-full w-full rounded-full bg-purple-400"
                  />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]"></span>
                  
                  {/* Subtle "tap" label for mobile users */}
                   {!isHoverSupported && (
                    <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-purple-600/90 text-[9px] text-white px-1.5 py-0.5 rounded shadow whitespace-nowrap font-sans font-medium uppercase tracking-wider animate-bounce">
                      Chạm
                    </span>
                  )}
                </div>
              )}
            </motion.div>

            {/* Floating Info Card */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-3 p-4 rounded-xl bg-[#141414]/95 border border-purple-500/30 backdrop-blur-md shadow-2xl flex flex-col gap-3.5 z-50 text-left pointer-events-auto"
                  style={cardStyle}
                >
                  {/* Two university logos side by side */}
                  <div className="flex items-center gap-3 bg-white rounded-lg px-2.5 py-1 justify-center shadow-md select-none">
                    <div className="flex-1 h-11 flex items-center justify-center bg-white rounded-md">
                      <img
                        src="https://res.cloudinary.com/g1xdn507/image/upload/v1783787177/buv_logo_v7qjdm.png"
                        alt="British University Vietnam (BUV) Logo"
                        referrerPolicy="no-referrer"
                        className="max-h-11 max-w-full object-contain"
                      />
                    </div>
                    <div className="w-[1.5px] h-8 bg-gray-200 shrink-0" />
                    <div className="flex-1 h-11 flex items-center justify-center bg-white rounded-md">
                      <img
                        src="https://res.cloudinary.com/g1xdn507/image/upload/v1783787207/logo-uos.xbc4ad30e_bblg3i.png"
                        alt="University of Staffordshire Logo"
                        referrerPolicy="no-referrer"
                        className="max-h-11 max-w-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Program Title & Honours Subtext */}
                  <div className="flex flex-col gap-2 mt-0.5">
                    <h4 className="text-white font-bold text-sm sm:text-base leading-snug">
                      Cử nhân Danh dự (BA Hons) ngành Quản trị Sự kiện
                    </h4>

                    <div className="flex items-center mt-0.5">
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider text-white shadow-inner"
                        style={{
                          background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                        }}
                      >
                        Tốt nghiệp loại Xuất sắc (First Class)
                      </span>
                    </div>
                  </div>

                  {/* Timestamp Line */}
                  <div className="mt-0.5 pt-2 border-t border-white/10 flex items-center justify-between text-gray-400 text-[10px] sm:text-xs font-mono">
                    <span>Tháng 8/2023 – Tháng 4/2026</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>

      {/* Decorative Corner Images (Lego, etc.) */}
      {cornerImages.map((img, i) => (
        <FadeIn
          key={i}
          delay={img.delay}
          duration={0.9}
          x={img.x}
          y={0}
          className={img.className}
        >
          <img
            src={`${BASE_IMG_URL}${img.src}`}
            alt={img.alt}
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain"
          />
        </FadeIn>
      ))}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center max-w-4xl z-10">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight select-none"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            Giới thiệu
          </h2>
        </FadeIn>

        {/* Gap: heading -> text */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Animated paragraph */}
        <div className="w-full max-w-[560px]">
          <AnimatedText
            text="Tôi chuyên sâu trong lĩnh vực lập kế hoạch sự kiện, truyền thông tiếp thị, tổ chức triển lãm, hội nghị và các trải nghiệm kết nối doanh nghiệp. Tôi đam mê chuyển hóa các ý tưởng thành những trải nghiệm đáng nhớ và tạo dấu ấn sâu sắc. Hãy cùng nhau kiến tạo những cột mốc không thể quên."
            className="text-[#D7E2EA] font-medium leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" } as React.CSSProperties}
          />
        </div>

        {/* Gap: text -> button */}
        <div className="h-16 sm:h-20 md:h-24" />

        <FadeIn delay={0.1} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
