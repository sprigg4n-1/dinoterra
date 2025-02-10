"use client";

import React, { useEffect, useState } from "react";

import { getDinos } from "@/services/DinoService";
import DinoCard from "@/components/dino/DinoCard";

const DinosListDashboard = () => {
  const [dinos, setDinos] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      const dinosData = await getDinos();

      setDinos(dinosData);
    };

    getData();
  }, []);

  return (
    <div>
      <h2 className="text-[22px] font-semibold">Всі динозаври</h2>
      <div className="flex flex-wrap items-center justify-around gap-5">
        {dinos.length > 0 ? (
          dinos.map((dino: any) => (
            <DinoCard
              key={dino.id}
              link={`/admin/dashboard/dino/${dino.id}`}
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
