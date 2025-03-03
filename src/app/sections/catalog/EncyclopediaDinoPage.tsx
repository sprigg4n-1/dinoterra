import { IDino } from "@/config/types";
import React from "react";

const EncyclopediaDinoPage = ({ dino }: { dino: IDino }) => {
  return <div className="px-2 sm:px-5 lg:px-20">{dino.name}</div>;
};

export default EncyclopediaDinoPage;
