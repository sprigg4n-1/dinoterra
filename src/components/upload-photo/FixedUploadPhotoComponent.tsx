"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

import PredictionTopThreeModal from "./PredictionTopThreeModal";
import uploadIcon from "@/images/vectors/upload.svg";

import Image from "next/image";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useMlAvailable } from "@/hooks/useMlAvailable";

const FixedUploadPhotoComponent = () => {
  const { imagePath, handleFileUpload, resetImagePath } = useFileUpload({
    onUpload: () => setIsOpenModal(true),
  });

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const pathname = usePathname();
  const mlAvailable = useMlAvailable();

  // прибираємо локальний префікс (/en, /uk тощо) і нормалізуємо
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  const normalizedPath = pathWithoutLocale === "" ? "/" : pathWithoutLocale;

  const isAccountRoute =
    normalizedPath === "/account" || normalizedPath.startsWith("/account/");

  if (isAccountRoute || mlAvailable === false) return null;

  const closeModal = () => {
    resetImagePath();
    setIsOpenModal(false);
  };

  return (
    <>
      {!isOpenModal && (
        <label
          htmlFor="fileUploadForDinoImage"
          className="fixed z-[2] bottom-2 right-2 md:bottom-6 md:right-6 w-12 h-12 md:w-16  md:h-16 border-2 border-brightOrange bg-slateGray opacity-50 hover:opacity-100 transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center"
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
      )}

      {isOpenModal && (
        <PredictionTopThreeModal onClose={closeModal} file={imagePath} />
      )}
    </>
  );
};

export default FixedUploadPhotoComponent;
