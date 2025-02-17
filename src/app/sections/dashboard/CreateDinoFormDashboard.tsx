"use client";

import React, { useState } from "react";
import { createDino } from "@/services/DinoService";

import {
  EDinoPeriod,
  EDinoDiet,
  EDinoType,
  dinoTypeLabels,
  dinoDietLabels,
  dinoPeriodLabels,
} from "@/config/types";

import { addFoundLocation } from "@/services/FoundLocationService";
import { addImage } from "@/services/ImageService";

import close from "@/images/vectors/close.svg";
import Image from "next/image";
import { v4 } from "uuid";
import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";

export type TDinoFoundLocation = {
  id: string;
  latitude: string;
  longitude: string;
  place: string;
};

export type TDinoImages = {
  id: string;
  imagePath: string;
  fileName: string;
};

const CreateDinoFormDashboard = () => {
  const [createdDino, setCreatedDino] = useState<any>();
  const [step, setStep] = useState<number>(1);

  const [name, setName] = useState<string>("");
  const [latinName, setLatinName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [typeOfDino, setTypeOfDino] = useState<string>(EDinoType.Unknown);
  const [dinoLength, setDinoLength] = useState<number>(0);
  const [dinoWeight, setDinoWeight] = useState<number>(0);
  const [diet, setDiet] = useState<string>(EDinoDiet.Herbivores);
  const [dietDescription, setDietDescription] = useState<string>("");
  const [period, setPeriod] = useState<string>(EDinoPeriod.Cretaceous);
  const [periodDate, setPeriodDate] = useState<string>("");
  const [periodDescription, setPeriodDescription] = useState<string>("");

  const [latitudeLoc, setLatitudeLoc] = useState<number>(0);
  const [longitudeLoc, setLongitudeLoc] = useState<number>(0);
  const [placeLoc, setPlaceLoc] = useState<string>("");

  const [imagePathDino, setImagePathDino] = useState<string>("");
  const [fileNameDino, setFileNameDino] = useState<string>("");

  const [foundLocations, setFoundLocations] = useState<TDinoFoundLocation[]>(
    []
  );
  const [dinoImages, setDinoImages] = useState<TDinoImages[]>([]);

  // functions
  const onHandleAddLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newFoundLoc: TDinoFoundLocation = {
      id: v4(),
      latitude: latitudeLoc.toString(),
      longitude: longitudeLoc.toString(),
      place: placeLoc,
    };

    setFoundLocations((foundLocations) => [...foundLocations, newFoundLoc]);

    setLatitudeLoc(0);
    setLongitudeLoc(0);
    setPlaceLoc("");
  };

  const onHandleDeleteLocation = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    setFoundLocations((foundLocations) => [
      ...foundLocations.filter((loc) => loc.id !== id),
    ]);
  };

  const onHandleAddImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newDinoImage: TDinoImages = {
      id: v4(),
      imagePath: imagePathDino,
      fileName: fileNameDino,
    };

    setDinoImages((dinoImages) => [...dinoImages, newDinoImage]);

    setImagePathDino("");
    setFileNameDino("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePathDino(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error("Помилка при читанні файлу:", error);
      };
    }
  };

  const onHandleDeleteImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    setDinoImages((dinoImage) => [...dinoImage.filter((img) => img.id !== id)]);
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addDino = async () => {
      const dino = await createDino(
        name,
        latinName,
        description,
        typeOfDino,
        dinoLength,
        dinoWeight,
        diet,
        dietDescription,
        period,
        periodDate,
        periodDescription
      );

      setCreatedDino(dino);
    };

    addDino();
    setStep(2);
  };

  const onHandleCreateDino = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const addLocationAndImage = () => {
      foundLocations.forEach(async (loc) => {
        await addFoundLocation(
          loc.place,
          loc.latitude,
          loc.longitude,
          createdDino.id
        );
      });

      dinoImages.forEach(async (img) => {
        console.log(img.imagePath);
        await addImage(img.imagePath, img.fileName, createdDino.id);
      });
    };

    addLocationAndImage();

    setStep(3);
  };

  const resetForm = () => {
    setName("");
    setLatinName("");
    setDescription("");
    setTypeOfDino(EDinoType.Unknown);
    setDinoWeight(0);
    setDinoLength(0);
    setDiet(EDinoDiet.Herbivores);
    setDietDescription("");
    setPeriod(EDinoPeriod.Cretaceous);
    setPeriodDate("");
    setPeriodDescription("");
  };

  return (
    <>
      <DashboardTitleComponent
        text={
          step === 1
            ? "Створення динозавра"
            : step === 2
            ? "Додавання картинок і локацій"
            : "Кінець"
        }
      />
      {step === 1 ? (
        <form
          onSubmit={(e) => onSubmitForm(e)}
          className="flex flex-col gap-2 text-[14px] sm:text-[16px]">
          {/* name */}
          <label className="flex flex-col gap-2 sm:flex-row">
            <div className="flex flex-col sm:w-1/2">
              <span>Ім'я</span>
              <input
                required
                className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
                type="text"
                value={name}
                placeholder="Напишіть ім'я динозавра"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:w-1/2">
              <span>Ім'я латиною</span>
              <input
                required
                className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
                type="text"
                value={latinName}
                placeholder="Напишіть ім'я динозавра латиною"
                onChange={(e) => setLatinName(e.target.value)}
              />
            </div>
          </label>

          {/* sizes */}
          <label className="flex flex-col gap-2 sm:flex-row">
            <div className="flex flex-col sm:w-1/2">
              <span>Вага динозавра</span>
              <input
                required
                className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
                type="number"
                value={dinoWeight}
                placeholder=""
                onChange={(e) => setDinoWeight(+e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:w-1/2">
              <span>Довжина динозавра</span>
              <input
                required
                className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
                type="number"
                value={dinoLength}
                onChange={(e) => setDinoLength(+e.target.value)}
              />
            </div>
          </label>

          {/* description */}
          <label className="flex flex-col">
            <span>Опис</span>
            <textarea
              required
              className="bg-darkGray text-white resize-none py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange h-[150px]"
              value={description}
              placeholder="Опишіть динозавра"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          {/* type of dino */}
          <label className="flex flex-col gap-1">
            <span>Тип динозавра</span>
            <select
              value={typeOfDino}
              onChange={(e) => setTypeOfDino(e.target.value as EDinoType)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange">
              {Object.entries(dinoTypeLabels).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          {/* diet */}
          <label className="flex flex-col gap-1">
            <span>Опис харчування</span>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value as EDinoDiet)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange">
              {Object.entries(dinoDietLabels).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <textarea
              required
              className="bg-darkGray text-white py-2 px-1 resize-none border-2 border-transparent focus:outline-none focus:border-brightOrange h-[100px]"
              value={dietDescription}
              placeholder="Опишіть харчування"
              onChange={(e) => setDietDescription(e.target.value)}
            />
          </label>

          {/* period */}
          <label className="flex flex-col gap-1">
            <span>Опис періоду</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as EDinoPeriod)}
              className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange">
              {Object.entries(dinoPeriodLabels).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <input
              required
              type="text"
              value={periodDate}
              placeholder="Напишіть дату інснування(68-66 мільйонів років тому)"
              className="bg-darkGray text-white py-2 px-1 resize-none border-2 border-transparent focus:outline-none focus:border-brightOrange"
              onChange={(e) => setPeriodDate(e.target.value)}
            />
            <textarea
              required
              className="bg-darkGray text-white py-2 px-1 resize-none border-2 border-transparent focus:outline-none focus:border-brightOrange h-[100px]"
              value={periodDescription}
              placeholder="Опишіть період існування"
              onChange={(e) => setPeriodDescription(e.target.value)}
            />
          </label>

          {/* buttons */}
          <div className="flex justify-between gap-2">
            <button
              type="submit"
              className="w-[150px] sm:w-[200px] py-2 border-2 border-transparent bg-brightOrange text-white text-[16px] sm:text-[18px] hover:border-brightOrange hover:bg-white hover:text-brightOrange duration-300">
              Створити
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="w-[150px] sm:w-[200px] py-2 border-2 border-transparent bg-fieryRed text-white text-[16px] sm:text-[18px] hover:border-fieryRed hover:bg-white hover:text-fieryRed duration-300">
              Скидання
            </button>
          </div>
        </form>
      ) : step === 2 ? (
        <div className="flex flex-col gap-5 text-[14px] sm:text-[16px]">
          {/* place on map */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[16px] font-medium sm:text-[20px]">Місця:</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex w-full sm:w-fit justify-between sm:gap-2">
                <label className="flex flex-col w-[49%] sm:w-[120px]">
                  <span>Широта</span>
                  <input
                    required
                    className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange text-center"
                    type="number"
                    value={latitudeLoc}
                    onChange={(e) => setLatitudeLoc(+e.target.value)}
                  />
                </label>
                <label className="flex flex-col w-[49%] sm:w-[120px]">
                  <span>Довгота</span>
                  <input
                    required
                    className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange text-center"
                    type="number"
                    value={longitudeLoc}
                    onChange={(e) => setLongitudeLoc(+e.target.value)}
                  />
                </label>
              </div>

              <label className="flex flex-col flex-1">
                <span>Місце</span>
                <input
                  className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
                  type="text"
                  placeholder="Вкажіть місце розташування"
                  value={placeLoc}
                  onChange={(e) => setPlaceLoc(e.target.value)}
                />
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-start">
              <button
                className="bg-green-300 block hover:bg-green-500 px-10 h-10 w-full sm:w-auto"
                type="button"
                onClick={(e) => onHandleAddLocation(e)}>
                Додати
              </button>
              <div className="flex-1 flex gap-4 flex-wrap bg-slateGray w-full p-2 text-white">
                {foundLocations.length > 0
                  ? foundLocations.map((loc) => (
                      <div
                        key={loc.id}
                        className="bg-brightOrange text-white flex items-center gap-2 py-1 px-2 rounded-xl">
                        <span>{loc.place}</span>
                        <button
                          className="hover:rotate-90 duration-300"
                          onClick={(e) => onHandleDeleteLocation(e, loc.id)}>
                          <Image
                            src={close}
                            alt="close"
                            width={20}
                            height={20}
                            className="object-fit"
                          />
                        </button>
                      </div>
                    ))
                  : "Ще не додано локації"}
              </div>
            </div>
          </div>

          {/* photo  */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[16px] font-medium sm:text-[20px]">Картики:</h3>
            <div className="flex flex-col md:flex-row gap-2">
              <label className="flex flex-col w-full md:w-1/4">
                <span>Обрати картинку</span>
                <label
                  htmlFor="fileUploadForDinoImage"
                  className="bg-darkGray text-white h-full border-2 py-2 border-transparent cursor-pointer flex items-center justify-center hover:border-brightOrange duration-300">
                  <span>
                    {imagePathDino === "" ? "Оберіть файл" : "Змінити файл"}
                  </span>
                  <input
                    id="fileUploadForDinoImage"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </label>
              </label>
              <label className="flex flex-col flex-1">
                <span>Назва</span>
                <input
                  className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
                  type="text"
                  placeholder="Вкажіть назву файлу"
                  value={fileNameDino}
                  onChange={(e) => setFileNameDino(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-start">
              <button
                className="bg-green-300 block hover:bg-green-500 px-10 h-10 w-full sm:w-auto"
                type="button"
                onClick={(e) => onHandleAddImage(e)}>
                Додати
              </button>
              <div className="flex-1 flex gap-4 flex-wrap bg-slateGray p-2 text-white w-full">
                {dinoImages.length > 0
                  ? dinoImages.map((image) => (
                      <div
                        key={image.id}
                        className="bg-brightOrange text-white flex items-center gap-2 py-1 px-2 rounded-xl">
                        <span>{image.fileName}</span>
                        <button
                          className="hover:rotate-90 duration-300"
                          onClick={(e) => onHandleDeleteImage(e, image.id)}>
                          <Image
                            src={close}
                            alt="close"
                            width={20}
                            height={20}
                            className="object-fit"
                          />
                        </button>
                      </div>
                    ))
                  : "Ще не додано картинок"}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => onHandleCreateDino(e)}
            className="w-full sm:w-[200px] py-2 border-2 border-transparent bg-fieryRed text-white text-[16px] sm:text-[18px] hover:border-fieryRed hover:bg-white hover:text-fieryRed duration-300">
            Закінчити
          </button>
        </div>
      ) : (
        <span>Ви успішно додали динозавра</span>
      )}
    </>
  );
};

export default CreateDinoFormDashboard;
