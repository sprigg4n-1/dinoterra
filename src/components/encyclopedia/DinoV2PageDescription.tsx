"use client";

import { IDinoV2, IDinoV2Image } from "@/config/types";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import {
  addFavoriteDinoV2,
  isFavoriteDinoV2,
  removeFavoriteDinoV2,
} from "@/services/SecurityService";
import { useTranslations } from "next-intl";

import Image from "next/image";
import imageNotFound from "@/images/not-found/image-not-found.webp";

interface Props {
  dino: IDinoV2;
  images: IDinoV2Image[];
  locale: string;
}

const DinoV2PageDescription = ({ dino, images, locale }: Props) => {
  const { user } = useAuth();
  const [isDinoInFav, setIsDinoInFav] = useState(false);

  const tPage = useTranslations("dinoV2.page");
  const tFilter = useTranslations("encyclopedia.filter");

  const mainImage = images.find((img) => img.isMain) ?? images[0];
  const name = locale === "en" ? dino.name.en : dino.name.uk;

  const checkFav = async () => {
    const fav = await isFavoriteDinoV2(user?._id || "random", dino._id);
    setIsDinoInFav(fav);
  };

  useEffect(() => {
    if (user) checkFav();
  }, [user]);

  const onClickAddToFav = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await addFavoriteDinoV2(user?._id || "random", dino._id);
    await checkFav();
  };

  const onClickRemoveFromFav = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await removeFavoriteDinoV2(user?._id || "random", dino._id);
    await checkFav();
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-5 border-b-4 pb-3 mb-3 md:pb-5 md:mb-5">
      <div className="h-fit flex flex-col border-2 border-brightOrange">
        <Image
          src={mainImage?.file || imageNotFound}
          alt="main image"
          width={4000}
          height={2000}
          priority
          className="h-fit max-h-[400px] md:max-h-[600px] md:min-h-[350px] w-full object-cover"
        />
        {user &&
          (isDinoInFav ? (
            <button
              type="button"
              className="w-full py-2 bg-fieryRed text-white px-5 hover:font-semibold duration-300"
              onClick={onClickRemoveFromFav}
            >
              {tPage("removeFromFav")}
            </button>
          ) : (
            <button
              type="button"
              className="w-full py-2 bg-brightOrange text-white px-5 hover:font-semibold duration-300"
              onClick={onClickAddToFav}
            >
              {tPage("addToFav")}
            </button>
          ))}
      </div>

      <div className="flex flex-col md:w-3/5 gap-2">
        <h1 className="text-[22px] md:text-[24px] flex flex-wrap items-center justify-center md:justify-start font-bold text-brightOrange gap-2">
          <span>{name}</span>
          <span>({dino.latinName})</span>
        </h1>

        <div className="text-center md:text-left">
          <p className="text-[16px] lg:text-[18px]">
            <span className="font-medium">{tPage("type")}:</span>{" "}
            {tFilter(`type.${dino.typeOfDino}`)}
          </p>
          <p className="text-[16px] lg:text-[18px]">
            <span className="font-medium">{tPage("weight")}:</span>{" "}
            {dino.weight.toFixed(2)} {tPage("weightUnit")}
          </p>
          <p className="text-[16px] lg:text-[18px]">
            <span className="font-medium">{tPage("length")}:</span>{" "}
            {dino.length.toFixed(2)} {tPage("lengthUnit")}
          </p>
          <p className="text-[16px] lg:text-[18px]">
            <span className="font-medium">{tPage("diet")}:</span>{" "}
            {tFilter(`diet.${dino.diet}`)}
          </p>
          <p className="text-[16px] lg:text-[18px]">
            <span className="font-medium">{tPage("period")}:</span>{" "}
            {tFilter(`period.${dino.period}`)}
          </p>
          <p className="text-[16px] lg:text-[18px]">
            <span className="font-medium">{tPage("periodDate")}:</span>{" "}
            {dino.periodDate} {tPage("periodDateSuffix")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DinoV2PageDescription;
