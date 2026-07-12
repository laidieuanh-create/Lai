import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ExperienceDetailPage from "./components/ExperienceDetailPage";
import IntroSplash from "./components/IntroSplash";
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Prevent scrolling while the intro splash sequence is active
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  return (
    <BrowserRouter>
      <div className="relative w-full min-h-screen bg-[#0C0C0C]">
        <AnimatePresence>
          {showSplash ? (
            <IntroSplash key="splash" onComplete={() => setShowSplash(false)} />
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/experiences/:slug" element={<ExperienceDetailPage />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}
