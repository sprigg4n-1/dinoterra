"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import logo from "@/images/logo.svg";
import close from "@/images/vectors/close.svg";

const NAV = [
  { id: "dinos", label: "Динозаври V2", href: "/admin/new/dashboard/dinos" },
  { id: "users", label: "Користувачі", href: "/admin/new/dashboard/users" },
];

const AsideDashboardV2 = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const active = (href: string) => pathname.startsWith(href);

  const linkClass = (href: string) =>
    `block w-full p-3 text-[16px] lg:text-[17px] duration-200 ${
      active(href)
        ? "bg-brightOrange text-white font-semibold lg:text-right"
        : "bg-softGray text-black hover:bg-brightOrange hover:text-white"
    }`;

  return (
    <div className="bg-darkPurple py-3 px-2 text-white flex justify-between items-center gap-10 lg:w-[350px] lg:h-screen lg:flex-col lg:justify-normal sticky top-0 left-0 z-30">
      <h2 className="font-bold text-[18px] lg:text-[20px] text-center leading-tight">
        DinoTerra
        <br />
        <span className="text-brightOrange text-[13px] font-normal">
          Admin V2
        </span>
      </h2>

      {/* burger */}
      <button
        className="flex lg:hidden w-8 h-6 flex-col justify-between"
        onClick={() => setIsOpen(true)}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-full h-[3px] bg-white rounded" />
        ))}
      </button>

      {/* mobile menu */}
      <motion.div
        initial={{ translateX: "-100%" }}
        animate={{ translateX: isOpen ? "0" : "-100%" }}
        transition={{ duration: 0.25 }}
        className="absolute top-0 left-0 w-full h-screen lg:hidden px-3 py-3 flex flex-col bg-darkPurple z-50"
      >
        <div className="flex justify-between items-center mb-6">
          <Image
            src={logo}
            width={120}
            height={30}
            alt="logo"
            className="w-[100px] h-auto"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="hover:rotate-90 duration-300"
          >
            <Image src={close} width={28} height={28} alt="close" />
          </button>
        </div>

        <ul className="flex flex-col gap-2 w-full sm:w-1/2 mx-auto">
          {NAV.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={linkClass(item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="block w-full p-3 text-[14px] bg-slateGray text-white hover:bg-darkGray duration-200"
            >
              ← Стара адмінка
            </Link>
          </li>
          <li>
            <Link
              href="/account"
              className="block w-full p-3 text-[16px] text-center bg-red-400 hover:bg-fieryRed duration-200 mt-auto"
            >
              Вийти
            </Link>
          </li>
        </ul>
      </motion.div>

      {/* desktop nav */}
      <ul className="hidden lg:flex flex-col gap-3 w-full mt-4">
        {NAV.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/admin"
            className="block w-full p-3 text-[14px] bg-[#2a2a3e] text-slateGray hover:text-white duration-200"
          >
            ← Стара адмінка
          </Link>
        </li>
      </ul>

      <Link
        href="/account"
        className="hidden lg:block mt-auto w-full p-3 text-[16px] text-center bg-red-400 hover:bg-fieryRed duration-200"
      >
        Вийти
      </Link>
    </div>
  );
};

export default AsideDashboardV2;
