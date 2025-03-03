"use client";

import "@mantine/carousel/styles.css";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import {
  changeDino,
  deleteDino,
  getDinoById,
  getDinos,
} from "@/services/DinoService";
import {
  addFoundLocation,
  deleteFoundLocation,
} from "@/services/FoundLocationService";
import { addImage, deleteImage } from "@/services/ImageService";

import {
  IDino,
  EDinoPeriod,
  EDinoDiet,
  EDinoType,
  dinoTypeLabels,
  dinoDietLabels,
  dinoPeriodLabels,
} from "@/config/types";

import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";
import LoaderComponent from "@/components/LoaderComponent";

import imageNotFound from "@/images/not-found/image-not-found.webp";

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

const ChangeDinoFormDashboard = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: "auto",
  });
  const [emblaRef2, emblaApi2] = useEmblaCarousel({
    loop: false,
    slidesToScroll: "auto",
  });

  const [dinos, setDinos] = useState<IDino[]>([]);
  const [finalDinos, setFinalDinos] = useState<IDino[]>([]);
  const [searchDino, setSearchDino] = useState<string>("");

  const [dinoToChange, setDinoToChange] = useState<IDino>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const [isChangedSomething, setIsChangedSomething] = useState<boolean>(false);

  // functions
  const onHandleChooseDino = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();

    const getData = async () => {
      const dinoById = await getDinoById(id);

      setName(dinoById.name);
      setLatinName(dinoById.latinName);
      setDescription(dinoById.description);
      setTypeOfDino(dinoById.typeOfDino);
      setDinoWeight(dinoById.weight);
      setDinoLength(dinoById.length);
      setDiet(dinoById.diet);
      setDietDescription(dinoById.dietDescription);
      setPeriod(dinoById.period);
      setPeriodDate(dinoById.periodDate);
      setPeriodDescription(dinoById.periodDescription);

      setDinoToChange(dinoById);
    };

    setStep(2);

    getData();
  };

  const onHandleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const changeDinoById = async () => {
      await changeDino(
        dinoToChange?.id || 0,
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
    };

    setTimeout(() => {
      changeDinoById();
      setIsLoading(false);
    }, 1000);
  };

  const onHandleAddFoundLocation = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    setIsChangedSomething(true);

    await addFoundLocation(
      placeLoc,
      latitudeLoc.toString(),
      longitudeLoc.toString(),
      dinoToChange?.id || 0
    );

    setLatitudeLoc(0);
    setLongitudeLoc(0);
    setPlaceLoc("");

    setIsChangedSomething(false);
  };

  const onHandleDeleteFoundLocation = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();

    setIsChangedSomething(true);
    await deleteFoundLocation(id);
    setIsChangedSomething(false);
  };

  const onHandleAddImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsChangedSomething(true);

    await addImage(imagePathDino, fileNameDino, dinoToChange?.id || 0);

    setImagePathDino("");
    setFileNameDino("");

    setIsChangedSomething(false);
  };

  const onHandleDeleteImage = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();

    setIsChangedSomething(true);
    await deleteImage(id);
    setIsChangedSomething(false);
  };

  const handleDeleteDino = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteDino(dinoToChange?.id || 0);
    setStep(1);
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

  const resetForm = () => {
    setName(dinoToChange?.name || "");
    setLatinName(dinoToChange?.latinName || "");
    setDescription(dinoToChange?.description || "");
    setTypeOfDino(dinoToChange?.typeOfDino || EDinoType.Unknown);
    setDinoWeight(dinoToChange?.weight || 0);
    setDinoLength(dinoToChange?.length || 0);
    setDiet(dinoToChange?.diet || EDinoDiet.Herbivores);
    setDietDescription(dinoToChange?.dietDescription || "");
    setPeriod(dinoToChange?.period || EDinoPeriod.Cretaceous);
    setPeriodDate(dinoToChange?.periodDate || "");
    setPeriodDescription(dinoToChange?.periodDescription || "");
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrev2 = useCallback(() => {
    if (emblaApi2) emblaApi2.scrollPrev();
  }, [emblaApi2]);

  const scrollNext2 = useCallback(() => {
    if (emblaApi2) emblaApi2.scrollNext();
  }, [emblaApi2]);

  // use effects
  useEffect(() => {
    const getData = async () => {
      const dinosData = await getDinos();

      setDinos(dinosData);
      setFinalDinos(dinosData);
    };

    getData();
  }, []);

  useEffect(() => {
    let searchedDinos = dinos.filter((dino) =>
      dino.latinName.toLowerCase().includes(searchDino.toLowerCase())
    );

    if (searchedDinos.length == 0) {
      searchedDinos = dinos.filter((dino) =>
        dino.name.toLowerCase().includes(searchDino.toLowerCase())
      );
    }

    setFinalDinos(searchedDinos);
  }, [searchDino]);

  useEffect(() => {
    if (step === 1) {
      const getData = async () => {
        const dinosData = await getDinos();

        setDinos(dinosData);
      };

      getData();
    }
  }, [step]);

  useEffect(() => {
    if (isChangedSomething) {
      console.log(`hello`);
      const getData = async () => {
        const dinoById = await getDinoById(dinoToChange?.id || 0);

        setName(dinoById.name);
        setLatinName(dinoById.latinName);
        setDescription(dinoById.description);
        setTypeOfDino(dinoById.typeOfDino);
        setDinoWeight(dinoById.weight);
        setDinoLength(dinoById.length);
        setDiet(dinoById.diet);
        setDietDescription(dinoById.dietDescription);
        setPeriod(dinoById.period);
        setPeriodDate(dinoById.periodDate);
        setPeriodDescription(dinoById.periodDescription);

        setDinoToChange(dinoById);

        console.log(dinoById.images);
      };

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        getData();
      }, 1000);
    }
  }, [isChangedSomething]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col gap-4 items-center justify-center">
          <LoaderComponent />
          <span className="text-[14px] sm:text-[18px] text-brightOrange font-semibold">
            Робимо зміни
          </span>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 sm:mb-0">
            {step === 1 ? (
              <div className="flex flex-col sm:flex-row items-center justify-between mb-5 w-full">
                <DashboardTitleComponent text="Редагування динозавра" />
                <input
                  className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange w-3/4 sm:w-1/2"
                  placeholder="Напишіть ім'я динозавра"
                  value={searchDino}
                  onChange={(e) => setSearchDino(e.target.value)}
                />
              </div>
            ) : (
              <DashboardTitleComponent text="Редагування динозавра" />
            )}

            {step === 2 && (
              <button
                className="text-slateGray hover:text-slate-600 duration-300 font-bold"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setStep(1);
                }}>
                Назад
              </button>
            )}
          </div>
          {step === 1 ? (
            <div className="flex flex-col gap-2">
              {finalDinos.map((dino: IDino) => (
                <button
                  key={dino.id}
                  onClick={(e) => onHandleChooseDino(e, dino.id)}
                  className="text-white w-full bg-darkGray text-left py-2 px-5 hover:opacity-90 duration-300">
                  {dino.latinName} ({dino.name})
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <form
                onSubmit={(e) => onHandleSubmitForm(e)}
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
                    Змінити
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-[150px] sm:w-[200px] py-2 border-2 border-transparent bg-fieryRed text-white text-[16px] sm:text-[18px] hover:border-fieryRed hover:bg-white hover:text-fieryRed duration-300">
                    Скидання
                  </button>
                </div>
              </form>

              <div className="flex flex-col gap-2">
                <h3 className="text-[16px] font-medium sm:text-[20px]">
                  Фото:
                </h3>

                <div className="flex flex-col md:flex-row gap-2 items-end text-[14px] sm:text-[16px]">
                  <label className="flex flex-col w-full md:w-1/4">
                    <span>Обрати картинку</span>
                    <label
                      htmlFor="fileUploadForDinoImage"
                      className={`${
                        imagePathDino !== ""
                          ? "bg-brightOrange hover:border-darkGray"
                          : "bg-darkGray hover:border-brightOrange"
                      } text-white h-full border-2 py-2 border-transparent cursor-pointer flex items-center justify-center  duration-300`}>
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
                  <label className="flex flex-col w-full flex-1">
                    <span>Назва</span>
                    <input
                      className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
                      type="text"
                      placeholder="Вкажіть назву файлу"
                      value={fileNameDino}
                      onChange={(e) => setFileNameDino(e.target.value)}
                    />
                  </label>

                  <button
                    className="bg-green-300 block hover:bg-green-500 px-10 h-11 w-full md:w-auto"
                    type="button"
                    onClick={(e) => onHandleAddImage(e)}>
                    Додати
                  </button>
                </div>

                {dinoToChange && dinoToChange?.images.length === 0 ? (
                  <span>Немає картинок</span>
                ) : (
                  <div className="embla">
                    <div
                      className="embla__viewport-dino-images-dashboard"
                      ref={emblaRef}>
                      <div className="embla__container-dino-images-dashboard gap-4">
                        {dinoToChange?.images.map((image) => (
                          <div
                            key={image.id}
                            className="embla__slide-dino-images-dashboard group relative flex flex-col text-center">
                            <Image
                              src={
                                image.image
                                  ? `data:image/jpg;base64,${image.image}`
                                  : imageNotFound
                              }
                              width={800}
                              height={800}
                              alt="dino image"
                              className="w-auto h-60 object-fit border-2 border-brightOrange"
                            />
                            <button
                              type="button"
                              className="absolute hidden group-hover:block cursor-pointer w-full h-full bg-fieryRed bg-opacity-80 text-white"
                              onClick={(e) => onHandleDeleteImage(e, image.id)}>
                              Видалити
                            </button>
                            <span className="bg-brightOrange text-white">
                              {image.fileName || "Без назви"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between mt-2">
                      <button
                        className="border-2 border-darkGray rounded-full px-5 hover:bg-darkGray hover:bg-opacity-20 text-[14px] sm:text-[16px]"
                        onClick={scrollPrev}>
                        Попередній
                      </button>
                      <button
                        className="border-2 border-darkGray rounded-full px-5 hover:bg-darkGray hover:bg-opacity-20 text-[14px] sm:text-[16px]"
                        onClick={scrollNext}>
                        Наступний
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-[16px] font-medium sm:text-[20px]">
                  Місця знахідок:
                </h3>

                <div className="flex flex-col sm:flex-row gap-2 items-end text-[14px] sm:text-[16px]">
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

                  <label className="flex flex-col flex-1 w-full">
                    <span>Місце</span>
                    <input
                      className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
                      type="text"
                      placeholder="Вкажіть місце розташування"
                      value={placeLoc}
                      onChange={(e) => setPlaceLoc(e.target.value)}
                    />
                  </label>

                  <button
                    className="bg-green-300 block hover:bg-green-500 px-10 h-11 w-full sm:w-auto"
                    type="button"
                    onClick={(e) => onHandleAddFoundLocation(e)}>
                    Додати
                  </button>
                </div>

                {dinoToChange && dinoToChange?.foundLocations.length === 0 ? (
                  <span>Немає місць</span>
                ) : (
                  <div className="embla">
                    <div
                      className="embla__viewport-dino-found-location-dashboard"
                      ref={emblaRef2}>
                      <div className="embla__container-dino-found-location-dashboard gap-4">
                        {dinoToChange?.foundLocations.map((loc) => (
                          <div
                            key={loc.id}
                            className="embla__slide-dino-found-location-dashboard group relative flex flex-col gap-1 bg-slateGray text-white py-2 px-5">
                            <button
                              type="button"
                              className="absolute hidden group-hover:block cursor-pointer w-full h-full bg-fieryRed bg-opacity-80 text-white top-0 left-0"
                              onClick={(e) =>
                                onHandleDeleteFoundLocation(e, loc.id)
                              }>
                              Видалити
                            </button>
                            <span>
                              Широта: {Number(loc.latitude).toFixed(1)}
                            </span>
                            <span>
                              Довгота: {Number(loc.longitude).toFixed(1)}
                            </span>
                            <span>Місце: {loc.place}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <button
                        className="border-2 border-darkGray rounded-full px-5 hover:bg-darkGray hover:bg-opacity-20 text-[14px] sm:text-[16px]"
                        onClick={scrollPrev2}>
                        Попередній
                      </button>
                      <button
                        className="border-2 border-darkGray rounded-full px-5 hover:bg-darkGray hover:bg-opacity-20 text-[14px] sm:text-[16px]"
                        onClick={scrollNext2}>
                        Наступний
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={(e) => handleDeleteDino(e)}
                className="py-2 px-5 bg-red-400 text-white hover:bg-fieryRed duration-300">
                Видалити динозавра
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ChangeDinoFormDashboard;
