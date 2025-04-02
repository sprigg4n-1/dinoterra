"use client";

import React, { useState } from "react";

import { useAuthStorage } from "@/hooks/useAuthStorage";
import { logoutUser } from "@/services/SecurityService";
import { useRouter } from "next/navigation";

const AccountPage = () => {
  const router = useRouter();
  const { clearUser } = useAuthStorage();

  const onClickLogout = async () => {
    try {
      await logoutUser();
      clearUser();
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-2 sm:px-5 lg:px-20">
      <button type="button" onClick={onClickLogout}>
        Вийти
      </button>
    </div>
  );
};

export default AccountPage;
