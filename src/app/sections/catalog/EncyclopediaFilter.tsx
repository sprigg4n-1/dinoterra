"use client";
import React, { useState } from "react";

import {
  dinoDietLabels,
  dinoPeriodLabels,
  dinoTypeLabels,
} from "@/config/types";

import close from "@/images/vectors/close.svg";

import { motion } from "framer-motion";
import Image from "next/image";

const EncyclopediaFilter = ({
  typeOfDino,
  setTypeOfDino,
  diet,
  setDiet,
  period,
  setPeriod,
  searchDino,
  setSearchDino,
}: {
  typeOfDino: string;
  setTypeOfDino: (value: string) => void;
  diet: string;
  setDiet: (value: string) => void;
  period: string;
  setPeriod: (value: string) => void;
  searchDino: string;
  setSearchDino: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="hidden lg:flex justify-between w-full p-5 gap-2 items-end bg-darkPurple bg-opacity-50">
        <label className="flex flex-col gap-1">
          <span>Тип динозавра</span>
          <select
            value={typeOfDino}
            onChange={(e) => setTypeOfDino(e.target.value)}
            className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange">
            <option value="">Виберіть тип</option>
            {Object.entries(dinoTypeLabels).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span>Харчування:</span>
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange">
            <option value="">Виберіть харчування</option>
            {Object.entries(dinoDietLabels).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span>Період:</span>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange">
            <option value="">Виберіть період</option>
            {Object.entries(dinoPeriodLabels).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <input
          className="bg-darkGray text-white block px-1 py-2 h-[43px] border-2 border-transparent focus:outline-none focus:border-brightOrange flex-1"
          placeholder="Напишіть ім'я динозавра"
          value={searchDino}
          onChange={(e) => setSearchDino(e.target.value)}
        />
      </div>

      <div className="lg:hidden flex mt-5">
        <button
          className="py-2 px-10 bg-darkPurple text-white"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}>
          Фільтри
        </button>
      </div>

      <motion.div
        initial={{
          // translateX: "-100%",
          visibility: "hidden",
          opacity: 0,
        }}
        animate={{
          // translateX: isOpen ? "0" : "-100%",
          visibility: isOpen ? "visible" : "hidden",
          opacity: isOpen ? 100 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-screen h-screen lg:hidden flex flex-col bg-darkPurple bg-opacity-50 z-50 ">
        <motion.div
          initial={{
            translateX: "-100%",
            opacity: 0,
          }}
          animate={{
            translateX: isOpen ? "0" : "-100%",
            opacity: isOpen ? 100 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col gap-3 py-14 px-10 w-4/5 bg-darkPurple h-full text-white overflow-y-scroll">
          <button
            className="absolute top-2 right-2 hover:rotate-180 duration-300"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}>
            <Image
              src={close}
              width={100}
              height={100}
              alt="logo"
              className="w-[30px] h-[30px]"
            />
          </button>

          <input
            className="bg-darkGray text-white block px-1 py-2 h-[43px] border-2 border-transparent focus:outline-none focus:border-brightOrange"
            placeholder="Напишіть ім'я динозавра"
            value={searchDino}
            onChange={(e) => setSearchDino(e.target.value)}
          />

          <label className="flex flex-col gap-1">
            <span>Тип динозавра</span>
            <select
              value={typeOfDino}
              onChange={(e) => setTypeOfDino(e.target.value)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange">
              <option value="">Виберіть тип</option>
              {Object.entries(dinoTypeLabels).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span>Харчування:</span>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange">
              <option value="">Виберіть харчування</option>
              {Object.entries(dinoDietLabels).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span>Період:</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange">
              <option value="">Виберіть період</option>
              {Object.entries(dinoPeriodLabels).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </motion.div>
      </motion.div>
    </>
  );
};

export default EncyclopediaFilter;
