import { IDino, IDinoFoundLocation, IDinoImages } from "@/config/types";

import TopDinoPageComponent from "@/components/TopDinoPageComponent";
import BaseContainer from "@/components/BaseContainer";
import DinoPageDescription from "@/components/encyclopedia/DinoPageDescription";
import DinoPagePeriod from "@/components/encyclopedia/DinoPagePeriod";
import DinoPageImages from "@/components/encyclopedia/DinoPageImages";
import DinoPageFoundLocations from "@/components/encyclopedia/DinoPageFoundLocations";
import DinoPageSimilarDinos from "@/components/encyclopedia/DinoPageSimilarDinos";

const EncyclopediaDinoPage = ({
  dino,
  images,
  foundLocations,
}: {
  dino: IDino;
  images: IDinoImages[];
  foundLocations: IDinoFoundLocation[];
}) => {
  return (
    <section className="py-5 lg:py-10">
      <BaseContainer>
        <TopDinoPageComponent title={dino?.latinName} />

        <DinoPageDescription dino={dino} images={images} />

        <DinoPagePeriod dino={dino} />

        <DinoPageImages images={images} />

        <DinoPageFoundLocations foundLocations={foundLocations} />

        <DinoPageSimilarDinos dino={dino} />
      </BaseContainer>
    </section>
  );
};

export default EncyclopediaDinoPage;
