import React from "react";
import FadeIn from "./FadeIn";

const services = [
  {
    num: "01",
    name: "Lập kế hoạch Sự kiện",
    desc: "Điều phối hậu cần sự kiện, quản lý nhà cung cấp và ngân sách, cùng hoạt động vận hành tại chỗ từ ý tưởng đến bàn giao.",
  },
  {
    num: "02",
    name: "Tiếp thị Sự kiện",
    desc: "Các chiến dịch tiếp thị tích hợp, quảng bá trên mạng xã hội và chiến lược gắn kết khán giả giúp tối đa hóa mức độ hiển thị của sự kiện trước, trong và sau mỗi trải nghiệm.",
  },
  {
    num: "03",
    name: "Dẫn chương trình Song ngữ (MC)",
    desc: "Dẫn chương trình chuyên nghiệp và phiên dịch Anh - Việt cho các hội nghị, diễn đàn và sự kiện kinh doanh đa văn hóa.",
  },
  {
    num: "04",
    name: "Quản lý Dự án",
    desc: "Quản lý tiến độ hiệu quả, điều phối nhà cung cấp, lập ngân sách và vận hành tại chỗ để sự kiện diễn ra suôn sẻ, đúng hạn và đúng phạm vi.",
  },
  {
    num: "05",
    name: "Thiết kế Sáng tạo",
    desc: "Thiết kế bài thuyết trình, bộ nhận diện sự kiện và sản xuất video ngắn bằng CapCut, Canva cùng các công cụ sáng tạo hỗ trợ bởi AI.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="skills"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 sm:mb-20 md:mb-28">
          <FadeIn delay={0} y={40}>
            <h2
              className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight inline-block"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              Kỹ năng
            </h2>
          </FadeIn>
        </div>

        {/* Services List */}
        <div className="flex flex-col">
          {services.map((item, i) => (
            <FadeIn
              key={i}
              delay={i * 0.1}
              y={30}
              className={`flex flex-col md:flex-row md:items-center py-8 sm:py-10 md:py-12 gap-6 md:gap-12 border-[#0C0C0C]/15 ${
                i > 0 ? "border-t" : ""
              }`}
            >
              {/* Number Left */}
              <div
                className="font-black text-[#0C0C0C] tracking-tight leading-none min-w-[120px] md:min-w-[180px] shrink-0"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {item.num}
              </div>

              {/* Name & Description Right */}
              <div className="flex flex-col gap-2 md:gap-4 flex-1">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1.2rem, 2.2vw, 2.1rem)" }}
                >
                  {item.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/70"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
