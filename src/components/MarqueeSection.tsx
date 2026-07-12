import React, { useEffect, useRef } from "react";

const row1Images = [
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783858433/z8032680008375_f758ff8b4245886db295abf4490a5fa2_jzz36w.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783858432/z8032679949650_ccc7f5bad7a55ce41e7a341300ea6098_cvfq4l.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783858472/IMG_5272_libiws.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783858472/BN_BUVVist-17_vctstt.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783858431/z8032679847760_a00f486f2c10f154aa12d4b1dcb29270_viz3ki.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783858432/z8032679909276_73acfd9b53b0417722e55521ed545667_jofkg2.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783860029/733538935_28353382467582022_843886042726571926_n_goy6fx.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783860160/z7884577649362_0408d376f937ec6b396835c6d1ba3819_udlbbs.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783860625/LV_00147_u14jvi.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783860079/LV_09980_lxzwhp.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783860347/acfbc45a2e31d6c8d77c66db13a5e0b2_e1zof1.jpg",
];

const row2Images = [
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783861532/z7884741547960_7004793bb4927ed06539fed12426a851_aqwk1d.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783865003/470086901_122144613992351566_7083044542396535314_n_cuzlhc.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783865004/466422823_122139357902351566_8035130252313623803_n_smzwmv.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783865004/470199645_122144614448351566_6113822371285233931_n_m0oygw.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783863677/481510967_657589066714838_6807767439491515099_n_bz6obu.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783863676/470539784_122132490116481804_4255196504950984253_n_cju7ni.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783863676/466084037_18334806706199339_7011342192525062544_n_vnnpmo.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783865560/659139270_122118212349206538_1226800282961604144_n_xzchp9.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783865556/666487856_122118637791206538_9008970220576246760_n_xnhpad.jpg",
  "https://res.cloudinary.com/g1xdn507/image/upload/v1783865558/668430935_122118975945206538_7631766201847916640_n_icxlco.jpg",
];

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sectionTop = 0;

    const updateSectionTop = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        sectionTop = rect.top + window.scrollY;
      }
    };

    updateSectionTop();
    window.addEventListener("resize", updateSectionTop);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const offset = (scrollY - sectionTop + windowHeight) * 0.3;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${offset - 200}px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${-(offset - 200)}px)`;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateSectionTop);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const row1Items = [...row1Images, ...row1Images, ...row1Images];
  const row2Items = [...row2Images, ...row2Images, ...row2Images];

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-3 md:gap-4">
        {/* Row 1: moves to right */}
        <div className="w-full overflow-hidden">
          <div
            ref={row1Ref}
            className="flex gap-3"
            style={{ willChange: "transform", width: "max-content" }}
          >
            {row1Items.map((src, i) => (
              <img
                key={`r1-${i}`}
                src={src}
                alt={`Event showcase visual ${i}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-[220px] h-[140px] sm:w-[280px] sm:h-[180px] md:w-[320px] md:h-[210px] rounded-2xl object-cover shrink-0 select-none pointer-events-none"
              />
            ))}
          </div>
        </div>

        {/* Row 2: moves to left */}
        <div className="w-full overflow-hidden">
          <div
            ref={row2Ref}
            className="flex gap-3"
            style={{ willChange: "transform", width: "max-content" }}
          >
            {row2Items.map((src, i) => (
              <img
                key={`r2-${i}`}
                src={src}
                alt={`Event showcase clip ${i}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-[220px] h-[140px] sm:w-[280px] sm:h-[180px] md:w-[320px] md:h-[210px] rounded-2xl object-cover shrink-0 select-none pointer-events-none"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
