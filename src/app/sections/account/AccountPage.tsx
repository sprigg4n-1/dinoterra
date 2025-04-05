"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStorage } from "@/hooks/useAuthStorage";

import { logoutUser, removeFavoriteDino } from "@/services/SecurityService";
import { getFavoriteDinos } from "@/services/DinoService";

import { IDinoFav } from "@/config/types";

const AccountPage = () => {
  const router = useRouter();

  const { user, clearUser } = useAuthStorage();
  const [dinos, setDinos] = useState<IDinoFav[]>([]);

  const onClickLogout = async () => {
    try {
      await logoutUser();
      clearUser();
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onClickFavDino = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();

    await removeFavoriteDino(id);
  };

  useEffect(() => {
    const fetchDinos = async () => {
      const dinosData = await getFavoriteDinos(user?.id || 0);
      setDinos(dinosData);
    };

    fetchDinos();
  }, [user?.id, dinos]);

  return (
    <div className="px-2 sm:px-5 lg:px-20">
      <button type="button" onClick={onClickLogout}>
        Вийти
      </button>

      <div>
        <p>{user?.id}</p>
        <p>{user?.username}</p>
        <p>{user?.password}</p>
        <p>{user?.lastname}</p>
        <p>{user?.name}</p>
        <p>{user?.role}</p>
      </div>

      <div className="flex flex-col gap-2">
        {dinos.map((dino) => (
          <div className="flex gap-10" key={dino.id}>
            {dino.name}
            <button
              type="button"
              onClick={(e) => onClickFavDino(e, dino.favId)}
              className="text-fieryRed"
            >
              Видалити
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountPage;
