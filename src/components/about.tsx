import React, { useRef, useEffect } from "react";
import MyPicture from "../assets/myPic3.jpeg";
import AboutSideDot from "../assets/AboutSideDot.png";
import AboutComponents from "./AboutComponents";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const Container1 = useRef<HTMLDivElement | null>(null);
  const Container2 = useRef<HTMLDivElement | null>(null);
  const box1 = useRef<HTMLDivElement | null>(null);

  const aboutAnime = () => {
    gsap.fromTo(
      Container1.current,
      {
        opacity: 0,
        x: -300,
      },
      {
        opacity: 1,
        x: 0,
        duration: 2,
        scrollTrigger: {
          trigger: Container1.current,
        },
      }
    );

    gsap.fromTo(
      Container2.current,
      {
        opacity: 0,
        x: 300,
      },
      {
        opacity: 1,
        x: 0,
        duration: 2,
        scrollTrigger: {
          trigger: Container2.current,
        },
      }
    );
  };

  const boxAnime = () => {
    gsap.fromTo(box1.current, { x: 100, opacity: 0 }, { x: 10, opacity: 1 });
  };

  useEffect(() => {
    aboutAnime();
    boxAnime();
  }, []);

  return (
    <div id="section3" className="w-full px-4 flex flex-col items-center">
      <div className="flex w-full items-center justify-center mt-24 gap-[200px]">
        <div className="w-full md:w-[72%] flex items-center gap-4">
          <h1 className="text-white text-[32px]">
            <span className="text-[#C778DD]">#</span>
            About
          </h1>
          <div className="h-[1px] bg-[#C778DD] w-[239px]"></div>
        </div>
      </div>
      <div className="flex w-full md:flex-row flex-col md:w-[72%] justify-between gap-2 md:gap-8">
        <div ref={Container1} className="flex justify-between">
          <div className="md:w-[500px] text-[#ABB2BF] flex flex-col gap-8">
            <p>
              Welcome to my corner of the web! I'm{" "}
              <span className="font-bold text-white">
                {" "}
                Kodeleyiri Oluwaseyifunmi Ezekiel
              </span>
              , a Computer Science graduate (University of Africa, Toru-Orua)
              and software engineer with over five years of experience building
              scalable applications across web and mobile platforms using
              Next.js, React, React Native, JavaScript, TypeScript, Node.js,
              and PostgreSQL. I work across frontend, backend, and data systems
              — clean architecture, efficient data flow, and responsive user
              experiences that hold up under real-world usage. <br /> I'm
              experienced working with teams, analyzing data, and delivering
              reliable solutions in fast-paced environments. I'm passionate
              about leveraging technology and analytical thinking to improve
              operational efficiency and customer experience within the banking
              and financial sector. I've shipped production systems people
              actually use — including an AI CFO for SMEs (Lens), an AI lead-gen
              & CRM platform (Myle), and a meter-credit monitoring dashboard MVP
              for SMEs and individuals.
            </p>
            <div className="collapse rounded-none">
              <input type="checkbox" className="peer" />
              <button className="text-center md:w-[248px] h-[37px] collapse-title border-solid border-[1px] border-[#C778DD] text-white hover:bg-[#C778DD]/20">
                {`  Read more ->`}
              </button>
              <div className="collapse-content overflow-scroll md:h-[416px] overflow-x-hidden mt-10 bg-primary text-primary-content peer-checked:bg-[#C778DD] peer-checked:text-secondary-content">
                <div className="flex flex-col gap-8 mt-8">
                  <AboutComponents
                    Title="What Do I Do?"
                    Paragraph="As a full-stack engineer, I build interactive web and mobile products plus the backends and data pipelines behind them — React, Next.js, React Native/Expo on the front, Node.js, PostgreSQL, Prisma, Redis, BullMQ and Python/FastAPI on the back. I also do data analysis, validation, and Excel-based reporting that feeds business decisions."
                  />
                  <AboutComponents
                    Title="Where I've Worked"
                    Paragraph="Frontend Developer Intern at Maziv Technologies (React, Next.js, Tailwind, GSAP, DaisyUI — performance, reusable components, accessibility, SEO). Software Developer Intern at SkyeStudio (PWA with background push notifications, DB schema, APIs, service workers). Frontend Developer Intern at Bejite (RESTful APIs with Axios, frontend-backend integration). Data Analyst Intern at JSG Industries (cleaned large datasets, validation, weekly/monthly Excel reports). Certified Nomba Developer."
                  />
                  <AboutComponents
                    Title="Why Choose Me?"
                    Paragraph="With a keen eye for detail and a commitment to excellence, I
                    take pride in delivering high-quality solutions that exceed
                    client expectations. Whether it's designing a sleek user
                    interface, optimizing website performance, or troubleshooting
                    intricate bugs, I approach every project with dedication and a
                    drive for perfection."
                  />
                  <AboutComponents
                    Title="Let's Collaborate!"
                    Paragraph="Whether you're a startup looking to establish your online
                    presence or a business seeking to revamp your existing
                    website, I'm here to help you bring your vision to fruition.
                    Let's work together to create engaging, memorable, and
                    impactful web experiences that resonate with your audience and
                    drive tangible results."
                  />
                  <AboutComponents
                    Title="Get in Touch"
                    Paragraph="Ready to take your web presence to the next level? Let's
                    connect and explore how we can turn your ideas into reality.
                    Feel free to reach out to me via email at or through the
                    contact form on this website. I look forward to collaborating
                    with you and embarking on an exciting journey of innovation
                    and creativity!"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={Container2}>
          <img
            className="relative md:bottom-8"
            src={MyPicture}
            alt="My Picture"
          />
          <img
            className="relative md:left-[665px] top-4 md:bottom-[350px]"
            src={AboutSideDot}
            alt="Side Decoration"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
