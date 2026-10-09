import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

import ProjectsCard from "./projectsCard";
import Silly from "../assets/Silly.png"
import MyleImg from "../assets/myle.png"
import Mecha from "../assets/mecha.png"
import LensImg from "../assets/lens.png"
import PearImg from "../assets/arthub.png"
import GrabitImg from "../assets/grabit.png"
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const projects = [

  {
    img: LensImg,
    projectTools: "TypeScript Node.js PostgreSQL Redis BullMQ",
    projectTitle: "Lens — AI CFO for SMEs",
    projectDescrip: "AI-powered financial intelligence: open banking aggregation, cash-flow forecasting, and reports on web + WhatsApp.",
    live: "Live <~>",
    link: "https://heylens.orzn.app/",
    caseStudyId: "lens",
  },
  {
    img: MyleImg,
    projectTools: "TypeScript Node.js Prisma Redis BullMQ Python FastAPI",
    projectTitle: "Myle — AI Lead Gen & CRM",
    projectDescrip: "AI lead discovery, enrichment, scoring, and full CRM for companies, contacts, and timelines.",
    live: "Live <~>",
    link: "https://myleshq.vercel.app/",
    caseStudyId: "myle",
  },
  {
    img: PearImg,
    projectTools: "React Native Expo TypeScript JWT",
    projectTitle: "Pear | Creator-Brand Marketplace",
    projectDescrip: "Cross-platform mobile marketplace connecting creators with brands — discovery, swipes, matches, messaging.",
    live: "Case study <~>",
    link: "https://github.com/Oluwaseyi-vibex?tab=repositories",
    caseStudyId: "pear",
  },
  {
    img: GrabitImg,
    projectTools: "Next.js TypeScript Real-time Vercel",
    projectTitle: "Grabit — Social Multiplayer",
    projectDescrip: "Browser-based 2D social multiplayer platform with shared real-time environments.",
    live: "Live <~>",
    link: "https://grabit.lol",
    caseStudyId: "grabit",
  },
  {
    img: Mecha,
    projectTools: "Nodejs Prisma PostgreSQL",
    projectTitle: "Power as you go",
    projectDescrip: "IoT-enabled electricity credit management backend for smart prepaid meters — monitor credit, automate top-ups, receipts in one dashboard.",
    live: "Repo <~>",
    link: "https://github.com/Oluwaseyi-vibex/mechanics-backend",
    caseStudyId: "power-as-you-go",
  },
  {
    img: Silly,
    projectTools: "React Vite LUA-AI NODEjs PostgreSQL",
    projectTitle: "SillyAI",
    projectDescrip: "Personalized AI learning paths that adapt to your level and pace",
    live: "Live <~>",
    link: "https://silly-ai-frontend.vercel.app/",
    caseStudyId: "sillyai",
  },

];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const projectText = useRef<HTMLSpanElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(
        (card): card is HTMLDivElement => card !== null,
      );

      // Set initial hidden state for all cards
      gsap.set(cards, { y: 60, opacity: 0, scale: 0.92, rotateX: 6 });

      // Each card gets its own ScrollTrigger — fires independently on scroll
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.75,
          ease: "power3.out",
          delay: (i % 3) * 0.1, // subtle stagger within each row
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.to(projectText.current, {
        duration: 1,
        text: {
          value: "Projects",
          newClass: "class2",
        },
        scrollTrigger: {
          trigger: projectText.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} id="section2" className="px-4 flex flex-col mt-[100px]">
      <div className="flex md:flex-row flex-col w-full md:items-center gap-3 justify-center md:gap-[200px]">
        <div className="md:w-[701px] flex items-center gap-4">
          <h1 className="text-white text-[32px]">
            <span className="text-[#C778DD]">#</span>
            <span ref={projectText}></span>
          </h1>
          <div className="h-[1px] bg-[#C778DD] md:w-[701px]"></div>
        </div>
        <p className="text-white text-[16px] font-medium">
          <a href="https://github.com/Oluwaseyi-vibex?tab=repositories">
            View all {"~~>"}{" "}
          </a>
        </p>
      </div>

      <div
        className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 place-items-stretch place-content-center w-full md:px-[100px] gap-[16px]"
        style={{ perspective: "1000px" }}
      >
        {projects.map((project, index) => (
          <div
            key={project.projectTitle}
            className="h-full"
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
          >
            <ProjectsCard {...project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
