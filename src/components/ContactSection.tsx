import React, { useState } from "react";
import { Mail, Instagram, Linkedin, Calendar, CheckCircle2, Loader2 } from "lucide-react";
import FadeIn from "./FadeIn";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    reason: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", company: "", reason: "", message: "" });
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 border-t border-[#D7E2EA]/15 relative z-20"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
        {/* Left Column: Info & Message */}
        <div className="flex flex-col justify-between">
          <div>
            <FadeIn delay={0} y={30}>
              <span className="text-xs font-semibold text-[#D7E2EA]/50 uppercase tracking-widest block mb-3">
                LET'S CONNECT
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#D7E2EA] leading-tight mb-6">
                LET'S BUILD SOMETHING <br />
                <span className="hero-heading font-black">GREAT TOGETHER</span>
              </h2>
              <p className="text-[#D7E2EA]/70 font-light max-w-md text-sm sm:text-base leading-relaxed mb-8">
                Open to new opportunities in event planning. Reach out if you'd like to chat about a role, a project, or just to connect.
              </p>
            </FadeIn>

            {/* Quick Contact Links */}
            <div className="flex flex-col gap-4">
              <FadeIn delay={0.1} y={20}>
                <a
                  href="mailto:laidieuanh@gmail.com"
                  className="flex items-center gap-3 text-sm sm:text-base hover:text-white transition-colors group w-max"
                >
                  <div className="p-3 rounded-full border border-[#D7E2EA]/15 group-hover:bg-[#D7E2EA]/10 transition-colors">
                    <Mail className="w-5 h-5 text-[#D7E2EA]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/45 block">
                      Email Me
                    </span>
                    <span className="font-medium">laidieuanh@gmail.com</span>
                  </div>
                </a>
              </FadeIn>

              <FadeIn delay={0.15} y={20}>
                <div className="flex items-center gap-3 text-sm sm:text-base w-max">
                  <div className="p-3 rounded-full border border-[#D7E2EA]/15">
                    <Calendar className="w-5 h-5 text-[#D7E2EA]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/45 block">
                      Location
                    </span>
                    <span className="font-medium">Vietnam (Hanoi & HCMC)</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Social Icons & Copyright */}
          <div className="mt-12 pt-8 border-t border-[#D7E2EA]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-[#D7E2EA]/10 hover:bg-[#D7E2EA]/10 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-[#D7E2EA]/10 hover:bg-[#D7E2EA]/10 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-[#D7E2EA]/40 uppercase tracking-widest font-mono">
              © 2026 Dieu Anh. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form Card */}
        <FadeIn delay={0.2} y={30} className="relative">
          <div className="bg-[#121212] border border-[#D7E2EA]/15 rounded-[30px] p-6 sm:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold uppercase tracking-wide text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#D7E2EA]/60 text-sm max-w-sm">
                  Thank you for reaching out! Dieu Anh will connect with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/60 block mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-[#1A1A1A] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/60 block mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full bg-[#1A1A1A] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/60 block mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Where are you reaching out from?"
                    className="w-full bg-[#1A1A1A] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/60 block mb-2">
                    Reason for Contact
                  </label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors cursor-pointer"
                  >
                    <option value="" disabled className="text-[#D7E2EA]/30">Select a reason</option>
                    <option value="Job Opportunity">Job Opportunity</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance / Project-based">Freelance / Project-based</option>
                    <option value="Just Networking">Just Networking</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/60 block mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about the role, the team, or what you'd like to discuss..."
                    className="w-full bg-[#1A1A1A] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white hover:bg-[#D7E2EA] text-[#0C0C0C] font-semibold uppercase tracking-wider py-4 rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl mt-2 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
