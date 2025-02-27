"use client";

import React, { useState } from "react";

import { Map, Marker, Popup } from "@vis.gl/react-maplibre";

const MapPage = () => {
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
        <Marker longitude={-100} latitude={40} color="red" />
      </Map>
    </>
  );
};

export default MapPage;
