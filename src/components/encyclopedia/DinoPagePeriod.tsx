import { dinoPeriodLabels, EDinoPeriod, IDino } from "@/config/types";

import Image from "next/image";

import trsDino from "@/images/dino-page/triassic-period-popular-dino.webp";
import jrsDino from "@/images/dino-page/jurassic-period-popular-dino.jpg";
import crsDino from "@/images/dino-page/cretaceous-period-popular-dino.webp";

interface Props {
  dino: IDino;
}

const DinoPagePeriod = ({ dino }: Props) => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-5 border-b-4 pb-3 mb-3 md:pb-5 md:mb-5">
      <div className="md:w-3/5 gap-2">
        <div className="text-center md:text-left">
          <h2 className="text-[18px] lg:text-[20px]">
            <span className="font-medium">Період існування:</span>{" "}
            {dinoPeriodLabels[dino?.period as EDinoPeriod]} ({dino?.period})
          </h2>

          <p className="text-[16px] lg:text-[18px]">
            <span className="font-medium">Час:</span> {dino?.periodDate}м
          </p>
        </div>

        <p className="text-center md:text-left text-[14px] md:text-[16px] lg:text-[18px]">
          {dino?.periodDescription}
        </p>
      </div>

      <div className="flex flex-col-reverse md:flex-col md:w-2/5 items-center justify-center">
        <Image
          src={
            dino?.period === EDinoPeriod.Triassic
              ? trsDino
              : dino?.period === EDinoPeriod.Jurassic
                ? jrsDino
                : crsDino
          }
          alt="main image"
          width={4000}
          height={2000}
          className="w-full h-auto max-h-[300px] md:max-h-[500px]"
        />
        <span className="text-center bg-slateGray w-full bg-opacity-10 text-darkGray font-light py-1 text-[14px]">
          {dino?.period === EDinoPeriod.Triassic
            ? "Герреразавр - один із найдавніших відомих хижих динозаврів"
            : dino?.period === EDinoPeriod.Jurassic
              ? "Алозавр - один із найпоширеніших тероподів свого часу"
              : "Тиранозавр рекс - одним із найвідоміших динозаврів"}
        </span>
      </div>
    </div>
  );
};

export default DinoPagePeriod;
