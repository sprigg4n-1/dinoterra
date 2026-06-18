import { getDinoV2ById, getSimilarDinosV2 } from "@/services/DinoV2Service";
import EncyclopediaDinoPageV2 from "@/app/sections/catalog/EncyclopediaDinoPageV2";

const EncyclopediaInfo = async ({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) => {
  const { id, locale } = await params;

  const [data, similarDinos] = await Promise.all([
    getDinoV2ById(id),
    getSimilarDinosV2(id),
  ]);

  return (
    <EncyclopediaDinoPageV2
      dino={data.dino}
      images={data.images ?? []}
      foundLocations={data.foundLocations ?? []}
      similarDinos={similarDinos ?? []}
      locale={locale}
    />
  );
};

export default EncyclopediaInfo;
