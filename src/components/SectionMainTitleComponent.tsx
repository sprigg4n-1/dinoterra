import React from "react";

const SectionMainTitleComponent = ({
  title,
  subtitle,
  firstTextPosition,
  titleColor,
  subtitleColor,
  subtitleWidth,
}: {
  title: string;
  subtitle?: string;
  firstTextPosition?: "center" | "left" | "right";
  titleColor?: "white" | "orange";
  subtitleWidth?: number;
  subtitleColor?: "white" | "purple";
}) => {
  const textPostion =
    firstTextPosition === "center"
      ? "text-center"
      : firstTextPosition === "right"
      ? "text-right"
      : firstTextPosition === "left"
      ? "text-left"
      : "";

  const titleCol =
    titleColor === "white"
      ? "text-white"
      : titleColor === "orange"
      ? "text-brightOrange"
      : "text-black";

  const subtitleCol =
    subtitleColor === "white"
      ? "text-white opacity-70"
      : subtitleColor === "purple"
      ? "text-darkPurple"
      : "text-black";
  return (
    <div className={`flex flex-col gap-2 w-full text-center lg:${textPostion}`}>
      <h2 className={`${titleCol} font-bold text-[32px] lg:text-[48px]`}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={`${subtitleCol} text-[16px] lg:text-[22px] ${
            subtitleWidth ? `max-w-[${subtitleWidth}px] mx-auto` : ""
          }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionMainTitleComponent;
