"use client";

import { IDinoFoundLocation } from "@/config/types";

import { Map, Marker } from "@vis.gl/react-maplibre";

interface Props {
  foundLocations: IDinoFoundLocation[];
}

const DinoPageFoundLocations = ({ foundLocations }: Props) => {
  return (
    <div className="flex flex-col gap-3 md:gap-5 border-b-4 pb-3 mb-3 md:pb-5 md:mb-5">
      <h2 className="text-[20px] lg:text-[24px] font-semibold text-center">
        Місце положення знахоідок
      </h2>
      <div className="mx-auto w-full h-[300px] sm:h-[450px] lg:h-[700px]">
        <Map
          initialViewState={{
            longitude: foundLocations[0]?.longitude || 0,
            latitude: foundLocations[0]?.latitude || 0,
            zoom: 3.5,
          }}
          style={{ width: "100%", height: "100%" }}
          dragPan={false}
          scrollZoom={false}
          doubleClickZoom={false}
          touchZoomRotate={false}
          dragRotate={false}
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
  );
};

export default DinoPageFoundLocations;
