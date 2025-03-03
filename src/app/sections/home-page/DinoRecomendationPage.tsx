"use client";

import DinoCard from "@/components/dino/DinoCard";
import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";
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
    <div className="py-10 lg:py-20 px-2 sm:px-5 lg:px-20">
      <SectionMainTitleComponent
        title="Рекомендовані динозаври"
        subtitle="Відкрийте для себе деякі з найбільш знакових і захоплюючих динозаврів
          у нашій колекції."
        firstTextPosition="right"
        titleColor="white"
        subtitleColor="white"
      />

      <div className="embla mt-8">
        <div className="embla__viewport-intro-rec-dino" ref={emblaRef}>
          <div className="embla__container-intro-rec-dino gap-5">
            {dinos.slice(0, 5).map((dino) => (
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
