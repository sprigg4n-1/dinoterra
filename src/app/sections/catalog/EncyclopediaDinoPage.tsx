"use client";

import React, { useEffect, useState } from "react";

import {
  dinoDietLabels,
  dinoPeriodLabels,
  dinoTypeLabels,
  EDinoDiet,
  EDinoPeriod,
  EDinoType,
  IDino,
} from "@/config/types";
import Image from "next/image";
import { Map, Marker } from "@vis.gl/react-maplibre";

import imageNotFound from "@/images/not-found/image-not-found.webp";
import trsDino from "@/images/dino-page/triassic-period-popular-dino.webp";
import jrsDino from "@/images/dino-page/jurassic-period-popular-dino.jpg";
import crsDino from "@/images/dino-page/cretaceous-period-popular-dino.webp";

import TopDinoPageComponent from "@/components/TopDinoPageComponent";
import useEmblaCarousel from "embla-carousel-react";
import { getFiveRandomDinos } from "@/services/DinoService";
import DinoCard from "@/components/dino/DinoCard";

const EncyclopediaDinoPage = ({ dino }: { dino: IDino }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: "auto",
  });

  const [dinos, setDinos] = useState<IDino[]>([]);

  useEffect(() => {
    const getData = async () => {
      const dinosData = await getFiveRandomDinos();

      setDinos(dinosData);
    };

    getData();
  }, []);

  return (
    <div className="px-2 sm:px-5 lg:px-20 mb-5">
      <TopDinoPageComponent title={dino.latinName} />

      <div className="flex flex-col md:flex-row gap-3 md:gap-5 border-b-4 pb-3 mb-3 md:pb-5 md:mb-5">
        <Image
          src={
            dino.images.length > 0
              ? `data:image/jpg;base64,${dino.images[0].image}`
              : imageNotFound
          }
          alt="main image"
          width={4000}
          height={2000}
          className="w-full h-auto max-h-[400px] md:w-2/5 md:max-h-[600px]"
        />

        <div className="flex flex-col md:w-3/5 gap-2">
          <h1 className="text-[22px] md:text-[24px] flex flex-wrap items-center justify-center md:justify-start font-bold text-brightOrange">
            <p>{dino.name}</p> <p>({dino.latinName})</p>
          </h1>

          <div className="text-center md:text-left">
            <p className="text-[16px] lg:text-[18px]">
              <span className="font-medium">Тип:</span>{" "}
              {dinoTypeLabels[dino.typeOfDino as EDinoType]}
            </p>
            <p className="text-[16px] lg:text-[18px]">
              <span className="font-medium">Вага:</span> {dino.weight}кг
            </p>
            <p className="text-[16px] lg:text-[18px]">
              <span className="font-medium">Розмір:</span> {dino.length}м
            </p>
            <p className="text-[16px] lg:text-[18px]">
              <span className="font-medium">Харчування:</span>{" "}
              {dinoDietLabels[dino.diet as EDinoDiet]}({dino.diet})
            </p>
          </div>

          <p className="text-center md:text-left text-[14px] md:text-[16px] lg:text-[18px]">
            {dino.description}
          </p>
          <p className="text-center md:text-left text-[14px] md:text-[16px] lg:text-[18px]">
            {dino.dietDescription}
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-5 border-b-4 pb-3 mb-3 md:pb-5 md:mb-5">
        <div className="md:w-3/5 gap-2">
          <div className="text-center md:text-left">
            <h2 className="text-[18px] lg:text-[20px]">
              <span className="font-medium">Період існування:</span>{" "}
              {dinoPeriodLabels[dino.period as EDinoPeriod]} ({dino.period})
            </h2>

            <p className="text-[16px] lg:text-[18px]">
              <span className="font-medium">Час:</span> {dino.periodDate}м
            </p>
          </div>

          <p className="text-center md:text-left text-[14px] md:text-[16px] lg:text-[18px]">
            {dino.periodDescription}
          </p>
        </div>

        <div className="flex flex-col-reverse md:flex-col md:w-2/5 items-center justify-center">
          <Image
            src={
              dino.period === EDinoPeriod.Triassic
                ? trsDino
                : dino.period === EDinoPeriod.Jurassic
                ? jrsDino
                : crsDino
            }
            alt="main image"
            width={4000}
            height={2000}
            className="w-full h-auto max-h-[300px] md:max-h-[500px]"
          />
          <span className="text-center bg-slateGray w-full bg-opacity-10 text-darkGray font-light py-1 text-[14px]">
            {dino.period === EDinoPeriod.Triassic
              ? "Герреразавр - один із найдавніших відомих хижих динозаврів"
              : dino.period === EDinoPeriod.Jurassic
              ? "Алозавр - один із найпоширеніших тероподів свого часу"
              : "Тиранозавр рекс - одним із найвідоміших динозаврів"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:gap-5 border-b-4 pb-3 mb-3 md:pb-5 md:mb-5">
        <h2 className="text-[20px] lg:text-[24px] font-semibold text-center">
          Всі картинки
        </h2>
        <div className="flex flex-col gap-5 md:gap-10 items-center w-full px-2">
          {dino.images.slice(1).map((item) => (
            <Image
              key={item.id}
              src={`data:image/jpg;base64,${item.image}`}
              alt="image"
              width={4000}
              height={2000}
              className="w-auto h-auto max-h-[200px] lg:max-h-[350px]"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 md:gap-5 border-b-4 pb-3 mb-3 md:pb-5 md:mb-5">
        <h2 className="text-[20px] lg:text-[24px] font-semibold text-center">
          Місце положення знахоідок
        </h2>
        <div className="mx-auto w-full h-[300px] sm:h-[450px] lg:h-[700px]">
          <Map
            initialViewState={{
              longitude: +dino.foundLocations[0]?.longitude || 0,
              latitude: +dino.foundLocations[0]?.latitude || 0,
              zoom: 2.5,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="https://demotiles.maplibre.org/style.json">
            {dino.foundLocations.map((loc) => (
              <Marker
                key={loc.id}
                longitude={loc.longitude}
                latitude={loc.latitude}
                color="red"
              />
            ))}
          </Map>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:gap-5">
        <h2 className="text-[20px] lg:text-[24px] font-semibold text-center">
          Схожі динозаври
        </h2>
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
    </div>
  );
};

export default EncyclopediaDinoPage;
