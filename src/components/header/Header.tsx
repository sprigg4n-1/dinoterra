"use client";

import React, { useEffect } from "react";

import Image from "next/image";
import HeaderList from "../header/HeaderList";
import { useAuthStorage } from "@/hooks/useAuthStorage";

import logo from "@/images/logo.svg";
import Link from "next/link";

const Header = () => {
  const { user } = useAuthStorage();

  return (
    <header className="w-full bg-slateGray text-white py-4 px-2 sm:px-5 xl:px-20 text-center flex justify-between items-center">
      <Image
        src={logo}
        width={400}
        height={112}
        alt="logo"
        className="w-32 lg:w-44 h-auto"
      />

      <HeaderList />
    </header>
  );
};

export default Header;
