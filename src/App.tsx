import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ExperienceDetailPage from "./components/ExperienceDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experiences/:slug" element={<ExperienceDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
