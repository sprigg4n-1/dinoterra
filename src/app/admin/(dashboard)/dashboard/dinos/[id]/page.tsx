import { getDinoById } from "@/services/DinoService";

import DinoPageDashboard from "@/app/sections/dashboard/dinos/DinoPageDashboard";

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
