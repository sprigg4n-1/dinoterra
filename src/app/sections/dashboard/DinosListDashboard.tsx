"use client";

import React, { useEffect, useState } from "react";

import { getDinos } from "@/services/DinoService";
import Link from "next/link";

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
      <h2 className="text-[22px] font-semibold mb-2">Всі динозаври</h2>
      <div className="flex flex-col gap-1">
        {dinos.length > 0 ? (
          dinos.map((dino: any) => (
            <Link
              href={`/admin/dashboard/dino/${dino.id}`}
              className="w-full py-2 px-3 bg-darkGray text-white"
              key={dino.id}>
              {dino.name}
            </Link>
          ))
        ) : (
          <span>ні одного динозавра ще немає</span>
        )}
      </div>
    </div>
  );
};

export default DinosListDashboard;
