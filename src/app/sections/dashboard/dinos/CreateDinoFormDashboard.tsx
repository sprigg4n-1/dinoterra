"use client";

import React, { useState } from "react";
import { v4 } from "uuid";

import { addFoundLocation } from "@/services/FoundLocationService";
import { addImage } from "@/services/ImageService";

import Image from "next/image";
import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";

import close from "@/images/vectors/close.svg";
import InputComponent from "@/components/form/InputComponent";
import DinoForm from "./DinoForm";

export type TDinoFoundLocation = {
  id: string;
  latitude: string;
  longitude: string;
  place: string;
};

export type TDinoImages = {
  id: string;
  imagePath: string;
};

const CreateDinoFormDashboard = () => {
  const [createdDino, setCreatedDino] = useState<any>();
  const [step, setStep] = useState<number>(1);

  const [latitudeLoc, setLatitudeLoc] = useState<number>(0);
  const [longitudeLoc, setLongitudeLoc] = useState<number>(0);
  const [placeLoc, setPlaceLoc] = useState<string>("");

  const [imagePathDino, setImagePathDino] = useState<string>("");

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
    };

    setDinoImages((dinoImages) => [...dinoImages, newDinoImage]);

    setImagePathDino("");
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

  const onHandleCreateDino = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const addLocationAndImage = () => {
      foundLocations.forEach(async (loc) => {
        await addFoundLocation(
          loc.place,
          loc.latitude,
          loc.longitude,
          createdDino._id
        );
      });

      dinoImages.forEach(async (img) => {
        await addImage(img.imagePath, createdDino._id);
      });
    };

    addLocationAndImage();

    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            {/* <h3 className="text-[16px] font-medium sm:text-[20px]">Картики:</h3> */}
            <div className="flex flex-col md:flex-row gap-2">
              <label className="flex flex-col w-full md:w-1/4">
                <span>Обрати картинку</span>
                <label
                  htmlFor="fileUploadForDinoImage"
                  className={`${
                    imagePathDino !== ""
                      ? "bg-brightOrange hover:border-darkGray"
                      : "bg-darkGray hover:border-brightOrange"
                  }  text-white h-full border-2 py-2 border-transparent cursor-pointer flex items-center justify-center duration-300`}
                >
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
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-start">
              <button
                className="bg-green-300 block hover:bg-green-500 px-10 h-10 w-full sm:w-auto"
                type="button"
                onClick={(e) => onHandleAddImage(e)}
              >
                Додати
              </button>
              <div className="flex-1 flex gap-4 flex-wrap bg-slateGray p-2 text-white w-full">
                {dinoImages.length > 0
                  ? dinoImages.map((image, i) => (
                      <div
                        key={image.id}
                        className="bg-brightOrange text-white flex items-center gap-2 py-1 px-2 rounded-xl"
                      >
                        <span>{i}</span>
                        <button
                          className="hover:rotate-90 duration-300"
                          onClick={(e) => onHandleDeleteImage(e, image.id)}
                        >
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
          <DinoForm
            onChangeStep={setStep}
            onChangeCreatedDino={setCreatedDino}
          />
        </div>
      ) : step === 2 ? (
        <div className="flex flex-col gap-5 text-[14px] sm:text-[16px]">
          {/* place on map */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[16px] font-medium sm:text-[20px]">Місця:</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex w-full sm:w-fit justify-between gap-2">
                <InputComponent
                  text="Широта"
                  value={latitudeLoc}
                  valueOnChange={(e) => setLatitudeLoc(+e.target.value)}
                  textStyle="small"
                  type="number"
                  isRequired
                  colorStyle="black"
                  borderColor="transparent"
                  customLabelStyles="flex-1"
                />

                <InputComponent
                  text="Довгота"
                  value={longitudeLoc}
                  valueOnChange={(e) => setLongitudeLoc(+e.target.value)}
                  textStyle="small"
                  type="number"
                  isRequired
                  colorStyle="black"
                  borderColor="transparent"
                  customLabelStyles="flex-1"
                />
              </div>

              <InputComponent
                text="Місце"
                value={placeLoc}
                valueOnChange={(e) => setPlaceLoc(e.target.value)}
                textStyle="small"
                type="number"
                isRequired
                placeholder="Вкажіть місце розташування"
                colorStyle="black"
                borderColor="transparent"
                customLabelStyles="flex-1"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-start">
              <button
                className="bg-green-300 block hover:bg-green-500 px-10 h-10 w-full sm:w-auto"
                type="button"
                onClick={(e) => onHandleAddLocation(e)}
              >
                Додати
              </button>
              <div className="flex-1 flex gap-4 flex-wrap bg-slateGray w-full p-2 text-white">
                {foundLocations.length > 0
                  ? foundLocations.map((loc) => (
                      <div
                        key={loc.id}
                        className="bg-brightOrange text-white flex items-center gap-2 py-1 px-2 rounded-xl"
                      >
                        <span>{loc.place}</span>
                        <button
                          className="hover:rotate-90 duration-300"
                          onClick={(e) => onHandleDeleteLocation(e, loc.id)}
                        >
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
                  className={`${
                    imagePathDino !== ""
                      ? "bg-brightOrange hover:border-darkGray"
                      : "bg-darkGray hover:border-brightOrange"
                  }  text-white h-full border-2 py-2 border-transparent cursor-pointer flex items-center justify-center duration-300`}
                >
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
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-start">
              <button
                className="bg-green-300 block hover:bg-green-500 px-10 h-10 w-full sm:w-auto"
                type="button"
                onClick={(e) => onHandleAddImage(e)}
              >
                Додати
              </button>
              <div className="flex-1 flex gap-4 flex-wrap bg-slateGray p-2 text-white w-full">
                {dinoImages.length > 0
                  ? dinoImages.map((image, i) => (
                      <div
                        key={image.id}
                        className="bg-brightOrange text-white flex items-center gap-2 py-1 px-2 rounded-xl"
                      >
                        <span>{i}</span>
                        <button
                          className="hover:rotate-90 duration-300"
                          onClick={(e) => onHandleDeleteImage(e, image.id)}
                        >
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
            className="w-full sm:w-[200px] py-2 border-2 border-transparent bg-fieryRed text-white text-[16px] sm:text-[18px] hover:border-fieryRed hover:bg-white hover:text-fieryRed duration-300"
          >
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
