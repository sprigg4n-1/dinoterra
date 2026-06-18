"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";

import { IDino, IDinoV2 } from "@/config/types";
import DinoCard from "@/components/dino/DinoCard";

interface Props {
  dinos: IDinoV2[];
}

const adaptToDinoCard = (dino: IDinoV2): IDino =>
  ({ ...dino, image: dino.mainImage ?? undefined } as unknown as IDino);

const DinoV2PageSimilarDinos = ({ dinos }: Props) => {
  const tPage = useTranslations("dinoV2.page");

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <h2 className="text-[20px] lg:text-[24px] font-semibold text-center">
        {tPage("similarDinos")}
      </h2>
      {dinos.length > 0 ? (
        <Swiper spaceBetween={20} slidesPerView="auto">
          {dinos.map((dino) => (
            <SwiperSlide key={dino._id} style={{ width: "auto" }}>
              <DinoCard
                dino={adaptToDinoCard(dino)}
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
          {tPage("noSimilarDinos")}
        </p>
      )}
    </div>
  );
};

export default DinoV2PageSimilarDinos;
