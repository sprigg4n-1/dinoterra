"use client";

import React, { useEffect, useState } from "react";

import { Map, Marker } from "@vis.gl/react-maplibre";
import { IDinoFoundLocation } from "@/config/types";
import { getFoundLocations } from "@/services/FoundLocationService";

const MapPage = () => {
  const [locations, setLocations] = useState<IDinoFoundLocation[]>([]);

  // use effects
  useEffect(() => {
    const getLocs = async () => {
      const locsData = await getFoundLocations();

      setLocations(locsData);
    };
    getLocs();
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://demotiles.maplibre.org/style.json">
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            longitude={loc.longitude}
            latitude={loc.latitude}
            color="red"
          />
        ))}
      </Map>
    </>
  );
};

export default MapPage;
