"use client";

import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import Autoplay from "embla-carousel-autoplay";

import { IDino, IDinoFoundLocation, IDinoImages } from "@/config/types";

import {
  EDinoPeriod,
  EDinoDiet,
  EDinoType,
  dinoTypeLabels,
  dinoDietLabels,
  dinoPeriodLabels,
} from "@/config/types";

import { Map, Marker } from "@vis.gl/react-maplibre";
import Image from "next/image";
import Link from "next/link";

import imageNotFound from "@/images/not-found/image-not-found.webp";

const DinoPageDashboard = ({
  dino,
  images,
  foundLocations,
}: {
  dino: IDino;
  images: IDinoImages[];
  foundLocations: IDinoFoundLocation[];
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      slidesToScroll: "auto",
    },
    [Autoplay({ delay: 3000 })]
  );

  const [showAllImages, setShowAllImages] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <Link
          className="bg-slateGray text-white w-full text-center py-1 font-semibold hover:opacity-90 sm:w-auto sm:px-10"
          href={"/admin/dashboard/dinos"}
        >
          Назад
        </Link>
        <h2 className="flex-1 text-center text-[18px] font-bold sm:text-[20px]">
          {dino.name} ({dino.latinName})
        </h2>
      </div>

      <div className="lg:hidden embla-dino-page-images" ref={emblaRef}>
        <div className="embla__container-dino-page-images gap-10">
          {images &&
            images.map((image: any) => (
              <Image
                className="embla__slide-dino-page-images border-4 border-slateGray w-auto h-[250px] sm:h-[400px] object-fill"
                key={image._id}
                src={images.length > 0 ? image.file : imageNotFound}
                width={1000}
                height={500}
                alt="dino photo"
              />
            ))}
        </div>
      </div>

      <div className="hidden lg:flex flex-col gap-10 items-center">
        {showAllImages ? (
          <>
            <div className="flex flex-col gap-5 items-center">
              {images &&
                images.map((image) => (
                  <Image
                    className="border-4 border-slateGray w-auto h-auto max-w-[800px] max-h-[500px]"
                    key={image._id}
                    src={images.length > 0 ? image.file : imageNotFound}
                    width={2000}
                    height={1000}
                    alt="dino photo"
                  />
                ))}
            </div>

            <button
              className="py-1 px-10 bg-brightOrange text-white font-medium text-[18px] hover:bg-slateGray duration-300"
              onClick={(e) => {
                e.preventDefault();
                setShowAllImages(false);
              }}
            >
              Приховати
            </button>
          </>
        ) : (
          <>
            <Image
              className="border-4 border-slateGray w-auto h-auto max-w-[800px] max-h-[500px]"
              key={images[0]._id}
              src={images && images.length > 0 ? images[0].file : imageNotFound}
              width={2000}
              height={1000}
              alt="dino photo"
            />
            <button
              className="py-1 px-10 bg-brightOrange text-white font-medium text-[18px] hover:bg-slateGray duration-300"
              onClick={(e) => {
                e.preventDefault();
                setShowAllImages(true);
              }}
            >
              Показати всі фото
            </button>
          </>
        )}
      </div>

      <div className="w-full flex flex-col gap-1 text-center sm:text-left">
        <h3 className="text-[18px] sm:text-[20px] font-semibold">Опис</h3>
        <div>
          <span className="text-[14px] sm:text-[16px]">Довжина:</span>{" "}
          <span className="text-[14px] sm:text-[16px]">{dino.length}м</span>
        </div>
        <div>
          <span className="text-[14px] sm:text-[16px]">Вага:</span>{" "}
          <span className="text-[14px] sm:text-[16px]">{dino.weight}кг</span>
        </div>
        <div>
          <span className="text-[14px] sm:text-[16px]">Тип динозвара:</span>{" "}
          <span className="text-[14px] sm:text-[16px]">
            {dinoTypeLabels[dino.typeOfDino as EDinoType]}({dino.typeOfDino})
          </span>
        </div>
        <p className="text-[14px] sm:text-[16px]">{dino.description}</p>
      </div>

      <div className="w-full flex flex-col gap-1 text-center sm:text-left">
        <h3 className="text-[18px] sm:text-[20px] font-semibold">Харчування</h3>
        <div>
          <span className="text-[14px] sm:text-[16px]">Тип:</span>{" "}
          <span className="text-[14px] sm:text-[16px]">
            {dinoDietLabels[dino.diet as EDinoDiet]}({dino.diet})
          </span>
        </div>
        <p className="text-[14px] sm:text-[16px] text-center sm:text-left">
          {dino.dietDescription}
        </p>
      </div>

      <div className="w-full flex flex-col gap-1 text-center sm:text-left">
        <h3 className="text-[18px] sm:text-[20px] font-semibold">Період</h3>
        <div>
          <span className="text-[14px] sm:text-[16px]">Тип:</span>{" "}
          <span className="text-[14px] sm:text-[16px]">
            {dinoPeriodLabels[dino.period as EDinoPeriod]}({dino.period})
          </span>
        </div>
        <div>
          <span className="text-[14px] sm:text-[16px]">Часовий період:</span>{" "}
          <span className="text-[14px] sm:text-[16px]">{dino.periodDate}</span>
        </div>
        <p className="text-[14px] sm:text-[16px] text-center sm:text-left">
          {dino.dietDescription}
        </p>
      </div>

      <div className="w-full flex flex-col gap-1 text-center sm:text-left">
        <h3 className="text-[18px] sm:text-[20px] font-semibold">Карта</h3>
        <div className="h-[250px] sm:h-[500px] w-full">
          <Map
            initialViewState={{
              longitude: foundLocations[0]?.longitude,
              latitude: foundLocations[0]?.latitude,
              zoom: 1.5,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          >
            {foundLocations &&
              foundLocations.map((loc) => (
                <Marker
                  key={loc._id}
                  longitude={loc.longitude}
                  latitude={loc.latitude}
                  color="red"
                />
              ))}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default DinoPageDashboard;
