"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

import close from "@/images/vectors/close.svg";
import logo from "@/images/logo.svg";

const AsideDashboard = () => {
  const [activePage, setActivePage] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  // use effects
  useEffect(() => {
    if (pathname === "/admin/dashboard/dinos") {
      setActivePage("dinos");
    } else if (pathname === "/admin/dashboard/users") {
      setActivePage("users");
    } else if (pathname === "/admin/dashboard/photos") {
      setActivePage("photos");
    }
  }, [pathname]);

  return (
    <div className="bg-darkPurple py-3 px-2 text-white flex justify-between items-center gap-10 lg:w-[350px] lg:h-screen lg:flex-col lg:justify-normal sticky top-0 left-0 z-30">
      <h2 className="font-bold text-[22px] text-center">Адмін панель</h2>

      {/* burger */}
      <button
        className=" flex lg:hidden w-10 h-6 flex-col justify-between"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <span className="w-10 h-1 bg-white"></span>
        <span className="w-10 h-1 bg-white"></span>
        <span className="w-10 h-1 bg-white"></span>
      </button>

      {/* mobile menu */}
      <motion.div
        initial={{
          translateX: "-100%",
        }}
        animate={{
          translateX: isOpen ? "0" : "-100%",
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 w-full h-screen lg:hidden px-2 py-2 flex flex-col bg-darkPurple z-50"
      >
        <div className="relative flex justify-between items-center">
          <Image
            src={logo}
            width={200}
            height={56}
            alt="logo"
            className="w-[120px] h-[30px]"
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
        <ul className="flex flex-col gap-2 w-full sm:w-1/2 mx-auto my-auto">
          <li>
            <Link
              href={"/admin/dashboard/dinos"}
              onClick={() => {
                setActivePage("dinos");
                setIsOpen(false);
              }}
              className={`block w-full p-2 text-[16px] ${
                activePage === "dinos"
                  ? "bg-brightOrange font-semibold text-white"
                  : "text-black bg-softGray"
              }`}
            >
              Динозаври
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/dashboard/users"}
              onClick={() => {
                setActivePage("users");
                setIsOpen(false);
              }}
              className={`block w-full p-2 text-[16px] ${
                activePage === "users"
                  ? " bg-brightOrange font-semibold text-white"
                  : "text-black bg-softGray "
              }`}
            >
              Користувачі
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/dashboard/photos"}
              onClick={() => {
                setActivePage("photos");
                setIsOpen(false);
              }}
              className={`block w-full p-2 text-[16px] ${
                activePage === "photos"
                  ? " bg-brightOrange font-semibold text-white"
                  : "text-black bg-softGray "
              }`}
            >
              Перевірка фото
            </Link>
          </li>

          <li>
            <Link
              href={"/account"}
              onClick={() => setActivePage("users")}
              className={`block mt-auto w-full p-2 text-[18px] text-center bg-red-400 hover:bg-fieryRed duration-300`}
            >
              Вийти
            </Link>
          </li>
        </ul>
      </motion.div>

      {/* desktop menu */}
      <ul className="hidden lg:flex flex-col gap-5 lg:w-full">
        <li>
          <Link
            href={"/admin/dashboard/dinos"}
            onClick={() => setActivePage("dinos")}
            className={`block w-full p-2 text-[18px] ${
              activePage === "dinos"
                ? "text-right bg-brightOrange font-semibold text-white"
                : "text-black bg-softGray text-left"
            }`}
          >
            Динозаври
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/dashboard/users"}
            onClick={() => setActivePage("users")}
            className={`block w-full p-2 text-[18px] ${
              activePage === "users"
                ? " text-right bg-brightOrange font-semibold text-white"
                : "text-black bg-softGray text-left"
            }`}
          >
            Користувачі
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/dashboard/photos"}
            onClick={() => setActivePage("photos")}
            className={`block w-full p-2 text-[18px] ${
              activePage === "photos"
                ? " text-right bg-brightOrange font-semibold text-white"
                : "text-black bg-softGray text-left"
            }`}
          >
            Перевірка фото
          </Link>
        </li>
      </ul>
      <Link
        href={"/account"}
        onClick={() => setActivePage("users")}
        className={`hidden lg:block mt-auto w-full p-2 text-[18px] text-center bg-red-400 hover:bg-fieryRed duration-300`}
      >
        Вийти
      </Link>
    </div>
  );
};

export default AsideDashboard;
