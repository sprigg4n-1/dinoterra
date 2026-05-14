"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { IDino } from "@/config/types";
import { getSimilarDinos } from "@/services/DinoService";

import DinoCard from "../dino/DinoCard";

interface Props {
  dino: IDino;
}

const DinoPageSimilarDinos = ({ dino }: Props) => {
  const [dinos, setDinos] = useState<IDino[]>([]);

  useEffect(() => {
    const getData = async () => {
      const dinosData = await getSimilarDinos(dino?._id || "random");

      setDinos(dinosData);
    };

    getData();
  }, [dino]);

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <h2 className="text-[20px] lg:text-[24px] font-semibold text-center">
        Схожі динозаври
      </h2>
      {dinos && dinos.length > 0 ? (
        <Swiper spaceBetween={20} slidesPerView="auto">
          {dinos.map((dino) => (
            <SwiperSlide key={dino._id} style={{ width: "auto" }}>
              <DinoCard
                dino={dino}
                link={`/encyclopedia/${dino._id}`}
                bgColor="orange"
                textColor="white"
                slider
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-[14px] md:text-[18px] text-fieryRed text-center">
          Схожих динозаврів не найдено
        </p>
      )}
    </div>
  );
};

export default DinoPageSimilarDinos;
