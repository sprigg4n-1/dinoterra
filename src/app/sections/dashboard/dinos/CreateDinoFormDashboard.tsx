"use client";

import { useState } from "react";

import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";

import DinoForm from "@/components/dashboard/dino/DinoForm";
import DinoAddImages from "@/components/dashboard/dino/DinoAddImages";
import DinoAddLocations from "@/components/dashboard/dino/DinoAddLocations";

export type TDinoFoundLocation = {
  id: string;
  latitude: string;
  longitude: string;
  place: string;
};

export type TDinoImages = {
  id: string;
  imagePath: string;
};

const CreateDinoFormDashboard = () => {
  const [isCreatedSuccessful, setIsCreatedSuccessful] =
    useState<boolean>(false);

  const [latitudeLoc, setLatitudeLoc] = useState<number>(0);
  const [longitudeLoc, setLongitudeLoc] = useState<number>(0);
  const [placeLoc, setPlaceLoc] = useState<string>("");

  const [foundLocations, setFoundLocations] = useState<TDinoFoundLocation[]>(
    [],
  );
  const [dinoImages, setDinoImages] = useState<TDinoImages[]>([]);

  const additionalFunctionForCreation = () => {
    setIsCreatedSuccessful(true);
    setFoundLocations([]);
    setDinoImages([]);
    setLatitudeLoc(0);
    setLongitudeLoc(0);
    setPlaceLoc("");
  };

  return (
    <>
      <DashboardTitleComponent text={"Створення динозавра"} />
      {!isCreatedSuccessful ? (
        <div className="flex flex-col gap-5">
          <DinoAddImages
            dinoImages={dinoImages}
            setDinoImages={setDinoImages}
          />

          <DinoAddLocations
            latitudeLoc={latitudeLoc}
            longitudeLoc={longitudeLoc}
            placeLoc={placeLoc}
            foundLocations={foundLocations}
            setLatitudeLoc={setLatitudeLoc}
            setLongitudeLoc={setLongitudeLoc}
            setPlaceLoc={setPlaceLoc}
            setFoundLocations={setFoundLocations}
          />

          <DinoForm
            locations={foundLocations}
            images={dinoImages}
            additionalFunctionForCreation={additionalFunctionForCreation}
          />
        </div>
      ) : (
        <span>Ви успішно додали динозавра</span>
      )}
    </>
  );
};

export default CreateDinoFormDashboard;
