import ProjectsCard from "./projectsCard";
import alagonImg from "../assets/alagon.png";
import uatJournalImg from "../assets/uat.png";
import hoggImg from "../assets/hogg.png";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const box1 = useRef<HTMLDivElement | null>(null);
  const box2 = useRef<HTMLDivElement | null>(null);
  const box3 = useRef<HTMLDivElement | null>(null);
  const projectText = useRef<HTMLSpanElement | null>(null);

  const triggerBox1 = () => {
    gsap.fromTo(
      box1.current,
      { y: 200, opacity: 0 },
      {
        y: 0,
        duration: 1,
        delay: 0.3,
        opacity: 1,
        yoyo: true,
        scrollTrigger: {
          trigger: box1.current,
          // toggleActions: "restart pause resume",
        },
      }
    );
  };

  const triggerBox2 = () => {
    gsap.fromTo(
      box2.current,
      { y: 200, opacity: 0 },
      {
        y: 0,
        duration: 1,
        delay: 0.6,
        opacity: 1,
        yoyo: true,
        scrollTrigger: {
          trigger: box2.current,
          // toggleActions: "restart pause resume",
        },
      }
    );
  };

  const triggerBox3 = () => {
    gsap.fromTo(
      box3.current,
      { y: 200, opacity: 0 },
      {
        y: 0,
        duration: 1,
        delay: 0.9,
        opacity: 1,
        yoyo: true,
        scrollTrigger: {
          trigger: box3.current,
          // toggleActions: "restart pause resume",
        },
      }
    );
  };

  const projectTextAnime = () => {
    gsap.to(projectText.current, {
      duration: 1,
      delay: 3,
      text: {
        value: "Projects",
        newClass: "class2",
      },
      scrollTrigger: {
        trigger: projectText.current,
        // toggleActions: "restart pause resume",
      },
    });
  };

  useEffect(() => {
    triggerBox1();
    triggerBox2();
    triggerBox3();
    projectTextAnime();
  }, []);

  return (
    <div id="section2" className=" px-4 flex flex-col mt-[100px]">
      <div className="flex md:flex-row flex-col w-full md:items-center gap-3 justify-center md:gap-[200px]">
        <div className="md:w-[701px] flex items-center gap-4 ">
          <h1 className="text-white text-[32px] ">
            <span className="text-[#C778DD]">#</span>
            <span ref={projectText}></span>
          </h1>
          <div className="h-[1px] bg-[#C778DD] md:w-[701px]"></div>
        </div>
        <p className="text-white text-[16px] font-medium ">
          <a href="https://github.com/Oluwaseyi-vibex?tab=repositories">
            View all {"~~>"}{" "}
          </a>
        </p>
      </div>

      <div className="flex md:flex-row flex-col w-full items-center justify-center gap-[16px]">
        <div ref={box1}>
          <ProjectsCard
            img={uatJournalImg}
            projectTools="NEXT.JS TYPESCRIPT TAILWIND"
            projectTitle="DOIT"
            projectDescrip="UAT journal for lecturers"
            live="Live <~>"
            link="https://github.com/Oluwaseyi-vibex/UAT-JOURNAL-WEBSITE"
          />
        </div>

        <div ref={box2}>
          <ProjectsCard
            img={hoggImg}
            projectTools="NEXT.JS JSX TAILWIND"
            projectTitle="Hogg Anderson"
            projectDescrip="Hogg Anderson website"
            live="Live <~>"
            link="https://www.hogganderson.com.ng/"
          />
        </div>
        <div ref={box3}>
          <ProjectsCard
            img={alagonImg}
            projectTools="NEXTjs JSX TAILWIND"
            projectTitle="Alagon Energy"
            projectDescrip="Alagon Energy landing page"
            live="Live <~>"
            link="https://arthubsite.vercel.app/"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
