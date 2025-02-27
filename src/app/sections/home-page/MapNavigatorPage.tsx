"use client";

import React from "react";

import { Map, Marker, Popup } from "@vis.gl/react-maplibre";
import Link from "next/link";

const MapNavigatorPage = () => {
  return (
    <div className="py-10 lg:pt-20 px-2 lg:px-5">
      <div className="lg:text-left text-center mb-8 lg:mb-12">
        <h2 className="text-white font-bold text-[32px] lg:text-[48px]">
          Перегляд інтерактивної карти
        </h2>
        <p className="hidden lg:block text-[22px] text-white opacity-70 font-light">
          Клацніть будь-який регіон, щоб побачити динозаврів, знайдених у цьому
          районі.
        </p>
      </div>

      <div>
        <div className="group w-full h-[250px] sm:h-[350px] lg:h-[700px] relative">
          <Map
            initialViewState={{
              longitude: -100,
              latitude: 40,
              zoom: 3.5,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="https://demotiles.maplibre.org/style.json"></Map>

          {/* pc */}
          <Link
            href={"/interactive-map"}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:group-hover:block w-[120px] py-1 text-center text-[18px] bg-black bg-opacity-50 text-brightOrange hover:bg-opacity-100">
            до карти
          </Link>

          {/* mobile */}
          <Link
            href={"/interactive-map"}
            className="block lg:hidden text-[18px] mx-auto w-[200px] text-center mt-5 text-slateGray border-b-2 border-b-slateGray hover:text-brightOrange hover:border-b-brightOrange">
            Перейти до карти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MapNavigatorPage;
