import Twitter from "../assets/twitter.png";
import Github from "../assets/Github.svg";
import Mail from "../assets/Email.svg";
import Logo from "../assets/Logo.svg";
import DownArrow from "../assets/Group 58.svg";
import HeroImg from "../assets/HeroImage.png";
import Dots from "../assets/Dots.svg";
import HeroStyle from "../assets/HeroStyle1.svg";
import Qoute from "../assets/quote.svg";
import Menu from "../assets/menu.png";

import { ScrollTrigger } from "gsap/all";
import Draggable from "gsap/Draggable";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger, Draggable);
gsap.registerPlugin(TextPlugin);

const Header = () => {
  const hanger = useRef<HTMLDivElement | null>(null);
  const hero_text = useRef<HTMLHeadingElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const class_two = useRef<HTMLImageElement | null>(null);
  const DotBox = useRef<HTMLImageElement | null>(null);
  const DotBoxBarrier = useRef<HTMLDivElement | null>(null);
  const text = useRef<HTMLParagraphElement | null>(null);
  // const text2 = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLLIElement[]>([]);

  const hangerAnime = () => {
    gsap.fromTo(
      hanger.current,
      {
        opacity: 0,
        y: 200,
      },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "elastic",
        scrollTrigger: {
          trigger: container.current,
          toggleActions: "restart",
        },
      }
    );
  };

  const hero_textAnime = () => {
    gsap.fromTo(
      hero_text.current,
      {
        opacity: 0,
        x: -200,
      },
      {
        x: 0,
        duration: 1,
        opacity: 1,
        ease: "",
        scrollTrigger: {
          trigger: container.current,
          toggleActions: "restart pause resume",
        },
      }
    );
  };

  const move = () => {
    gsap.fromTo(
      class_two.current,
      { opacity: 1, x: 0 },
      {
        opacity: 1,
        x: 350,
        duration: 4,
        rotation: -360,
        ease: "bounce.out",
        delay: 1,
        repeat: -1,
        yoyo: true,
      }
    );
  };

  const drag = () => {
    Draggable.create(DotBox.current, {
      type: "rotation",
      inertia: true,
    });
  };

  const HeroPScrambled = () => {
    gsap.to(text.current, {
      duration: 4,
      text: {
        value:
          "I wield a versatile arsenal of technologies to breathe life into designs and elevate user interactions.",
        newClass: "class2",
      },
    });
  };

  const smoothScroll = () => {
    document.querySelectorAll("nav button").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: "#section" + (index + 1), offsetY: 70 },
        });
      });
    });
  };

  useEffect(() => {
    hangerAnime();
    hero_textAnime();
    HeroPScrambled();
    move();
    drag();
    smoothScroll();
  }, []);

  useEffect(() => {
    const handleClick = (index: number) => {
      const section = document.querySelector(`#section${index + 1}`);
      if (section) {
        gsap.to(window, { duration: 1, scrollTo: { y: section, offsetY: 70 } });
      }
    };

    buttonsRef.current.forEach((button, index) => {
      button.addEventListener("click", () => handleClick(index));
    });

    return () => {
      buttonsRef.current.forEach((button, index) => {
        button.removeEventListener("click", () => handleClick(index));
      });
    };
  }, []);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Array of quotes and their authors
  const quotes = [
    {
      quote: "In the middle of difficulty lies opportunity.",
      author: "Albert Einstein",
    },
    {
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      quote: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      quote: "It always seems impossible until it's done.",
      author: "Nelson Mandela",
    },
    {
      quote: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
    },
    // Add more quotes as needed
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000);

    return () => clearInterval(intervalId); // Cleanup function
  }, [quotes.length]);

  const [isToggle, setIsToggle] = useState(false);

  const toggleMenu = () => {
    setIsToggle(!isToggle);
  };

  return (
    <>
      <div ref={container} id="section1" className="flex justify-between">
        <div
          ref={hanger}
          className=" hidden md:flex gap-[8px] fixed z-50 px-3 top-0 w-fit items-center flex-col  "
        >
          <div className="h-[191px] relative z-50 w-[1px] bg-[#ABB2BF] "></div>
          <div className="flex flex-col items-center gap-[8px]">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Oluwaseyi-vibex"
            >
              <img src={Github} alt="Github" />
            </a>
            <img src={Twitter} alt="Twitter" className="w-[23px] " />
            <a href="mailto:oluseyiwmwm@gmail.com">
              <img src={Mail} alt="mail" />
            </a>
          </div>
        </div>

        <div className="flex  flex-col md:items-center w-full justify-around ">
          <nav className="flex fixed top-0 px-4 bg-[#282C33] z-40 w-full md:h-fit py-6 md:px-0 md:py-[32px] md:gap-[150px] justify-between md:justify-around ">
            <div className="flex gap-[8px]">
              <img src={Logo} alt="Logo" />
              <h1 className="relative z-40 text-white text-[16px] font-bold leading-normal tracking-wide">
                OluwaSeyi
              </h1>
            </div>

            <img
              onClick={toggleMenu}
              src={Menu}
              alt="menu"
              className="md:hidden relative flex cursor-pointer"
            />

            <ul className="md:flex  hidden gap-[32px] align-start">
              <li
                ref={(el) => (buttonsRef.current[0] = el!)}
                id="section1"
                className="flex cursor-pointer"
              >
                <span className="text-[#C778DD] text-[16px]">#</span>{" "}
                <p className="text-white text-[16px]">home</p>
              </li>

              <li
                ref={(el) => (buttonsRef.current[1] = el!)}
                className="flex cursor-pointer"
              >
                <span className="text-[#C778DD] text-[16px]">#</span>{" "}
                <p className="text-white text-[16px]">work</p>
              </li>

              <li
                ref={(el) => (buttonsRef.current[2] = el!)}
                className="flex cursor-pointer"
              >
                <span className="text-[#C778DD] text-[16px]">#</span>
                <p className="text-white text-[16px]">about-me</p>
              </li>
              <li
                ref={(el) => (buttonsRef.current[3] = el!)}
                className="flex cursor-pointer"
              >
                <span className="text-[#C778DD] text-[16px]">#</span>
                <p className="text-white text-[16px]">contact</p>
              </li>
              <li className="flex gap-[4px]">
                <span className="text-white text-[16px]">EN</span>
                <img src={DownArrow} alt="DownArrow" className="w-3" />
              </li>
            </ul>
          </nav>
          {isToggle && (
            <ul className="md:hidden z-40 py-8 px-4 top-[72px] h-full flex flex-col gap-[32px] fixed w-full bg-[#282C33]">
              <a href="#section1">
                <li
                  onClick={toggleMenu}
                  id="section1"
                  className="flex w-fit cursor-pointer"
                >
                  <span className="text-[#C778DD] text-[32px]">#</span>{" "}
                  <p className="text-white text-[32px]">home</p>
                </li>
              </a>

              <a href="#section2">
                <li onClick={toggleMenu} className="flex w-fit cursor-pointer">
                  <span className="text-[#C778DD] text-[32px]">#</span>{" "}
                  <p className="text-white text-[32px]">work</p>
                </li>
              </a>

              <a href="#section3">
                <li onClick={toggleMenu} className="flex w-fit cursor-pointer">
                  <span className="text-[#C778DD] text-[32px]">#</span>
                  <p className="text-white text-[32px]">about-me</p>
                </li>
              </a>

              <a href="#section4">
                <li onClick={toggleMenu} className="flex w-fit cursor-pointer">
                  <span className="text-[#C778DD] text-[32px]">#</span>
                  <p className="text-white text-[32px]">contact</p>
                </li>
              </a>

              <li className="flex  gap-[4px] w-fit">
                <span className="text-white text-[32px]">EN</span>
                <img src={DownArrow} alt="DownArrow" className="w-3" />
              </li>

              <li className="flex w-full h-fit gap-2 items-center justify-center">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/Oluwaseyi-vibex"
                >
                  {" "}
                  <img src={Github} alt="" width={64} height={64} />
                </a>
                <a href="mailto: oluseyiwmwm@gmail.com">
                  {" "}
                  <img src={Mail} alt="" width={64} height={64} />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://x.com/oluwaseyi_dev?t=abEPDOcFYUVjcGs2Zq8Nfw&s=09"
                >
                  {" "}
                  <img src={Twitter} alt="" width={48} height={48} />
                </a>
              </li>
            </ul>
          )}

          <div className="flex relative px-4 top-[60px] md:top-[90px] md:flex-row flex-col items-start w-full h-fit py-8 md:py-[32px]  md:px-0 gap-8 md:gap-10 justify-center">
            <div className="relative z-10  md:top-[117px] ">
              <h1
                ref={hero_text}
                className="text-white text-[30px] md:text-[32px] font-semibold leading-normal"
              >
                {`<h1>Meet Seyi</h1>`} <br />
                <span className="text-[#C778DD]">
                  Front-End <br className="md:hidden flex" /> Developer
                </span>{" "}
              </h1>
              <p
                ref={text}
                className="text-[#ABB2BF] text-[16px] font-normal md:w-[500px] leading-[25px] py-[30px] "
              ></p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://wa.me/message/EOGGOVOH5LACP1"
                className="px-[16px] py-[8px] border-solid border-[1px] border-[#C778DD] text-white hover:bg-[#C778DD]/20  "
              >
                <button>Contact me!!</button>
              </a>
            </div>

            <div ref={DotBoxBarrier} className="md:h-[500px]">
              <img
                className="relative w-[90%] md:w-[100%]  z-10 "
                src={HeroImg}
                alt="HeroImg"
              />
              <div className="flex items-center gap-2 relative md:left-[20px] md:w-[402px] p-[8px] border-solid border-[1px] border-white ">
                <div className="w-[16px] h-[16px] bg-[#C778DD] "></div>
                {/* <p className="text-[#ABB2BF] ">
                  Currently working on{" "}
                  <span className="text-white">Portfolio</span>
                </p> */}
              </div>
              <img
                ref={class_two}
                className="relative w-[30%] bottom-[260px] md:bottom-[300px] right-2 md:right-[15px] z-0"
                src={HeroStyle}
                alt="ZigZagImg"
              />
              <img
                ref={DotBox}
                className="relative md:bottom-[300px] md:left-[350px] bottom-[250px] left-[230px] w-[20%] z-20"
                src={Dots}
                alt="Dots Box"
              />
            </div>
          </div>

          <div className="flex px-4 justify-center w-full  ovrflow-hidden items-center ">
            <div className="flex flex-col md:pt-5 items-end">
              <div className="border-solid w-fit p-[32px] border-white border-[1px] ">
                <img
                  className="relative py-[4px] px-[6px] bg-[#282C33] bottom-12"
                  src={Qoute}
                  alt="QouteIcon"
                />
                <p className="text-[24px] text-white font-medium ">
                  {quotes[currentQuoteIndex].quote}
                </p>
                <img
                  className="relative top-11  py-[4px] px-[6px] bg-[#282C33] left-[620px]"
                  src={Qoute}
                  alt="QouteIcon"
                />
              </div>
              <div className="border-solid w-fit text-[24px] text-white p-[16px] flex justify-end  border-white border-[1px]">
                - {quotes[currentQuoteIndex].author}
              </div>
            </div>

            <div className="w-[91px] h-[91px] border-solid border-white border-[1px] relative bottom-10 left-[340px]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
