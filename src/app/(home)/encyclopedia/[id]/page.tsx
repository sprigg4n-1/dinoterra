import React from "react";

import EncyclopediaDinoPage from "@/app/sections/catalog/EncyclopediaDinoPage";
import { getDinoById } from "@/services/DinoService";

const EncyclopediaInfo = async ({ params }: { params: any }) => {
  const { id } = await params;
  const dino = await getDinoById(+id);
  return (
    <>
      <EncyclopediaDinoPage dino={dino} />
    </>
  );
};

export default EncyclopediaInfo;
