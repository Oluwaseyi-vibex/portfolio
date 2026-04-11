import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

import alagonImg from "../assets/alagon.png";
import DOIT from "../assets/doit.png";
import hoggImg from "../assets/hogg.png";
import Uatvote from "../assets/uatvote.png";
import ProjectsCard from "./projectsCard";
import ELI5 from "../assets/ELI5.png"
import Mecha from "../assets/mecha.png"
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const projects = [
  {
    img: DOIT,
    projectTools: "NEXT.JS TYPESCRIPT TAILWIND",
    projectTitle: "DOIT",
    projectDescrip: "Task Management App",
    live: "Live <~>",
    link: "https://do-it-management.vercel.app/",
  },
  {
    img: ELI5,
    projectTools: "React Vite TAILWIND",
    projectTitle: "ELI5",
    projectDescrip: "AI summaries and sentiment for the latest crypto and finances stories",
    live: "Live <~>",
    link: "https://eli-5-six.vercel.app/",

  },
  {
    img: Mecha,
    projectTools: "Nodejs Expressjs Prisma ",
    projectTitle: "Power as you go",
    projectDescrip: "Power as you go is an IoT-enabled electricity credit management backend for smart prepaid meters.",
    live: "Live <~>",
    link: "https://github.com/Oluwaseyi-vibex/mechanics-backend",
  },
  {
    img: Uatvote,
    projectTools: "NEXT.JS JSX NODEjs PostgreSQL",
    projectTitle: "UAT Vote",
    projectDescrip: "Digital Voting System",
    live: "Live <~>",
    link: "https://uatvote.vercel.app/",
  },
  {
    img: hoggImg,
    projectTools: "NEXT.JS JSX TAILWIND",
    projectTitle: "Hogg Anderson",
    projectDescrip: "Hogg Anderson website",
    live: "Live <~>",
    link: "https://www.hogganderson.com.ng/",
  },
  {
    img: alagonImg,
    projectTools: "NEXTjs JSX TAILWIND",
    projectTitle: "Alagon Energy",
    projectDescrip: "Alagon Energy landing page",
    live: "Live <~>",
    link: "https://alagon-energy.vercel.app/",
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

      gsap.fromTo(
        cards,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

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

      <div className="grid md:grid-cols-3 grid-cols-1 place-items-stretch place-content-center w-full md:px-[100px] gap-[16px]">
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
