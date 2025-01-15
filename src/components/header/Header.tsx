import React from "react";

import Image from "next/image";

import HeaderList from "../header/HeaderList";

import logo from "@/images/logo.svg";

const Header = () => {
  return (
    <div className="w-full bg-slateGray text-white py-4 px-10 text-center flex justify-between items-center">
      <Image src={logo} width={200} height={56} alt="logo" className="" />
      <HeaderList />
    </div>
  );
};

export default Header;
