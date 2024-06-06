import React from "react";

interface SkillsComponentProps {
  Title: string;
  Descrip: string;
}

const SkillsComponent: React.FC<SkillsComponentProps> = ({
  Title,
  Descrip,
}) => {
  return (
    <div className="md:w-[178px] h-fit border border-[#ABB2BF]">
      <h2 className="border border-[#ABB2BF] p-1 text-white font-semibold">
        {Title}
      </h2>
      <p className="text-[#ABB2BF] p-1">{Descrip}</p>
    </div>
  );
};

export default SkillsComponent;
