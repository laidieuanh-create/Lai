import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ExperienceDetailPage from "./components/ExperienceDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative w-full min-h-screen bg-[#0C0C0C]">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/experiences/:slug" element={<ExperienceDetailPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
