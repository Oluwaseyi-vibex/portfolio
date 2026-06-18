import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

import alagonImg from "../assets/alagon.png";
import DOIT from "../assets/doit.png";
import hoggImg from "../assets/hogg.png";
import Uatvote from "../assets/uatvote.png";
import ProjectsCard from "./projectsCard";
import Silly from "../assets/Silly.png"
import LeadGen from "../assets/leadgen.png"
import Mecha from "../assets/mecha.png"
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const projects = [

  {
    img: Mecha,
    projectTools: "Nodejs Prisma PostgreSQL",
    projectTitle: "Power as you go",
    projectDescrip: "Power as you go is an IoT-enabled electricity credit management backend for smart prepaid meters.",
    live: "Live <~>",
    link: "https://github.com/Oluwaseyi-vibex/mechanics-backend",
    caseStudyId: "power-as-you-go",
  },
  {
    img: LeadGen,
    projectTools: "LUA-AI NODEjs Prisma PostgreSQL",
    projectTitle: "Lead-Gen AI",
    projectDescrip: "This project is an AI agent that researches a target company, identifies likely business pain points, finds a decision-maker, and drafts personalized outreach.",
    live: "Demo <~>",
    link: "https://drive.google.com/file/d/1y7AG7UrCylIdqG3VTqoE9X4cbSeRopss/view?usp=sharing",
    caseStudyId: "lead-gen-ai",
  },
  {
    img: Uatvote,
    projectTools: "NEXT.JS NODEjs PostgreSQL",
    projectTitle: "UAT Vote",
    projectDescrip: "Digital Voting System",
    live: "Live <~>",
    link: "https://uatvote.vercel.app/",
    caseStudyId: "uat-vote",
  },
  {
    img: DOIT,
    projectTools: "NEXT.JS TYPESCRIPT TAILWIND",
    projectTitle: "DOIT",
    projectDescrip: "Task Management App",
    live: "Live <~>",
    link: "https://do-it-management.vercel.app/",
    caseStudyId: "doit",
  },
  {
    img: Silly,
    projectTools: "React Vite TAILWIND",
    projectTitle: "SillyAI",
    projectDescrip: "Personalized learning paths that adapt to your level and pace",
    live: "Live <~>",
    link: "https://silly-ai-frontend.vercel.app/",
    caseStudyId: "sillyai",
  },
  {
    img: hoggImg,
    projectTools: "NEXT.JS JSX TAILWIND",
    projectTitle: "Hogg Anderson",
    projectDescrip: "Hogg Anderson website",
    live: "Live <~>",
    link: "https://www.hogganderson.com.ng/",
    caseStudyId: "hogg-anderson",
  },
  {
    img: alagonImg,
    projectTools: "NEXTjs JSX TAILWIND",
    projectTitle: "Alagon Energy",
    projectDescrip: "Alagon Energy landing page",
    live: "Live <~>",
    link: "https://alagon-energy.vercel.app/",
    caseStudyId: "alagon-energy",
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
