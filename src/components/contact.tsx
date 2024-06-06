import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Discord from "../assets/Discord.svg";
import Email from "../assets/Email.svg";

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const title = useRef<HTMLDivElement>(null);
  const paragraph = useRef<HTMLDivElement>(null);
  const contactBox = useRef<HTMLDivElement>(null);

  const titleAnime = () => {
    gsap.fromTo(
      title.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        scrollTrigger: {
          trigger: title.current,
          toggleActions: "restart pause resume",
        },
      }
    );
  };

  const pAnime = () => {
    gsap.fromTo(
      paragraph.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: paragraph.current,
          toggleActions: "restart pause resume",
        },
      }
    );
  };

  const contactBoxAnime = () => {
    gsap.fromTo(
      contactBox.current,
      { opacity: 0, x: 300, y: -400 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 2,
        scrollTrigger: {
          trigger: contactBox.current,
          toggleActions: "restart resume",
        },
      }
    );
  };

  useEffect(() => {
    titleAnime();
    pAnime();
    contactBoxAnime();
  }, []);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center mt-24 gap-[200px]">
        <div ref={title} className="w-[68%] flex items-center gap-4 ">
          <h1 className="text-white text-[32px] ">
            <span className="text-[#C778DD]">#</span>
            Contact
          </h1>
          <div className="h-[1px] bg-[#C778DD] w-[239px]"></div>
        </div>
      </div>
      <div className="flex w-full mt-5 items-start gap-[250px] justify-center">
        <div ref={paragraph}>
          <p className="text-[#ABB2BF] w-[500px]">
            I’m interested in freelance opportunities. However, if you have
            another request or question, don’t hesitate to contact me.
          </p>
        </div>
        <div
          ref={contactBox}
          className="flex flex-col gap-3 w-fit p-4 h-[141px] border border-[#ABB2BF]"
        >
          <h2 className="text-white font-semibold">Message me here</h2>
          <div className="flex gap-3">
            <img src={Discord} alt="Discord" width={25} height={20} />
            <p className="text-[#ABB2BF]">seyi.vibe</p>
          </div>
          <div className="flex gap-3">
            <img src={Email} alt="Email" width={25} height={20} />
            <p className="text-[#ABB2BF]">oluseyiwmwm@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
