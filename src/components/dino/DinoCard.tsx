import { IDino } from "@/config/types";

import Image from "next/image";
import Link from "next/link";

import imageNotFound from "@/images/not-found/image-not-found.webp";

const DinoCard = ({
  link,
  dino,
  border,
  textColor,
  bgColor,
  slider,
  sliderClassName,
}: {
  link: string;
  dino: IDino;
  border?: boolean;
  textColor?: "white" | "orange";
  bgColor?: "black" | "orange";
  slider?: boolean;
  sliderClassName?: string;
}) => {
  const finalColor =
    textColor === "white"
      ? "text-white"
      : textColor === "orange"
      ? "text-brightOrange"
      : "text-black";
  const finalBgColor =
    bgColor === "black"
      ? "bg-darkGray"
      : bgColor === "orange"
      ? "bg-brightOrange"
      : "bg-white";

  const finalBorderColor =
    bgColor === "black"
      ? "border-darkGray"
      : bgColor === "orange"
      ? "border-brightOrange"
      : "border-white";

  return (
    <Link
      href={link}
      className={`group w-fit ${finalBgColor} flex flex-col ${
        slider ? sliderClassName : ""
      }`}
    >
      <div
        className={`border-4 ${
          border ? finalBorderColor : "border-none"
        } overflow-hidden`}
      >
        <Image
          src={dino.image ? dino.image : imageNotFound}
          width={1600}
          height={1600}
          alt="dino image"
          className={`group-hover:scale-105 ${
            slider
              ? "w-auto h-[200px] sm:h-[350px] object-fill"
              : "w-56 h-60 object-fit"
          } duration-300`}
        />
      </div>

      <p className={`text-center pb-1 text-[18px] font-semibold ${finalColor}`}>
        {dino.latinName}
      </p>
    </Link>
  );
};

export default DinoCard;
