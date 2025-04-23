const SectionMainTitleComponent = ({
  title,
  subtitle,
  firstTextPosition,
  titleColor,
  subtitleColor,
  subtitleWidth,
  titleSize,
  subtitleSize,
}: {
  title: string;
  subtitle?: string;
  firstTextPosition?: "center" | "left" | "right";
  titleColor?: "white" | "orange";
  subtitleWidth?: number;
  subtitleColor?: "white" | "purple";
  titleSize?: "lg" | "md" | "sm";
  subtitleSize?: "lg" | "sm";
}) => {
  const textPostion =
    firstTextPosition === "center"
      ? "text-center"
      : firstTextPosition === "right"
      ? "lg:text-right text-center"
      : firstTextPosition === "left"
      ? "lg:text-left text-center"
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

  const titleSizeFinal =
    titleSize === "lg"
      ? "text-[30px] lg:text-[44px]"
      : titleSize === "md"
      ? "text-[28px] lg:text-[40px]"
      : titleSize === "sm"
      ? "text-[24px] lg:text-[32px]"
      : "text-[32px] lg:text-[48px]";

  const subtitleSizeFinal =
    subtitleSize === "lg"
      ? "text-[14px] lg:text-[20px]"
      : subtitleSize === "sm"
      ? "text-[12px] lg:text-[18px]"
      : "text-[16px] lg:text-[22px]";

  return (
    <div className={`flex flex-col w-full ${textPostion}`}>
      <h2 className={`${titleCol} font-bold ${titleSizeFinal}`}>{title}</h2>
      {subtitle && (
        <p
          className={`${subtitleCol} ${subtitleSizeFinal} ${
            subtitleWidth ? `max-w-[${subtitleWidth}px] mx-auto` : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionMainTitleComponent;
