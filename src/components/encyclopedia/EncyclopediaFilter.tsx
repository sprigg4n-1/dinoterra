"use client";
import React, { useState } from "react";

import { motion } from "framer-motion";

import {
  dinoDietLabels,
  dinoPeriodLabels,
  dinoTypeLabels,
} from "@/config/types";

import Image from "next/image";
import { useTranslations } from "next-intl";

import close from "@/images/vectors/close.svg";

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
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="hidden lg:flex flex-col justify-between w-full p-5 gap-3 items-end bg-slateGray bg-opacity-50">
        <div className="flex w-full gap-5">
          <label className="flex flex-col gap-1 w-1/2">
            <span>{t("encyclopedia.filter.nameLabel")}</span>
            <input
              className="bg-darkGray text-white block px-1 py-2 h-[43px] border-2 border-transparent focus:outline-none focus:border-brightOrange w-full"
              placeholder={t("encyclopedia.filter.namePlaceholder")}
              value={searchDino}
              onChange={(e) => setSearchDino(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1 w-1/2">
            <span>{t("encyclopedia.filter.siteLabel")}</span>
            <input
              className="bg-darkGray text-white block px-1 py-2 h-[43px] border-2 border-transparent focus:outline-none focus:border-brightOrange w-full"
              placeholder={t("encyclopedia.filter.sitePlaceholder")}
              value={placeLocaion}
              onChange={(e) => setPlaceLocation(e.target.value)}
            />
          </label>
        </div>

        <div className="flex w-full justify-between gap-5">
          <label className="flex flex-col gap-1 w-1/3">
            <span>{t("encyclopedia.filter.typeLabel")}</span>
            <select
              value={typeOfDino}
              onChange={(e) => setTypeOfDino(e.target.value)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            >
              <option value="">{t("encyclopedia.filter.selectType")}</option>
              {Object.keys(dinoTypeLabels).map((key) => (
                <option key={key} value={key}>
                  {t(`encyclopedia.filter.type.${key}`)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 w-1/3">
            <span>{t("encyclopedia.filter.dietLabel")}</span>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            >
              <option value="">{t("encyclopedia.filter.selectDiet")}</option>
              {Object.keys(dinoDietLabels).map((key) => (
                <option key={key} value={key}>
                  {t(`encyclopedia.filter.diet.${key}`)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 w-1/3">
            <span>{t("encyclopedia.filter.periodLabel")}</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            >
              <option value="">{t("encyclopedia.filter.selectPeriod")}</option>
              {Object.keys(dinoPeriodLabels).map((key) => (
                <option key={key} value={key}>
                  {t(`encyclopedia.filter.period.${key}`)}
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
            {t("buttonText.clear")}
          </button>
          <button
            type="button"
            onClick={onClickFilterData}
            className="py-2 w-[200px] bg-brightOrange bg-opacity-50 text-white hover:bg-opacity-100 duration-300"
          >
            {t("buttonText.find")}
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
          {t("map.filters")}
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
            <span>{t("encyclopedia.filter.nameLabel")}</span>
            <input
              className="bg-darkGray text-white block px-1 py-2 h-[43px] border-2 border-transparent focus:outline-none focus:border-brightOrange"
              placeholder={t("encyclopedia.filter.namePlaceholder")}
              value={searchDino}
              onChange={(e) => setSearchDino(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span>{t("encyclopedia.filter.siteLabel")}</span>
            <input
              className="bg-darkGray text-white block px-1 py-2 h-[43px] border-2 border-transparent focus:outline-none focus:border-brightOrange"
              placeholder={t("encyclopedia.filter.sitePlaceholder")}
              value={placeLocaion}
              onChange={(e) => setPlaceLocation(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span>{t("encyclopedia.filter.typeLabel")}</span>
            <select
              value={typeOfDino}
              onChange={(e) => setTypeOfDino(e.target.value)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            >
              <option value="">{t("encyclopedia.filter.selectType")}</option>
              {Object.keys(dinoTypeLabels).map((key) => (
                <option key={key} value={key}>
                  {t(`encyclopedia.filter.type.${key}`)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span>{t("encyclopedia.filter.dietLabel")}</span>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            >
              <option value="">{t("encyclopedia.filter.selectDiet")}</option>
              {Object.keys(dinoDietLabels).map((key) => (
                <option key={key} value={key}>
                  {t(`encyclopedia.filter.diet.${key}`)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span>{t("encyclopedia.filter.periodLabel")}</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            >
              <option value="">{t("encyclopedia.filter.selectPeriod")}</option>
              {Object.keys(dinoPeriodLabels).map((key) => (
                <option key={key} value={key}>
                  {t(`encyclopedia.filter.period.${key}`)}
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
              {t("buttonText.clear")}
            </button>
            <button
              type="button"
              onClick={onClickFilterData}
              className="py-2 bg-brightOrange bg-opacity-50 text-white hover:bg-opacity-100 duration-300 w-full"
            >
              {t("buttonText.find")}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default EncyclopediaFilter;
