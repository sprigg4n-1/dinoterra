"use client";

import React, { useEffect, useState } from "react";

import { getDinos } from "@/services/DinoService";

import { IDino } from "@/config/types";

import DinoCard from "@/components/dino/DinoCard";
import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";

const DinosListDashboard = () => {
  const [dinos, setDinos] = useState<IDino[]>([]);
  const [finalDinos, setFinalDinos] = useState<IDino[]>([]);
  const [searchDino, setSearchDino] = useState<string>("");

  // use effects
  useEffect(() => {
    const getData = async () => {
      const dinosData = await getDinos(1000, 0);

      setDinos(dinosData);
      setFinalDinos(dinosData);
    };

    getData();
  }, []);

  useEffect(() => {
    let searchedDinos = dinos.filter((dino) =>
      dino.latinName.toLowerCase().includes(searchDino.toLowerCase())
    );

    if (searchedDinos.length == 0) {
      searchedDinos = dinos.filter((dino) =>
        dino.name.toLowerCase().includes(searchDino.toLowerCase())
      );
    }

    setFinalDinos(searchedDinos);
  }, [searchDino]);

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <DashboardTitleComponent text="Всі динозаври" />
        <input
          className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange w-1/2"
          placeholder="Напишіть ім'я динозавра"
          value={searchDino}
          onChange={(e) => setSearchDino(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center justify-around gap-5">
        {finalDinos && finalDinos.length > 0 ? (
          finalDinos
            .sort((a, b) =>
              a.latinName.toLowerCase() < b.latinName.toLowerCase() ? -1 : 1
            )
            .map((dino: IDino) => (
              <DinoCard
                border
                bgColor="black"
                textColor="white"
                key={dino._id}
                link={`/admin/dashboard/dinos/${dino._id}`}
                dino={dino}
              />
            ))
        ) : (
          <span className="text-center">ні одного динозавра ще немає</span>
        )}
      </div>
    </>
  );
};

export default DinosListDashboard;
