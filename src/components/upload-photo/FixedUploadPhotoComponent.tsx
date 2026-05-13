"use client";

import React, { useEffect, useState } from "react";
import PredictionTopThreeModal from "./PredictionTopThreeModal";

const FixedUploadPhotoComponent = () => {
  const [isOpenModal, setIsOpenModel] = useState<boolean>(false);

  const [imagePath, setImagePath] = useState<string>("");

  const closeModal = () => {
    setImagePath("");
    setIsOpenModel(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePath(reader.result as string);
        setIsOpenModel(true);
      };
      reader.onerror = (error) => {
        console.error("Помилка при читанні файлу:", error);
      };
    }
  };

  return (
    <>
      <label
        htmlFor="fileUploadForDinoImage"
        className="fixed bottom-12 right-12 border-2 border-brightOrange bg-slateGray w-16 h-16 rounded-full cursor-pointer"
      >
        <input
          id="fileUploadForDinoImage"
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </label>
      {isOpenModal && (
        <PredictionTopThreeModal onClose={closeModal} file={imagePath} />
      )}
    </>
  );
};

export default FixedUploadPhotoComponent;
