import { Suspense } from "react";
import dynamic from "next/dynamic";

import {
  IDinoV2,
  IDinoV2FoundLocation,
  IDinoV2Image,
} from "@/config/types";

import TopDinoPageComponent from "@/components/TopDinoPageComponent";
import BaseContainer from "@/components/BaseContainer";
import DinoV2PageDescription from "@/components/encyclopedia/DinoV2PageDescription";
import DinoV2PageImages from "@/components/encyclopedia/DinoV2PageImages";
import DinoPageFoundLocations from "@/components/encyclopedia/DinoPageFoundLocations";
import DinoV2PageSimilarDinos from "@/components/encyclopedia/DinoV2PageSimilarDinos";

const DinoV2PageArticle = dynamic(
  () => import("@/components/encyclopedia/DinoV2PageArticle")
);

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

        <Suspense fallback={
          <div className="border-b-4 pb-3 mb-3 md:pb-5 md:mb-5">
            <div className="h-7 w-40 bg-softGray animate-pulse rounded mx-auto mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-softGray animate-pulse rounded w-full" />
              <div className="h-4 bg-softGray animate-pulse rounded w-[92%]" />
              <div className="h-4 bg-softGray animate-pulse rounded w-[85%]" />
              <div className="h-4 bg-softGray animate-pulse rounded w-[96%]" />
            </div>
          </div>
        }>
          <DinoV2PageArticle article={dino.article} locale={locale} />
        </Suspense>

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
