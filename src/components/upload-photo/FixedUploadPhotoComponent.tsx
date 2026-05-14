"use client";

import React, { useEffect, useState } from "react";

import PredictionTopThreeModal from "./PredictionTopThreeModal";
import uploadIcon from "@/images/vectors/upload.svg";

import Image from "next/image";
import { useFileUpload } from "@/hooks/useFileUpload";

const FixedUploadPhotoComponent = () => {
  const { imagePath, handleFileUpload, resetImagePath } = useFileUpload({
    onUpload: () => setIsOpenModel(true),
  });

  const [isOpenModal, setIsOpenModel] = useState<boolean>(false);

  const closeModal = () => {
    resetImagePath();
    setIsOpenModel(false);
  };

  return (
    <>
      <label
        htmlFor="fileUploadForDinoImage"
        className="fixed z-[2] bottom-2 right-2 md:bottom-6 md:right-6 w-12 h-12 md:w-16  md:h-16 border-2 border-brightOrange bg-slateGray rounded-full cursor-pointer flex items-center justify-center"
      >
        <input
          id="fileUploadForDinoImage"
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
        <Image
          src={uploadIcon}
          width={100}
          height={100}
          alt="upload icon"
          className="w-1/2 h-1/2"
        />
      </label>
      {isOpenModal && (
        <PredictionTopThreeModal onClose={closeModal} file={imagePath} />
      )}
    </>
  );
};

export default FixedUploadPhotoComponent;
