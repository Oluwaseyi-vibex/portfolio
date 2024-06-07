import React from "react";
import Logo from "../assets/Logo.svg";
import Github from "../assets/Github.svg";
import Whatsapp from "../assets/Whatsapp.png";
import Twitter from "../assets/twitter.png";

const Footer: React.FC = () => {
  return (
    <div
      id="section4"
      className="w-full px-4 py-2 h-full md:h-[208px] border-t-[1px] mt-[150px] flex flex-col md:items-center gap-14"
    >
      <div className="flex md:flex-row flex-col items-start gap-10 md:items-center justify-center md:mt-5 md:gap-[560px]">
        <div className="flex flex-col gap-4">
          <div className="flex md:flex-row flex-col gap-1 md:gap-6">
            <div className="flex gap-[8px]">
              <img src={Logo} alt="Logo" />
              <h1 className="relative z-30 text-white text-[16px] font-bold leading-normal tracking-wide">
                OluwaSeyi
              </h1>
            </div>
            <p className="text-[#ABB2BF] text-[18px]">oluseyiwmwm@gmail.com</p>
          </div>
          <p className="text-white text-[18px]">Front-End Developer</p>
        </div>

        <div className="gap-4 flex flex-col">
          <h1 className="text-[24px] text-white font-bold">Media</h1>
          <div className="flex w-full items-center gap-4">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Oluwaseyi-vibex"
            >
              <img src={Github} alt="Github" width={45} height={45} />
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://wa.me/message/EOGGOVOH5LACP1"
            >
              <img src={Whatsapp} alt="whatsapp" width={32} height={32} />
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://x.com/oluwaseyi_dev?t=abEPDOcFYUVjcGs2Zq8Nfw&s=09"
            >
              <img src={Twitter} alt="twitter" width={35} height={35} />
            </a>
          </div>
        </div>
      </div>
      <p className="text-[#ABB2BF]">© Copyright 2022. Made by Me.</p>
    </div>
  );
};

export default Footer;
