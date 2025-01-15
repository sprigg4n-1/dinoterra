"use client";

import React, { useState } from "react";
import HeaderItem from "./HeaderItem";

type HeaderItem = {
  link: string;
  text: string;
  label: string;
};

const HEADER_ITEMS: HeaderItem[] = [
  {
    link: "/",
    text: "Домашня",
    label: "home",
  },
  {
    link: "/encyclopedia",
    text: "Енциклопедія",
    label: "ency",
  },
  {
    link: "/chronologie",
    text: "Історія",
    label: "hist",
  },
  {
    link: "/interactive-map",
    text: "Карта",
    label: "imap",
  },
];

const HeaderList = () => {
  const [activeItem, setActiveItem] = useState<string>(HEADER_ITEMS[0].label);

  const toggleActiveItem = (newAcitveItem: string) => {
    setActiveItem(newAcitveItem);
  };

  return (
    <nav className="flex items-center gap-[90px]">
      {HEADER_ITEMS.map((item) => (
        <HeaderItem
          key={item.label}
          item={item}
          activeItem={activeItem}
          toggleActiveItem={toggleActiveItem}
        />
      ))}
    </nav>
  );
};

export default HeaderList;
