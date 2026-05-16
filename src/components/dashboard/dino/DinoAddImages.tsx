import { v4 } from "uuid";
import { createPortal } from "react-dom";

import { useFileUpload } from "@/hooks/useFileUpload";

import { TDinoImages } from "./DinoForm";

import Image from "next/image";

import close from "@/images/vectors/close.svg";
import { useState } from "react";
import DinoMlPredictionModal from "./DinoMlPredictionModal";

interface Props {
  dinoImages: TDinoImages[];
  setDinoImages: React.Dispatch<React.SetStateAction<TDinoImages[]>>;
}

const DinoAddImages = ({ dinoImages, setDinoImages }: Props) => {
  const { imagePath, handleFileUpload, resetImagePath } = useFileUpload({
    onUpload: () => setIsOpenModal(true),
  });

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    resetImagePath();
    setIsOpenModal(false);
  };

  const onHandleAddImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newDinoImage: TDinoImages = {
      id: v4(),
      imagePath: imagePath,
    };

    setDinoImages((dinoImages) => [...dinoImages, newDinoImage]);
    setIsOpenModal(false);
    resetImagePath();
  };

  const onHandleDeleteImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.preventDefault();
    setDinoImages((dinoImage) => [...dinoImage.filter((img) => img.id !== id)]);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row gap-2">
          <label className="flex flex-col w-full md:w-1/4">
            <span>Обрати картинку</span>
            <label
              htmlFor="fileUploadForDinoImage"
              className={`${
                imagePath !== ""
                  ? "bg-brightOrange hover:border-darkGray"
                  : "bg-darkGray hover:border-brightOrange"
              }  text-white h-full border-2 py-2 border-transparent cursor-pointer flex items-center justify-center duration-300`}
            >
              <span>{imagePath === "" ? "Оберіть файл" : "Змінити файл"}</span>
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
      {isOpenModal &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <DinoMlPredictionModal
              onClose={closeModal}
              addImages={onHandleAddImage}
              file={imagePath}
            />
          </div>,
          document.body,
        )}
    </>
  );
};

export default DinoAddImages;
