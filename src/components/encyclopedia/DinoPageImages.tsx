"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import { IDinoImages } from "@/config/types";

import Image from "next/image";
import Link from "next/link";

interface Props {
  images: IDinoImages[];
}

const DinoPageImages = ({ images }: Props) => {
  return (
    <div className="flex flex-col gap-3 md:gap-5 border-b-4 pb-3 mb-3 md:pb-5 md:mb-5">
      {images && images.slice(1).length > 0 ? (
        <>
          <h2 className="text-[20px] lg:text-[24px] font-semibold text-center">
            Всі картинки
          </h2>
          <Swiper spaceBetween={20} slidesPerView="auto">
            {images.slice(1).map((item) => (
              <SwiperSlide key={item._id} style={{ width: "auto" }}>
                <div className="relative">
                  <Image
                    key={item._id}
                    src={item.file}
                    alt="image"
                    width={4000}
                    height={2000}
                    className="w-auto h-auto max-h-[200px] lg:max-h-[350px] object-fill"
                  />
                  <Link
                    href={"https://dinosaurpictures.org/"}
                    className="absolute top-0 left-0 bg-[rgba(0,0,0,0.7)] text-white text-[12px] w-full py-px text-center block"
                  >
                    Взято з DinosaurPictures
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <h2 className="text-[20px] lg:text-[24px] font-semibold text-center">
          Більше картинок немає
        </h2>
      )}
    </div>
  );
};

export default DinoPageImages;
