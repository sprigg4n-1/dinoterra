import {
  IDinoV2,
  IDinoV2FoundLocation,
  IDinoV2Image,
} from "@/config/types";

import TopDinoPageComponent from "@/components/TopDinoPageComponent";
import BaseContainer from "@/components/BaseContainer";
import DinoV2PageDescription from "@/components/encyclopedia/DinoV2PageDescription";
import DinoV2PageArticle from "@/components/encyclopedia/DinoV2PageArticle";
import DinoV2PageImages from "@/components/encyclopedia/DinoV2PageImages";
import DinoPageFoundLocations from "@/components/encyclopedia/DinoPageFoundLocations";
import DinoV2PageSimilarDinos from "@/components/encyclopedia/DinoV2PageSimilarDinos";

interface Props {
  dino: IDinoV2;
  images: IDinoV2Image[];
  foundLocations: IDinoV2FoundLocation[];
  similarDinos: IDinoV2[];
  locale: string;
}

const EncyclopediaDinoPageV2 = ({
  dino,
  images,
  foundLocations,
  similarDinos,
  locale,
}: Props) => {
  return (
    <section className="py-5 lg:py-10">
      <BaseContainer>
        <TopDinoPageComponent title={dino.latinName} />

        <DinoV2PageDescription dino={dino} images={images} locale={locale} />

        <DinoV2PageArticle article={dino.article} locale={locale} />

        <DinoV2PageImages images={images} />

        {foundLocations && foundLocations.length > 0 && (
          <DinoPageFoundLocations
            foundLocations={foundLocations}
            locale={locale}
          />
        )}

        <DinoV2PageSimilarDinos dinos={similarDinos} />
      </BaseContainer>
    </section>
  );
};

export default EncyclopediaDinoPageV2;
