"use client";

import { IDino } from "@/config/types";
import { deleteDino } from "@/services/DinoService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const DinoPageDashboard = ({ dino }: { dino: IDino }) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    await deleteDino(id);
  };

  return (
    <div className="p-5 flex flex-col gap-5 mx-auto items-center justify-center">
      <Link
        href={"/admin/dashboard"}
        className="py-2 px-5 bg-green-200 hover:bg-green-500 duration-300">
        назад
      </Link>
      <div>
        {dino.name} + {dino.id}
      </div>
      <button
        className="py-2 px-5 bg-red-200 hover:bg-red-500 duration-300"
        onClick={(e) => {
          e.preventDefault();
          handleDelete(dino.id);
          router.replace("/admin/dashboard");
        }}>
        Видалити
      </button>
    </div>
  );
};

export default DinoPageDashboard;
