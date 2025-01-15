import Link from "next/link";
import React from "react";

type Item = {
  link: string;
  text: string;
  label: string;
};

const HeaderItem = ({
  item,
  activeItem,
  toggleActiveItem,
}: {
  item: Item;
  activeItem: string;
  toggleActiveItem: (newActiveItem: string) => void;
}) => {
  return (
    <Link
      href={item.link}
      className={`text-[22px] border-b-2 p-1 hover:text-white duration-300 ${
        activeItem === item.label
          ? "text-white border-brightOrange"
          : "text-softGray border-transparent"
      }`}
      onClick={() => {
        toggleActiveItem(item.label);
      }}>
      {item.text}
    </Link>
  );
};

export default HeaderItem;
