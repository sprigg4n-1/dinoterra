"use client";

import {
  dinoDietLabels,
  dinoTypeLabels,
  EDinoDiet,
  EDinoType,
  IDino,
  IDinoImages,
} from "@/config/types";

import { useAuth } from "@/hooks/useAuth";

import Image from "next/image";
import Link from "next/link";

import imageNotFound from "@/images/not-found/image-not-found.webp";
import { useEffect, useState } from "react";
import {
  addFavoriteDino,
  isFavoriteDino,
  removeFavoriteDino,
} from "@/services/SecurityService";

interface Props {
  dino: IDino;
  images: IDinoImages[];
}

const DinoPageDescription = ({ dino, images }: Props) => {
  const { user } = useAuth();

  const [isDinoInFav, setIsDinoInFav] = useState<boolean>(false);

  // functions
  const onClickAddToFav = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await addFavoriteDino(user?._id || "random", dino._id);
    await checkFav();
  };

  const onClickRemoveFromFav = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    await removeFavoriteDino(user?._id || "random", dino._id);
    await checkFav();
  };

  const checkFav = async () => {
    const isFav = await isFavoriteDino(user?._id || "random", dino._id);
    setIsDinoInFav(isFav);
  };

  useEffect(() => {
    if (user) {
      const isFav = async () => {
        const isFav = await isFavoriteDino(user._id, dino._id);
        setIsDinoInFav(isFav);
      };

      isFav();
    }
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-5 border-b-4 pb-3 mb-3 md:pb-5 md:mb-5">
      <div className="h-fit flex flex-col border-2 border-brightOrange">
        <Link
          href={"https://dinosaurpictures.org/"}
          className="bg-[rgba(0,0,0,0.7)] text-white text-[12px] w-full py-px text-center block"
        >
          Взято з DinosaurPictures
        </Link>
        <Image
          src={images && images.length > 0 ? images[0].file : imageNotFound}
          alt="main image"
          width={4000}
          height={2000}
          className="h-fit max-h-[400px] md:max-h-[600px] md: min-h-[350px] w-full"
        />
        {user &&
          (isDinoInFav ? (
            <button
              type="button"
              className="w-full py-2 bg-fieryRed text-white px-5 hover:font-semibold duration-300"
              onClick={(e) => onClickRemoveFromFav(e)}
            >
              Видалити з улюблених
            </button>
          ) : (
            <button
              type="button"
              className="w-full py-2 bg-brightOrange text-white px-5 hover:font-semibold duration-300"
              onClick={(e) => onClickAddToFav(e)}
            >
              Додати до улюблених
            </button>
          ))}
      </div>

      <div className="flex flex-col md:w-3/5 gap-2">
        <h1 className="text-[22px] md:text-[24px] flex flex-wrap items-center justify-center md:justify-start font-bold text-brightOrange">
          <p>{dino?.name}</p> <p>({dino?.latinName})</p>
        </h1>

        <div className="text-center md:text-left">
          <p className="text-[16px] lg:text-[18px]">
            <span className="font-medium">Тип:</span>{" "}
            {dinoTypeLabels[dino?.typeOfDino as EDinoType]}
          </p>
          <p className="text-[16px] lg:text-[18px]">
            <span className="font-medium">Вага:</span> {dino?.weight.toFixed(2)}
            кг
          </p>
          <p className="text-[16px] lg:text-[18px]">
            <span className="font-medium">Розмір:</span>{" "}
            {dino?.length.toFixed(2)}м
          </p>
          <p className="text-[16px] lg:text-[18px]">
            <span className="font-medium">Харчування:</span>{" "}
            {dinoDietLabels[dino?.diet as EDinoDiet]}({dino?.diet})
          </p>
        </div>

        <p className="text-center md:text-left text-[14px] md:text-[16px] lg:text-[18px]">
          {dino?.description}
        </p>
        <p className="text-center md:text-left text-[14px] md:text-[16px] lg:text-[18px]">
          {dino?.dietDescription}
        </p>
      </div>
    </div>
  );
};

export default DinoPageDescription;
