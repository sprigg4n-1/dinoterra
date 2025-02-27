"use client";

import React, { useEffect, useState } from "react";

import { getDinos } from "@/services/DinoService";
import DinoCard from "@/components/dino/DinoCard";
import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";
import { IDino } from "@/config/types";

const DinosListDashboard = () => {
  const [dinos, setDinos] = useState<IDino[]>([]);

  useEffect(() => {
    const getData = async () => {
      const dinosData = await getDinos();

      setDinos(dinosData);
    };

    getData();
  }, []);

  return (
    <div>
      <DashboardTitleComponent text="Всі динозаври" />
      <div className="flex flex-wrap items-center justify-around gap-5">
        {dinos.length > 0 ? (
          dinos.map((dino: IDino) => (
            <DinoCard
              border
              bgColor="black"
              textColor="white"
              key={dino.id}
              link={`/admin/dashboard/dinos/${dino.id}`}
              dino={dino}
            />
          ))
        ) : (
          <span className="text-center">ні одного динозавра ще немає</span>
        )}
      </div>
    </div>
  );
};

export default DinosListDashboard;
