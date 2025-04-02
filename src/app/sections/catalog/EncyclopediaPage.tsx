"use client";

import React, { useEffect, useState } from "react";
import { usePagination } from "@mantine/hooks";

import { IDino } from "@/config/types";
import { getDinos } from "@/services/DinoService";

import EncyclopediaFilter from "./EncyclopediaFilter";
import DinoCard from "@/components/dino/DinoCard";
import LoaderComponent from "@/components/LoaderComponent";

const SHOW_LIMIT = 18;

const EncyclopediaPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [dinos, setDinos] = useState<IDino[]>([]);
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
    getDataDinos();
  };

  const onClickReset = () => {
    setDiet("");
    setTypeOfDino("");
    setPeriod("");
    setSearchDino("");
    setPlaceLocation("");
    setIsResetedFilter(true);
  };

  const getDataDinos = async () => {
    setIsLoading(true);
    const dinosData = await getDinos(
      SHOW_LIMIT,
      pagination.active - 1,
      searchDino,
      typeOfDino,
      diet,
      period,
      placeLocation
    );

    setDinos(dinosData.content);
    setTotalPages(dinosData.totalPages);
    setIsLoading(false);
  };

  // use effects
  useEffect(() => {
    getDataDinos();
  }, [pagination.active]);

  useEffect(() => {
    getDataDinos();
  }, []);
  useEffect(() => {
    if (isResetedFilter) {
      getDataDinos();
    }
    setIsResetedFilter(false);
  }, [isResetedFilter]);

  return (
    <div className="px-2 sm:px-5 lg:px-20 flex flex-col items-center">
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

      <div className="flex flex-wrap gap-5 items-center justify-center py-5 lg:py-10">
        {isLoading ? (
          <LoaderComponent />
        ) : (
          dinos.map((dino) => (
            <DinoCard
              key={dino.id}
              dino={dino}
              link={`/encyclopedia/${dino.id}`}
              bgColor="orange"
              border
              textColor="white"
            />
          ))
        )}
      </div>

      <div className="flex gap-2 mb-5 lg:mb-10 px-2">
        {pagination.range.map((page, index) =>
          page === "dots" ? (
            <button key={index} className={`bg-darkPurple text-white h-8 w-8`}>
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
          )
        )}
      </div>
    </div>
  );
};

export default EncyclopediaPage;
