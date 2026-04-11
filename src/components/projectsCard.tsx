import React from "react";

interface ProjectsCardProps {
  img: string;
  alt?: string;
  projectTools: string;
  projectTitle: string;
  projectDescrip: string;
  live: string;
  link: string;
}

const ProjectsCard: React.FC<ProjectsCardProps> = (props) => {
  return (
    <div className="w-[320px] h-full border-solid border-[#ABB2BF] border-[1px] mt-9 flex flex-col">
      <img
        src={props.img}
        height={400}
        width={400}
        className="h-[190px] w-full "
        alt={props.alt}
      />
      <p className="p-[8px] text-[#ABB2BF] border-solid border-[#ABB2BF] border-[1px] ">
        {props.projectTools}
      </p>
      <div className="p-3 flex flex-1 flex-col">
        <h1 className="text-[24px] uppercase font-medium text-white">
          {props.projectTitle}
        </h1>
        <p className="text-[#ABB2BF] text-[16px] mt-4 flex-1">
          {props.projectDescrip}
        </p>
        <a target="_blank" href={`${props.link}`} className="mt-3">
          <button className="mt-3 border-solid border-[#C778DD] border-[1px] text-white p-3 hover:bg-[#C778DD]/20 ">
            {props.live}
          </button>
        </a>
      </div>
    </div>
  );
};

export default ProjectsCard;
