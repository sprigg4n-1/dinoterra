const TitleComponent = ({
  text,
  size,
  textColor,
  additionalClasses,
}: {
  text: string;
  size: "lg" | "md" | "sm";
  textColor: "white" | "black" | "darkGray" | "fieryRed" | "brightOrange";
  additionalClasses?: string;
}) => {
  const finalSize =
    size === "lg"
      ? "text-[28px] lg:text-[34px]"
      : size === "md"
      ? "text-[24px] lg:text-[28px]"
      : "text-[20px] lg:text-[24px]";

  const finalColor =
    textColor === "white"
      ? "text-white"
      : textColor === "black"
      ? "text-black"
      : textColor === "darkGray"
      ? "text-darkGray"
      : textColor === "fieryRed"
      ? "text-fieryRed"
      : "text-brightOrange";

  return (
    <h2 className={`${finalSize} ${finalColor} ${additionalClasses}`}>
      {text}
    </h2>
  );
};

export default TitleComponent;
