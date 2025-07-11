"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

import { getUserProfilePhoto } from "@/services/SecurityService";

import { motion } from "framer-motion";

import Link from "next/link";
import HeaderItem from "./HeaderItem";
import Image from "next/image";

import close from "@/images/vectors/close.svg";
import logo from "@/images/logo.svg";

import avatar from "@/images/avatar/avatar.jpg";
import { IUserImages } from "@/config/types";

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
  const { isAuthenticated, user } = useAuth();
  const pathname = usePathname();

  const [activeItem, setActiveItem] = useState<string>(HEADER_ITEMS[0].label);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [profilePhoto, setProfilePhoto] = useState<IUserImages | null>(null);

  const toggleActiveItem = (newAcitveItem: string) => {
    setActiveItem(newAcitveItem);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const fetchData = async () => {
    if (user) {
      const { image } = await getUserProfilePhoto(user._id);
      setProfilePhoto(image);
    }
  };

  // use effects
  useEffect(() => {
    const correctPathhname = pathname.split("/").slice(0, 2).join("/");

    const item = HEADER_ITEMS.find((item) => item.link === correctPathhname);

    setActiveItem(item?.label || "non-active");
  }, [pathname]);

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [profilePhoto]);

  return (
    <>
      {/* pc navigation */}
      <nav className="hidden lg:flex items-center gap-[50px]">
        {HEADER_ITEMS.map((item) => (
          <HeaderItem
            key={item.label}
            item={item}
            activeItem={activeItem}
            toggleActiveItem={toggleActiveItem}
          />
        ))}
        {isAuthenticated ? (
          <Link
            className="hidden lg:block w-10 h-10 rounded-full bg-white hover:bg-brightOrange duration-300"
            href={"/account"}
          >
            <Image
              src={profilePhoto ? profilePhoto.file : avatar}
              width={1600}
              height={1600}
              className="w-10 h-10 object-cover rounded-full hover:scale-105 duration-300 cursor-pointer"
              alt="dino image"
            />
          </Link>
        ) : (
          <Link
            className="hidden lg:block text-[20px] p-1 text-white hover:text-brightOrange duration-300"
            href={"/auth"}
          >
            Вхід
          </Link>
        )}
      </nav>

      {/* mobile navigation */}
      <button
        className="flex lg:hidden w-10 h-6 flex-col justify-between"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <span className="w-10 h-1 bg-white"></span>
        <span className="w-10 h-1 bg-white"></span>
        <span className="w-10 h-1 bg-white"></span>
      </button>

      <motion.div
        initial={{
          translateX: "-100%",
        }}
        animate={{
          translateX: isOpen ? "0" : "-100%",
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 w-full h-screen lg:hidden px-2 py-3 flex flex-col gap-10 bg-slateGray z-50"
      >
        <div className="relative flex justify-between items-center">
          <Image
            src={logo}
            width={400}
            height={112}
            alt="logo"
            className="w-32 h-auto"
          />
          <button
            className="hover:rotate-180 duration-300"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            <Image
              src={close}
              width={100}
              height={100}
              alt="logo"
              className="w-[30px] h-[30px]"
            />
          </button>
        </div>
        <nav className="flex flex-col items-center gap-5 my-auto">
          {HEADER_ITEMS.map((item) => (
            <HeaderItem
              key={item.label}
              item={item}
              activeItem={activeItem}
              toggleActiveItem={toggleActiveItem}
            />
          ))}
          {isAuthenticated ? (
            <Link
              className="w-10 h-10 rounded-full bg-white hover:bg-brightOrange duration-300"
              href={"/account"}
              onClick={() => setIsOpen(false)}
            >
              <Image
                src={profilePhoto ? profilePhoto.file : avatar}
                width={1600}
                height={1600}
                className="w-10 h-10 object-cover rounded-full hover:scale-105 duration-300 cursor-pointer"
                alt="dino image"
              />
            </Link>
          ) : (
            <Link
              className="text-[20px] p-1 text-white hover:text-brightOrange duration-300"
              href={"/auth"}
            >
              Вхід
            </Link>
          )}
        </nav>
      </motion.div>
    </>
  );
};

export default HeaderList;
