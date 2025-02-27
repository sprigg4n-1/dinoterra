"use client";

import DinoCard from "@/components/dino/DinoCard";
import { IDino } from "@/config/types";
import { getDinos } from "@/services/DinoService";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";

const DinoRecomendationPage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: "auto",
  });

  const [dinos, setDinos] = useState<IDino[]>([]);

  useEffect(() => {
    const getData = async () => {
      const dinosData = await getDinos();

      setDinos(dinosData);
    };

    getData();
  }, []);

  return (
    <div className="py-10 lg:py-20 px-2 lg:px-5">
      <div className="lg:text-right text-center mb-8 lg:mb-12">
        <h2 className="text-white font-bold text-[32px] lg:text-[48px]">
          Рекомендовані динозаври
        </h2>
        <p className="block text-[18px] lg:text-[22px] text-white opacity-70 font-light">
          Відкрийте для себе деякі з найбільш знакових і захоплюючих динозаврів
          у нашій колекції.
        </p>
      </div>
      <div className="embla">
        <div className="embla__viewport-intro-rec-dino" ref={emblaRef}>
          <div className="embla__container-intro-rec-dino gap-5">
            {dinos.map((dino) => (
              <DinoCard
                key={dino.id}
                dino={dino}
                link={`/encyclopedia/${dino.id}`}
                bgColor="orange"
                textColor="white"
                slider
                sliderClassName="embla__slide-intro-rec-dino"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinoRecomendationPage;
