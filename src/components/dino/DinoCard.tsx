import { IDino } from "@/config/types";

import Image from "next/image";
import Link from "next/link";

import imageNotFound from "@/images/not-found/image-not-found.webp";
import { useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();

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

  const redirectToPage = () => {
    window.open("https://dinosaurpictures.org/");
  };

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
        } overflow-hidden relative`}
      >
        <Image
          src={dino.image ? dino.image : imageNotFound}
          width={1600}
          height={1600}
          alt="dino image"
          className={`group-hover:scale-105 ${
            slider
              ? "w-auto h-[200px] sm:h-[350px] object-fill"
              : "w-60 h-60 object-fill"
          } duration-300`}
        />
        {/* <button
          onClick={redirectToPage}
          className="absolute top-0 right-0 bg-[rgba(0,0,0,0.7)] text-white text-[12px] w-full py-px text-center"
        >
          {t("account.imageSource")}
        </button> */}
      </div>

      <p
        className={`text-center pb-1 px-4 text-[18px] font-semibold   ${
          slider ? "w-auto" : "w-60 break-words"
        } ${finalColor}`}
      >
        {dino.latinName}
      </p>
    </Link>
  );
};

export default DinoCard;
