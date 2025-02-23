import DinoPageDashboard from "@/app/sections/dashboard/dinos/DinoPageDashboard";
import { getDinoById } from "@/services/DinoService";
import React from "react";

const DinoDashboard = async ({ params }: { params: { id: string } }) => {
  const dino = await getDinoById(+params.id);
  return (
    <>
      <DinoPageDashboard dino={dino} />
    </>
  );
};

export default DinoDashboard;
