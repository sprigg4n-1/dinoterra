import Image from "next/image";
import Link from "next/link";
import React from "react";

import imageNotFound from "@/images/not-found/image-not-found.webp";
import { IDino } from "@/config/types";

const DinoCard = ({ link, dino }: { link: string; dino: IDino }) => {
  return (
    <Link
      href={link}
      className="group w-fit bg-darkGray text-white flex flex-col gap-2">
      <div className="border-4 border-darkGray overflow-hidden">
        <Image
          src={
            dino.images.length > 0
              ? `data:image/jpg;base64,${dino.images[0].image}`
              : imageNotFound
          }
          width={800}
          height={800}
          alt="dino image"
          className="group-hover:scale-105 w-56 h-60 object-fit duration-300"
        />
      </div>

      <p className="text-center pb-2 text-[18px]">{dino.latinName}</p>
    </Link>
  );
};

export default DinoCard;
