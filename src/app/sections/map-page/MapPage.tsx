"use client";

import React, { useState } from "react";

import { Map, Marker, Popup } from "@vis.gl/react-maplibre";

const MapPage = () => {
  const [showPopup, setShowPopup] = useState(true);

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

        {showPopup && (
          <Popup
            longitude={-100}
            latitude={40}
            onClose={() => setShowPopup(false)}
            anchor="top">
            <div>
              <h4>Location Info</h4>
              <p>This is a popup example.</p>
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
};

export default MapPage;
