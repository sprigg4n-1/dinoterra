"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getFavoriteDinos,
  getUserByToken,
  logoutUser,
  removeFavoriteDino,
} from "@/services/SecurityService";

import { IDinoFav, IUser } from "@/config/types";
import { useAuth } from "@/hooks/useAuth";

const AccountPage = () => {
  const { updateAuthStatus } = useAuth();

  const router = useRouter();

  const [user, setUser] = useState<IUser>();
  const [dinos, setDinos] = useState<IDinoFav[]>([]);

  const onClickLogout = async () => {
    try {
      const res = await logoutUser();
      updateAuthStatus(false);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDeleteFavDino = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();

    await removeFavoriteDino(user?.id || 0, id);
  };

  // use effects
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserByToken();
      const dinosData = await getFavoriteDinos(userData.id);
      setDinos(dinosData);
      setUser(userData);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchDinos = async () => {
      const dinosData = await getFavoriteDinos(user?.id || 0);
      setDinos(dinosData);
    };

    fetchDinos();
  }, [dinos]);

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
          <div key={dino.id} className="flex gap-10">
            {dino.name}
            <button
              type="button"
              onClick={(e) => onClickDeleteFavDino(e, dino.id)}
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
