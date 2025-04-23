"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getFoundLocations } from "@/services/FoundLocationService";
import { getDinoById } from "@/services/DinoService";

import { dinoPeriodLabels, IDino, IDinoFoundLocation } from "@/config/types";

import { Map, Marker } from "@vis.gl/react-maplibre";
import Image from "next/image";
import Link from "next/link";

import close from "@/images/vectors/close.svg";
import imageNotFound from "@/images/not-found/image-not-found.webp";

const MapPage = () => {
  const [locations, setLocations] = useState<IDinoFoundLocation[]>([]);
  const [hoveredLocation, setHoveredLocation] =
    useState<IDinoFoundLocation | null>(null);
  const [locationDino, setLocationDino] = useState<IDino | null>(null);

  const [searchLocation, setSearchLocation] = useState<string>("");
  const [period, setPeriod] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isReseted, setIsReseted] = useState<boolean>(false);

  // functions
  const onChangeSearchLocation = (value: string) => {
    setSearchLocation(value);
  };

  const onChangePeriod = (value: string) => {
    setPeriod(value);
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getLocs();
  };

  const onClickResetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPeriod("");
    setSearchLocation("");
    setIsReseted(true);
  };

  const getLocs = async () => {
    const locsData = await getFoundLocations(searchLocation, period);

    setLocations(locsData);
  };

  // use effects
  useEffect(() => {
    getLocs();
  }, []);

  useEffect(() => {
    if (isReseted === true) {
      getLocs();
    }
    setIsReseted(false);
  }, [isReseted]);

  useEffect(() => {
    const getLocationDino = async () => {
      if (!hoveredLocation) return;
      const dinoData = await getDinoById(hoveredLocation.dino_id);
      console.log(dinoData);
      setLocationDino(dinoData);
    };
    getLocationDino();
  }, [hoveredLocation]);

  return (
    <div className="relative h-full min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-72px)] flex">
      <form
        onSubmit={(e) => onSubmitForm(e)}
        className="hidden md:flex md:flex-col h-full w-[400px] bg-slateGray bg-opacity-50 py-2 px-5 gap-5"
      >
        <label className="flex flex-col gap-1">
          <span>Місце знахідки</span>
          <input
            className="bg-darkGray text-white block px-1 py-2 h-[43px] border-2 border-transparent focus:outline-none focus:border-brightOrange w-full"
            placeholder="Місце знахідки"
            value={searchLocation}
            onChange={(e) => onChangeSearchLocation(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span>Період:</span>
          <select
            value={period}
            onChange={(e) => onChangePeriod(e.target.value)}
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

        <button
          type="submit"
          className="py-2 bg-brightOrange bg-opacity-50 text-white hover:bg-opacity-100 duration-300 mt-auto"
        >
          Знайти
        </button>
        <button
          type="button"
          onClick={(e) => onClickResetForm(e)}
          className="py-2 bg-fieryRed bg-opacity-50 text-white hover:bg-opacity-100 duration-300"
        >
          Очистити
        </button>
      </form>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className="absolute md:hidden z-20 bg-darkPurple text-white font-semibold py-2 px-10 text-[16px] top-3 left-1/2 -translate-x-1/2"
      >
        Фільтри
      </button>

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
        className="fixed top-0 left-0 w-screen h-screen md:hidden flex flex-col bg-slateGray bg-opacity-50 z-50 "
      >
        <motion.form
          initial={{
            translateX: "-100%",
            opacity: 0,
          }}
          animate={{
            translateX: isOpen ? "0" : "-100%",
            opacity: isOpen ? 100 : 0,
          }}
          transition={{ duration: 0.5 }}
          onSubmit={(e) => onSubmitForm(e)}
          className="relative flex flex-col gap-3 py-14 px-5 w-4/5 bg-darkPurple h-full text-white overflow-y-scroll"
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
            <span>Місце знахідки</span>
            <input
              className="bg-darkGray text-white block px-1 py-2 h-[43px] border-2 border-transparent focus:outline-none focus:border-brightOrange w-full"
              placeholder="Місце знахідки"
              value={searchLocation}
              onChange={(e) => onChangeSearchLocation(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span>Період:</span>
            <select
              value={period}
              onChange={(e) => onChangePeriod(e.target.value)}
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

          <button
            type="submit"
            className="py-2 bg-brightOrange bg-opacity-50 text-white hover:bg-opacity-100 duration-300 mt-auto"
          >
            Знайти
          </button>
          <button
            type="button"
            onClick={(e) => onClickResetForm(e)}
            className="py-2 bg-fieryRed bg-opacity-50 text-white hover:bg-opacity-100 duration-300"
          >
            Очистити
          </button>
        </motion.form>
      </motion.div>

      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        dragRotate={false}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      >
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            longitude={loc.longitude}
            latitude={loc.latitude}
            color={"red"}
            onClick={() => setHoveredLocation(loc)}
          />
        ))}

        {hoveredLocation && (
          <div className="absolute w-[90%] h-fit max-h-[90%] md:h-fit md:min-h-[100px] md:w-[350px] bg-darkGray top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-between gap-1 items-start py-3 px-2">
              <p className="text-white text-[14px] md:text-[16px]">
                📍 {hoveredLocation.place}
              </p>
              <button className="hover:rotate-90 duration-300">
                <Image
                  src={close}
                  width={20}
                  height={20}
                  alt="close"
                  onClick={() => setHoveredLocation(null)}
                />
              </button>
            </div>

            <div className="w-full text-center flex flex-col">
              <Image
                src={
                  locationDino && locationDino?.images.length > 0
                    ? `data:image/jpg;base64,${locationDino?.images[0].image}`
                    : imageNotFound
                }
                width={4000}
                height={4000}
                alt="dino photo"
                onClick={() => setHoveredLocation(null)}
                className="object-fit"
              />

              <Link
                href={`/encyclopedia/${hoveredLocation.dino_id}`}
                className=" text-white text-[14px] md:text-[18px] text-center w-full hover:bg-brightOrange py-2"
              >
                {locationDino?.name}
              </Link>
            </div>
          </div>
        )}
      </Map>
    </div>
  );
};

export default MapPage;
