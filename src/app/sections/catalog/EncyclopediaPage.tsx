"use client";

import React, { useEffect, useState } from "react";
import {
  IDino,
  EDinoPeriod,
  EDinoDiet,
  EDinoType,
  dinoTypeLabels,
  dinoDietLabels,
  dinoPeriodLabels,
} from "@/config/types";
import { getDinos } from "@/services/DinoService";
import EncyclopediaFilter from "./EncyclopediaFilter";
import DinoCard from "@/components/dino/DinoCard";

const EncyclopediaPage = () => {
  const [dinos, setDinos] = useState<IDino[]>([]);
  const [finalDinos, setFinalDinos] = useState<IDino[]>([]);

  const [typeOfDino, setTypeOfDino] = useState<string>("");
  const [diet, setDiet] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [searchDino, setSearchDino] = useState<string>("");

  // functions
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

  const onClickReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDiet("");
    setTypeOfDino("");
    setPeriod("");
  };

  // use effects
  useEffect(() => {
    const getData = async () => {
      const dinosData = await getDinos();

      setDinos(dinosData);
      setFinalDinos(dinosData);

      console.log(dinosData);
    };

    getData();
  }, []);

  useEffect(() => {
    console.log(typeOfDino, diet, period);
  }, [typeOfDino, diet, period]);

  return (
    <div className="px-2 sm:px-5 lg:px-20 flex flex-col items-center">
      <EncyclopediaFilter
        diet={diet}
        period={period}
        typeOfDino={typeOfDino}
        searchDino={searchDino}
        setDiet={onChangeDiet}
        setPeriod={onChangePeriod}
        setTypeOfDino={onChangeType}
        setSearchDino={onChangeSearchText}
      />

      <div className="flex flex-wrap gap-5 items-center justify-center py-5 lg:py-10">
        {finalDinos.map((dino) => (
          <DinoCard
            key={dino.id}
            dino={dino}
            link={`/encyclopedia/${dino.id}`}
            bgColor="orange"
            border
            textColor="white"
          />
        ))}
      </div>
    </div>
  );
};

export default EncyclopediaPage;
