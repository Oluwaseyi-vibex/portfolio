import React from "react";

type Experience = {
  company: string;
  meta: string;
  role: string;
  period: string;
  points: string[];
};

const experiences: Experience[] = [
  {
    company: "Maziv Technologies Limited",
    meta: "Fully remote tech firm — tailored digital solutions",
    role: "Frontend Developer • Internship",
    period: "05/2024 – 11/2024",
    points: [
      "Built responsive web interfaces with React, Next.js, JavaScript, Tailwind CSS, GSAP, and DaisyUI.",
      "Optimized performance for load times and cross-browser / cross-device compatibility.",
      "Implemented reusable UI components and consistent design systems; Git/GitHub branching and code reviews.",
      "Improved accessibility and SEO with modern frontend best practices.",
    ],
  },
  {
    company: "SkyeStudio",
    meta: "Remote",
    role: "Software Developer • Internship",
    period: "11/2025 – 02/2026",
    points: [
      "Architected a PWA with background push notification support.",
      "Designed the push-notification database schema and implemented the APIs.",
      "Handled service worker lifecycle and background notification triggers; restructured UI.",
    ],
  },
  {
    company: "Bejite",
    meta: "World's smartest job site",
    role: "Frontend Developer • Internship",
    period: "Internship",
    points: [
      "Integrated RESTful APIs with Axios — secure request flows and client-side response handling.",
      "Collaborated across frontend/backend to troubleshoot integration and optimize performance.",
      "Documented API processes for scalability and streamlined development.",
    ],
  },
  {
    company: "JSG Industries",
    meta: "Lagos, Nigeria — manufacturing & distribution (est. 2005)",
    role: "Data Analyst • Internship",
    period: "11/2025 – 02/2026",
    points: [
      "Collected, cleaned, and analyzed large datasets in Microsoft Excel to surface trends for business decisions.",
      "Performed data validation — detecting and correcting inconsistencies.",
      "Generated weekly/monthly performance reports; partnered on data requirements and actionable insights.",
    ],
  },
];

const Experience: React.FC = () => {
  return (
    <div id="experience" className="w-full px-4 flex flex-col items-center">
      <div className="flex w-full items-center justify-center mt-24">
        <div className="w-full md:w-[72%] flex items-center gap-4">
          <h1 className="text-white text-[32px]">
            <span className="text-[#C778DD]">#</span>
            Experience
          </h1>
          <div className="h-[1px] bg-[#C778DD] w-full md:w-[239px]"></div>
        </div>
      </div>
      <div className="w-full md:w-[72%] mt-8 flex flex-col gap-4">
        {experiences.map((exp) => (
          <div
            key={`${exp.company}-${exp.role}`}
            className="border border-[#ABB2BF]/40 p-5 md:p-6"
          >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
              <h2 className="text-white text-[20px] font-semibold">
                {exp.company}
              </h2>
              <span className="text-[#C778DD] text-[14px]">{exp.period}</span>
            </div>
            <p className="text-[#ABB2BF] text-[14px] mt-1">{exp.meta}</p>
            <p className="text-white text-[15px] mt-2 font-medium">{exp.role}</p>
            <ul className="list-disc ml-5 mt-3 flex flex-col gap-2 text-[#ABB2BF] text-[15px] leading-relaxed">
              {exp.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="border border-dashed border-[#ABB2BF]/40 p-5 text-[#ABB2BF] text-[15px] leading-relaxed">
          <p className="text-white font-medium">
            Education & Certification
          </p>
          <p className="mt-2">
            B.Sc Computer Science, University of Africa, Toru-Orua (01/2021 –
            09/2025) — Director of Socials (NACOS). Certified Nomba Developer
            (Nomba).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
