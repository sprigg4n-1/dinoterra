"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { getFiveRandomDinosV2 } from "@/services/DinoV2Service";

import { IDino, IDinoV2 } from "@/config/types";

import DinoCard from "@/components/dino/DinoCard";
import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";
import BaseContainer from "@/components/BaseContainer";
import { useTranslations } from "next-intl";
import LoaderComponent from "@/components/LoaderComponent";

const adaptV2ToCard = (dino: IDinoV2): IDino =>
  ({ ...dino, image: dino.mainImage ?? undefined }) as unknown as IDino;

const DinoRecomendationSection = () => {
  const t = useTranslations();

  const [dinos, setDinos] = useState<IDinoV2[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const dinosData = await getFiveRandomDinosV2();

      setDinos(dinosData ?? []);
      setIsLoading(false);
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

        {isLoading ? (
          <div className="flex items-center justify-center py-5">
            <LoaderComponent />
          </div>
        ) : dinos && dinos.length > 0 ? (
          <Swiper spaceBetween={20} slidesPerView="auto" className="mt-8">
            {dinos.map((dino) => (
              <SwiperSlide key={dino._id} style={{ width: "auto" }}>
                <DinoCard
                  dino={adaptV2ToCard(dino)}
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
