"use client";

import React from "react";

import { Map, Marker, Popup } from "@vis.gl/react-maplibre";
import Link from "next/link";
import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";

const MapNavigatorPage = () => {
  return (
    <div className="py-10 lg:pt-20 px-2 sm:px-5 lg:px-20">
      <SectionMainTitleComponent
        title="Перегляд інтерактивної карти"
        firstTextPosition="left"
        titleColor="white"
        subtitleColor="white"
      />
      <div className="group w-full h-[250px] sm:h-[350px] lg:h-[700px] relative mt-8">
        <Map
          initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 3.5,
          }}
          dragPan={false}
          scrollZoom={false}
          doubleClickZoom={false}
          touchZoomRotate={false}
          dragRotate={false}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        ></Map>

        {/* pc */}
        <Link
          href={"/interactive-map"}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:group-hover:block w-[120px] py-1 text-center text-[18px] bg-black bg-opacity-50 text-brightOrange hover:bg-opacity-100"
        >
          до карти
        </Link>

        {/* mobile */}
        <Link
          href={"/interactive-map"}
          className="block lg:hidden text-[18px] mx-auto w-[200px] text-center mt-5 text-slateGray border-b-2 border-b-slateGray hover:text-brightOrange hover:border-b-brightOrange"
        >
          Перейти до карти
        </Link>
      </div>
    </div>
  );
};

export default MapNavigatorPage;
