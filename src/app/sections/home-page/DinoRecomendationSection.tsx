"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { getFiveRandomDinos } from "@/services/DinoService";

import { IDino } from "@/config/types";

import DinoCard from "@/components/dino/DinoCard";
import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";
import BaseContainer from "@/components/BaseContainer";
import { useTranslations } from "next-intl";

const DinoRecomendationSection = () => {
  const t = useTranslations();

  const [dinos, setDinos] = useState<IDino[]>([]);

  useEffect(() => {
    const getData = async () => {
      const dinosData = await getFiveRandomDinos();

      setDinos(dinosData);
    };

    getData();
  }, []);

  return (
    <section className="py-5 lg:py-10">
      <BaseContainer>
        <SectionMainTitleComponent
          title={t("home.recs.title")}
          subtitle={t("home.recs.subtitle")}
          firstTextPosition="right"
          titleColor="white"
          subtitleColor="white"
        />

        {dinos && dinos.length > 0 ? (
          <Swiper spaceBetween={20} slidesPerView="auto" className="mt-8">
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
          <p className="text-center mt-8 text-white text-[14px] md:text-[18px] bg-fieryRed py-5">
            {t("errors.proplemsWithServer")}
          </p>
        )}
      </BaseContainer>
    </section>
  );
};

export default DinoRecomendationSection;
