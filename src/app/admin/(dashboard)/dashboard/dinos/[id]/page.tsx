import React from "react";

import DinoPageDashboard from "@/app/sections/dashboard/dinos/DinoPageDashboard";
import { getDinoById } from "@/services/DinoService";

const DinoDashboard = async ({ params }: { params: any }) => {
  const { id } = await params;
  const dino = await getDinoById(+id);

  return (
    <>
      <DinoPageDashboard dino={dino} />
    </>
  );
};

export default DinoDashboard;
