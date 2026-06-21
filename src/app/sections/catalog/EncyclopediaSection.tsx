"use client";

import { useEffect, useState } from "react";
import { usePagination } from "@mantine/hooks";

import { getDinosV2 } from "@/services/DinoV2Service";
import { IDino, IDinoV2 } from "@/config/types";

import EncyclopediaFilter from "@/components/encyclopedia/EncyclopediaFilter";
import DinoCard from "@/components/dino/DinoCard";
import LoaderComponent from "@/components/LoaderComponent";
import BaseContainer from "@/components/BaseContainer";
import { useTranslations } from "next-intl";

const SHOW_LIMIT = 12;

const adaptV2ToCard = (dino: IDinoV2): IDino =>
  ({ ...dino, image: dino.mainImage ?? undefined }) as unknown as IDino;

const EncyclopediaSection = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [dinos, setDinos] = useState<IDinoV2[]>([]);
  const [countOfDino, setCountOfDino] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [typeOfDino, setTypeOfDino] = useState<string>("");
  const [diet, setDiet] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [searchDino, setSearchDino] = useState<string>("");
  const [placeLocation, setPlaceLocation] = useState<string>("");

  const [isResetedFilter, setIsResetedFilter] = useState<boolean>(false);

  const pagination = usePagination({
    total: totalPages,
    initialPage: 1,
    siblings: 1,
    boundaries: 1,
  });

  // functions
  const onUpdatePage = (page: number) => {
    pagination.setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onChangeDiet = (value: string) => {
    setDiet(value);
  };

  const onChangeType = (value: string) => {
    setTypeOfDino(value);
  };

  const onChangePeriod = (value: string) => {
    setPeriod(value);
  };

  const onChangeSearchText = (value: string) => {
    setSearchDino(value);
  };

  const onChangPlaceLocation = (value: string) => {
    setPlaceLocation(value);
  };

  const onClickFilterData = () => {
    getDataDinos(true);
  };

  const onClickReset = () => {
    setDiet("");
    setTypeOfDino("");
    setPeriod("");
    setSearchDino("");
    setPlaceLocation("");
    setIsResetedFilter(true);
  };

  const getDataDinos = async (isFiltered: boolean) => {
    setIsLoading(true);

    const dinosData = await getDinosV2(
      pagination.active > 0 ? pagination.active - 1 : pagination.active,
      SHOW_LIMIT,
      searchDino,
      typeOfDino,
      diet,
      period,
    );

    if (isFiltered) {
      pagination.setPage(1);
    }

    setDinos(dinosData?.dinos ?? []);
    setCountOfDino(dinosData?.count ?? 0);
    setTotalPages(Math.ceil((dinosData?.count ?? 0) / SHOW_LIMIT));
    setIsLoading(false);
  };

  // use effects
  useEffect(() => {
    getDataDinos(false);
  }, [pagination.active]);

  useEffect(() => {
    getDataDinos(false);
  }, []);

  useEffect(() => {
    if (isResetedFilter) {
      getDataDinos(true);
    }
    setIsResetedFilter(false);
  }, [isResetedFilter]);

  return (
    <section>
      <BaseContainer>
        <div className="flex flex-col items-center pb-5 md:pb-10">
          <EncyclopediaFilter
            diet={diet}
            period={period}
            typeOfDino={typeOfDino}
            searchDino={searchDino}
            placeLocaion={placeLocation}
            setDiet={onChangeDiet}
            setPeriod={onChangePeriod}
            setTypeOfDino={onChangeType}
            setSearchDino={onChangeSearchText}
            setPlaceLocation={onChangPlaceLocation}
            onClickReset={onClickReset}
            onClickFilterData={onClickFilterData}
          />

          <p className="text-lg mt-3 md:mt-5 text-darkGray">
            {t("encyclopedia.totalSpecies", { count: countOfDino })}
          </p>

          <div className="flex flex-wrap gap-5 items-stretch justify-center my-2 md:my-5">
            {isLoading ? (
              <LoaderComponent />
            ) : dinos && dinos.length > 0 ? (
              dinos.map((dino) => (
                <DinoCard
                  key={dino._id}
                  dino={adaptV2ToCard(dino)}
                  link={`/encyclopedia/${dino._id}`}
                  bgColor="orange"
                  border
                  textColor="white"
                />
              ))
            ) : (
              <span className="text-center text-[14px] md:text-[16px]">
                {t("encyclopedia.notFound")}
              </span>
            )}
          </div>

          <div className="flex gap-2 px-2">
            {pagination.range.map((page, index) =>
              page === "dots" ? (
                <button
                  key={index}
                  className={`bg-darkPurple text-white h-8 w-8`}
                >
                  ...
                </button>
              ) : (
                <button
                  key={index}
                  className={`${
                    pagination.active === page
                      ? "bg-brightOrange"
                      : "bg-darkPurple hover:bg-opacity-70 duration-200"
                  } text-white h-8 w-8 р `}
                  onClick={() => onUpdatePage(+page)}
                >
                  {page}
                </button>
              ),
            )}
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default EncyclopediaSection;
