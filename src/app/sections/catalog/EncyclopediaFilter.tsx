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
  placeLocaion,
  setPlaceLocation,
  onClickReset,
  onClickFilterData,
}: {
  typeOfDino: string;
  setTypeOfDino: (value: string) => void;
  diet: string;
  setDiet: (value: string) => void;
  period: string;
  setPeriod: (value: string) => void;
  searchDino: string;
  setSearchDino: (value: string) => void;
  placeLocaion: string;
  setPlaceLocation: (value: string) => void;
  onClickReset: () => void;
  onClickFilterData: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="hidden lg:flex flex-col justify-between w-full p-5 gap-3 items-end bg-slateGray bg-opacity-50">
        <div className="flex w-full gap-5">
          <label className="flex flex-col gap-1 w-1/2">
            <span>Ім'я динозавра</span>
            <input
              className="bg-darkGray text-white block px-1 py-2 h-[43px] border-2 border-transparent focus:outline-none focus:border-brightOrange w-full"
              placeholder="Напишіть ім'я динозавра"
              value={searchDino}
              onChange={(e) => setSearchDino(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1 w-1/2">
            <span>Місце розкопок</span>
            <input
              className="bg-darkGray text-white block px-1 py-2 h-[43px] border-2 border-transparent focus:outline-none focus:border-brightOrange w-full"
              placeholder="Напишіть місце розкопок"
              value={placeLocaion}
              onChange={(e) => setPlaceLocation(e.target.value)}
            />
          </label>
        </div>

        <div className="flex w-full justify-between gap-5">
          <label className="flex flex-col gap-1 w-1/3">
            <span>Тип динозавра</span>
            <select
              value={typeOfDino}
              onChange={(e) => setTypeOfDino(e.target.value)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            >
              <option value="">Виберіть тип</option>
              {Object.entries(dinoTypeLabels).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 w-1/3">
            <span>Харчування:</span>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            >
              <option value="">Виберіть харчування</option>
              {Object.entries(dinoDietLabels).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 w-1/3">
            <span>Період:</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            >
              <option value="">Виберіть період</option>
              {Object.entries(dinoPeriodLabels).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex justify-between w-full">
          <button
            type="button"
            onClick={onClickReset}
            className="py-2 w-[200px] bg-darkPurple bg-opacity-50 text-white hover:bg-opacity-100 duration-300"
          >
            Скинути
          </button>
          <button
            type="button"
            onClick={onClickFilterData}
            className="py-2 w-[200px] bg-brightOrange bg-opacity-50 text-white hover:bg-opacity-100 duration-300"
          >
            Знайти
          </button>
        </div>
      </div>

      <div className="lg:hidden flex mt-5">
        <button
          className="py-2 px-10 bg-darkPurple text-white"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          Фільтри
        </button>
      </div>

      <motion.div
        initial={{
          visibility: "hidden",
          opacity: 0,
        }}
        animate={{
          visibility: isOpen ? "visible" : "hidden",
          opacity: isOpen ? 100 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-screen h-screen lg:hidden flex flex-col bg-slateGray bg-opacity-50 z-50 "
      >
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
          className="relative flex flex-col gap-3 py-14 px-10 w-4/5 bg-darkPurple h-full text-white overflow-y-scroll"
        >
          <button
            className="absolute top-2 right-2 hover:rotate-180 duration-300"
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

          <label className="flex flex-col gap-1">
            <span>Ім'я динозавра</span>

            <input
              className="bg-darkGray text-white block px-1 py-2 h-[43px] border-2 border-transparent focus:outline-none focus:border-brightOrange"
              placeholder="Напишіть ім'я динозавра"
              value={searchDino}
              onChange={(e) => setSearchDino(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span>Місце розкопок</span>
            <input
              className="bg-darkGray text-white block px-1 py-2 h-[43px] border-2 border-transparent focus:outline-none focus:border-brightOrange"
              placeholder="Напишіть місце розкопок"
              value={placeLocaion}
              onChange={(e) => setPlaceLocation(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span>Тип динозавра</span>
            <select
              value={typeOfDino}
              onChange={(e) => setTypeOfDino(e.target.value)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            >
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
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            >
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
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            >
              <option value="">Виберіть період</option>
              {Object.entries(dinoPeriodLabels).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-2 mt-auto">
            <button
              type="button"
              onClick={onClickReset}
              className="py-2 bg-fieryRed bg-opacity-50 text-white hover:bg-opacity-100 duration-300 w-full"
            >
              Скинути
            </button>
            <button
              type="button"
              onClick={onClickFilterData}
              className="py-2 bg-brightOrange bg-opacity-50 text-white hover:bg-opacity-100 duration-300 w-full"
            >
              Знайти
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default EncyclopediaFilter;
