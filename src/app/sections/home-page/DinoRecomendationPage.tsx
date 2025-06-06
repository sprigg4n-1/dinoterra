"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { getFiveRandomDinos } from "@/services/DinoService";

import { IDino } from "@/config/types";

import DinoCard from "@/components/dino/DinoCard";
import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";

const DinoRecomendationPage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: "auto",
  });

  const [dinos, setDinos] = useState<IDino[]>([]);

  // use effects
  useEffect(() => {
    const getData = async () => {
      const dinosData = await getFiveRandomDinos();

      setDinos(dinosData);
    };

    getData();
  }, []);

  return (
    <div className="py-10 lg:py-20 px-2 sm:px-5 lg:px-20">
      <SectionMainTitleComponent
        title="Рекомендовані динозаври"
        subtitle="Відкрийте для себе деякі з найбільш знакових і захоплюючих динозаврів
          у нашій колекції."
        firstTextPosition="right"
        titleColor="white"
        subtitleColor="white"
      />

      {dinos ? (
        <div className="embla mt-8">
          <div className="embla__viewport-intro-rec-dino" ref={emblaRef}>
            <div className="embla__container-intro-rec-dino gap-5">
              {dinos.map((dino) => (
                <DinoCard
                  key={dino._id}
                  dino={dino}
                  link={`/encyclopedia/${dino._id}`}
                  bgColor="orange"
                  textColor="white"
                  slider
                  sliderClassName="embla__slide-intro-rec-dino"
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center mt-8 text-white text-[14px] md:text-[18px] bg-fieryRed py-5">
          Виникла помилка на сервері...
        </p>
      )}
    </div>
  );
};

export default DinoRecomendationPage;
