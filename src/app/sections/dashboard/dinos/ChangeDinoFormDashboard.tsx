"use client";

import "@mantine/carousel/styles.css";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { deleteDino, getDinoById, getDinos } from "@/services/DinoService";
import {
  addFoundLocation,
  deleteFoundLocation,
} from "@/services/FoundLocationService";
import { addImage, deleteImage } from "@/services/ImageService";

import { IDino, IDinoImages, IDinoFoundLocation } from "@/config/types";

import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";
import LoaderComponent from "@/components/LoaderComponent";
import Image from "next/image";
import DinoForm from "./DinoForm";

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

  const [dinoToChangeImages, setDinoToChangeImages] = useState<IDinoImages[]>();
  const [dinoToChangeLocations, setDinoToChangeLocations] =
    useState<IDinoFoundLocation[]>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const [latitudeLoc, setLatitudeLoc] = useState<number>(0);
  const [longitudeLoc, setLongitudeLoc] = useState<number>(0);
  const [placeLoc, setPlaceLoc] = useState<string>("");

  const [imagePathDino, setImagePathDino] = useState<string>("");

  const [isChangedSomething, setIsChangedSomething] = useState<boolean>(false);

  // functions
  const onHandleChooseDino = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();

    const getData = async () => {
      const dinoById = await getDinoById(id);

      setDinoToChange(dinoById.dino);
      setDinoToChangeImages(dinoById.images);
      setDinoToChangeLocations(dinoById.foundLocations);
    };

    setStep(2);
    getData();
  };

  const onHandleAddFoundLocation = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    await addFoundLocation(
      placeLoc,
      latitudeLoc.toString(),
      longitudeLoc.toString(),
      dinoToChange?._id || "random"
    );

    setTimeout;

    setLatitudeLoc(0);
    setLongitudeLoc(0);
    setPlaceLoc("");

    setIsChangedSomething(true);
  };

  const onHandleDeleteFoundLocation = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();

    await deleteFoundLocation(id);
    setIsChangedSomething(true);
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

  const onHandleAddImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await addImage(imagePathDino, dinoToChange?._id || "random");
    setImagePathDino("");

    setIsChangedSomething(true);
  };

  const onHandleDeleteImage = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();

    await deleteImage(id);
    setIsChangedSomething(true);
  };

  const handleDeleteDino = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteDino(dinoToChange?._id || "random");
    setSearchDino("");
    setStep(1);
  };

  // use effects
  useEffect(() => {
    const getData = async () => {
      const dinosData = await getDinos(1000, 0);

      setDinos(dinosData.dinos);
      setFinalDinos(dinosData.dinos);
    };

    getData();
  }, [dinoToChange]);

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
        const dinosData = await getDinos(1000, 0);

        setDinos(dinosData.dinos);
      };

      getData();
    }
  }, [step]);

  useEffect(() => {
    if (isChangedSomething) {
      const getData = async () => {
        const dinoById = await getDinoById(dinoToChange?._id || "random");

        setDinoToChange(dinoById.dino);
        setDinoToChangeImages(dinoById.images);
        setDinoToChangeLocations(dinoById.foundLocations);
      };

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setIsChangedSomething(false);
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
                }}
              >
                Назад
              </button>
            )}
          </div>
          {step === 1 ? (
            <div className="flex flex-col gap-2">
              {finalDinos.map((dino: IDino) => (
                <button
                  key={dino._id}
                  onClick={(e) => onHandleChooseDino(e, dino._id)}
                  className="text-white w-full bg-darkGray text-left py-2 px-5 hover:opacity-90 duration-300"
                >
                  {dino.latinName} ({dino.name})
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <DinoForm
                dinoToChange={dinoToChange}
                isChangeForm
                onChangeLoading={setIsLoading}
                onChangeDino={setDinoToChange}
              />

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
                      } text-white h-full border-2 py-2 border-transparent cursor-pointer flex items-center justify-center  duration-300`}
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

                  <button
                    className="bg-green-300 block hover:bg-green-500 px-10 h-11 w-full md:w-auto"
                    type="button"
                    onClick={(e) => onHandleAddImage(e)}
                  >
                    Додати
                  </button>
                </div>

                {dinoToChangeImages && dinoToChangeImages.length === 0 ? (
                  <span>Немає картинок</span>
                ) : (
                  <div className="embla">
                    <div
                      className="embla__viewport-dino-images-dashboard"
                      ref={emblaRef}
                    >
                      <div className="embla__container-dino-images-dashboard gap-4">
                        {dinoToChangeImages &&
                          dinoToChangeImages.map((image, i) => (
                            <div
                              key={image._id}
                              className="embla__slide-dino-images-dashboard group relative flex flex-col text-center"
                            >
                              <Image
                                src={image.file ? image.file : imageNotFound}
                                width={800}
                                height={800}
                                alt="dino image"
                                className="w-auto h-60 object-fit border-2 border-brightOrange"
                              />
                              <button
                                type="button"
                                className="absolute hidden group-hover:block cursor-pointer w-full h-full bg-fieryRed bg-opacity-80 text-white"
                                onClick={(e) =>
                                  onHandleDeleteImage(e, image._id)
                                }
                              >
                                Видалити
                              </button>
                              <span className="bg-brightOrange text-white">
                                {i + 1}
                              </span>
                            </div>
                          ))}
                      </div>
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
                    onClick={(e) => onHandleAddFoundLocation(e)}
                  >
                    Додати
                  </button>
                </div>

                {dinoToChangeLocations && dinoToChangeLocations.length === 0 ? (
                  <span>Немає місць</span>
                ) : (
                  <div className="embla">
                    <div
                      className="embla__viewport-dino-found-location-dashboard"
                      ref={emblaRef2}
                    >
                      <div className="embla__container-dino-found-location-dashboard gap-4">
                        {dinoToChangeLocations &&
                          dinoToChangeLocations.map((loc) => (
                            <div
                              key={loc._id}
                              className="embla__slide-dino-found-location-dashboard group relative flex flex-col gap-1 bg-slateGray text-white py-2 px-5"
                            >
                              <button
                                type="button"
                                className="absolute hidden group-hover:block cursor-pointer w-full h-full bg-fieryRed bg-opacity-80 text-white top-0 left-0"
                                onClick={(e) =>
                                  onHandleDeleteFoundLocation(e, loc._id)
                                }
                              >
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
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={(e) => handleDeleteDino(e)}
                className="py-2 px-5 bg-red-400 text-white hover:bg-fieryRed duration-300"
              >
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
