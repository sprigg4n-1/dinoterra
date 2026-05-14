"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { getFiveRandomDinos } from "@/services/DinoService";

import { IDino } from "@/config/types";

import DinoCard from "@/components/dino/DinoCard";
import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";
import BaseContainer from "@/components/BaseContainer";

const DinoRecomendationSection = () => {
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
          title="Рекомендовані динозаври"
          subtitle="Відкрийте для себе деякі з найбільш знакових і захоплюючих динозаврів
          у нашій колекції."
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
            Виникла помилка на сервері...
          </p>
        )}
      </BaseContainer>
    </section>
  );
};

export default DinoRecomendationSection;
