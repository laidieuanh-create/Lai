import React, { useState } from "react";
import { Mail, Linkedin, Calendar, CheckCircle2, Loader2, Phone, Facebook, X } from "lucide-react";
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
  const [showWeChatModal, setShowWeChatModal] = useState(false);

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
      alert("Không thể gửi được biểu mẫu. Vui lòng thử lại sau.");
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
                KẾT NỐI VỚI TÔI
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight text-[#D7E2EA] leading-tight mb-6">
                <span className="inline-block">CÙNG NHAU KIẾN TẠO</span> <br />
                <span className="hero-heading font-black inline-block">NHỮNG ĐIỀU TUYỆT VỜI</span>
              </h2>
              <p className="text-[#D7E2EA]/70 font-light max-w-md text-sm sm:text-base leading-relaxed mb-8">
                Sẵn sàng cho những thử thách mới. Hãy cùng kết nối để tạo nên những giá trị ý nghĩa. ⭐
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
                      EMAIL
                    </span>
                    <span className="font-medium">laidieuanh@gmail.com</span>
                  </div>
                </a>
              </FadeIn>
 
              <FadeIn delay={0.12} y={20}>
                <a
                  href="tel:+84918076000"
                  className="flex items-center gap-3 text-sm sm:text-base hover:text-white transition-colors group w-max"
                >
                  <div className="p-3 rounded-full border border-[#D7E2EA]/15 group-hover:bg-[#D7E2EA]/10 transition-colors">
                    <Phone className="w-5 h-5 text-[#D7E2EA]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/45 block">
                      ĐIỆN THOẠI
                    </span>
                    <span className="font-medium block">+84 918 076 000</span>
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
                      ĐỊA ĐIỂM
                    </span>
                    <span className="font-medium">Việt Nam</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Social Icons & Copyright */}
          <div className="mt-12 pt-8 border-t border-[#D7E2EA]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/dieu.anh.lai.2024/"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-[#D7E2EA]/10 hover:bg-[#D7E2EA]/10 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/lai-dieu-anh-794893295/"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-[#D7E2EA]/10 hover:bg-[#D7E2EA]/10 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/84918076000"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-[#D7E2EA]/10 hover:bg-[#D7E2EA]/10 transition-colors"
                title="WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.83.493 3.553 1.353 5.045L2 22l5.127-1.347A9.945 9.945 0 0012.004 22C17.524 22 22 17.52 22 12.004S17.524 2 12.004 2zm5.727 13.918c-.244.687-1.22 1.251-1.742 1.295-.47.04-1.077.062-1.722-.143a9.23 9.23 0 01-3.606-2.222 10.158 10.158 0 01-2.433-3.411c-.482-.8-.745-1.73-.745-2.697 0-1.89 1.01-2.903 1.378-3.268.271-.271.556-.341.745-.341.19 0 .378.01.543.02.176.01.408-.07.64.47.243.57.828 2.02.9 2.16.071.14.12.311.02.5-.1.19-.15.3-.3.472-.15.172-.315.385-.45.517-.15.143-.31.3-.133.605.176.3.784 1.29 1.681 2.086.772.684 1.42 1.05 1.742 1.213.322.16.51.13.7.02.19-.112.815-.947 1.033-1.272.218-.322.438-.27.733-.16.295.11 1.872.88 2.195 1.04.322.16.536.24.613.37.077.13.077.752-.167 1.442z" />
                </svg>
              </a>
              <button
                onClick={() => setShowWeChatModal(true)}
                className="p-3 rounded-full border border-[#D7E2EA]/10 hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
                title="WeChat"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M8.2 14c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5zm3.8 0c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5zm4.2-2.5C16.2 7.7 12.5 5 8.1 5s-8.1 2.7-8.1 6.1c0 2.1 1.5 3.9 3.8 4.9L3.3 17.7l2.1-1c.8.3 1.7.5 2.7.5 4.4 0 8.1-2.7 8.1-6.1zm3.3 4.2c.8 0 1.5-.2 2.2-.5l1.7.8-.4-1.4c1.8-1 2.9-2.4 2.9-4.2 0-2.8-2.8-5.1-6.4-5.1-1 0-1.9.2-2.8.5 2 1.3 3.2 3.1 3.2 5.1 0 3.1-2.7 5.6-6.2 5.6-.3 0-.6 0-.8-.1.7 1.3 2.1 2.2 3.9 2.2l1.7.8-.4-1.4c1.8-1 2.9-2.4 2.9-4.2v-.3z" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-[#D7E2EA]/40 uppercase tracking-widest font-mono">
              © 2026 Diệu Anh. Toàn bộ bản quyền được bảo lưu.
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
                  Gửi tin nhắn thành công!
                </h3>
                <p className="text-[#D7E2EA]/60 text-sm max-w-sm">
                  Cảm ơn bạn đã liên hệ! Diệu Anh sẽ kết nối với bạn trong thời gian sớm nhất.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/60 block mb-2">
                    Họ và tên của bạn *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập họ và tên của bạn"
                    className="w-full bg-[#1A1A1A] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/60 block mb-2">
                    Email của bạn *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Nhập địa chỉ email của bạn"
                    className="w-full bg-[#1A1A1A] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/60 block mb-2">
                    Công ty / Tổ chức
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Tên công ty hoặc tổ chức của bạn"
                    className="w-full bg-[#1A1A1A] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/60 block mb-2">
                    Lý do liên hệ
                  </label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors cursor-pointer"
                  >
                    <option value="" disabled className="text-[#D7E2EA]/30">Chọn lý do</option>
                    <option value="Job Opportunity">Cơ hội nghề nghiệp</option>
                    <option value="Internship">Cơ hội thực tập</option>
                    <option value="Freelance / Project-based">Dự án tự do / Theo dự án</option>
                    <option value="Just Networking">Kết nối giao lưu</option>
                    <option value="Other">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/60 block mb-2">
                    Tin nhắn của bạn
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hãy chia sẻ về vị trí công việc, đội ngũ của bạn, hoặc bất kỳ nội dung nào bạn muốn thảo luận..."
                    className="w-full bg-[#1A1A1A] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white hover:bg-[#D7E2EA] text-[#0C0C0C] font-semibold uppercase tracking-wider py-4 rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl mt-2 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {isSubmitting ? 'ĐANG GỬI...' : 'GỬI TIN NHẮN'}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>

      {/* WeChat QR Code Modal */}
      {showWeChatModal && (
        <div 
          className="fixed inset-0 bg-[#0C0C0C]/90 backdrop-blur-md flex items-center justify-center z-50 p-4" 
          onClick={() => setShowWeChatModal(false)}
        >
          <div 
            className="bg-[#121212] border border-[#D7E2EA]/15 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 max-w-xs sm:max-w-sm w-full relative" 
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowWeChatModal(false)}
              className="absolute top-4 right-4 text-[#D7E2EA]/40 hover:text-white transition-colors p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center pt-2">
              <div className="bg-white p-3 rounded-2xl mb-4 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                {/* Replace the URL below with your real WeChat QR Code image once available */}
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=WeChat-DieuAnh"
                  alt="WeChat QR Code"
                  className="w-40 h-40 sm:w-48 sm:h-48 object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-wider">WECHAT</h4>
              <p className="text-[#D7E2EA]/60 text-xs sm:text-sm font-light">Quét mã để kết nối với tôi trên WeChat</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
