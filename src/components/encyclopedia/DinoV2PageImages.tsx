"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";
import { IDinoV2Image } from "@/config/types";
import Image from "next/image";

interface Props {
  images: IDinoV2Image[];
}

const DinoV2PageImages = ({ images }: Props) => {
  const tPage = useTranslations("dinoV2.page");
  const galleryImages = images.filter((img) => !img.isMain);

  if (galleryImages.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 md:gap-5 border-b-4 pb-3 mb-3 md:pb-5 md:mb-5">
      <h2 className="text-[20px] lg:text-[24px] font-semibold text-center">
        {tPage("allImages")}
      </h2>
      <Swiper spaceBetween={20} slidesPerView="auto">
        {galleryImages.map((img) => (
          <SwiperSlide key={img._id} style={{ width: "auto" }}>
            <Image
              src={img.file}
              alt="dino image"
              width={4000}
              height={2000}
              className="w-auto h-auto max-h-[200px] lg:max-h-[350px] object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DinoV2PageImages;
