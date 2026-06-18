"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

import {
  deleteUserProfilePhoto,
  getFavoriteDinosV2,
  getUserProfilePhoto,
  logoutUser,
  removeFavoriteDinoV2,
  uploadUserProfilePhoto,
} from "@/services/SecurityService";

import { IDinoV2Fav, IUserImages } from "@/config/types";

import Image from "next/image";
import Link from "next/link";

import avatar from "@/images/avatar/avatar.jpg";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useLocale, useTranslations } from "next-intl";

const AccountPage = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { imagePath, handleFileUpload, resetImagePath } = useFileUpload();

  const [emblaRef] = useEmblaCarousel({ loop: false });
  const router = useRouter();

  const { updateAuthStatus, user } = useAuth();

  const [profilePhoto, setProfilePhoto] = useState<IUserImages | null>(null);
  const [favoriteDinosData, setFavoriteDinosData] = useState<IDinoV2Fav[]>([]);

  const onClickLogout = async () => {
    try {
      await logoutUser();
      updateAuthStatus(false);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDeleteFavDino = async (
    e: React.MouseEvent<HTMLButtonElement>,
    dinoId: string,
  ) => {
    e.preventDefault();
    await removeFavoriteDinoV2(user?._id || "random", dinoId);
    if (user) {
      const data = await getFavoriteDinosV2(user._id);
      setFavoriteDinosData(data ?? []);
    }
  };

  const onHandleAddImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (user) {
      const { image } = await uploadUserProfilePhoto(user._id, imagePath);
      setProfilePhoto(image);
      resetImagePath();
    }
  };

  const onClickResetPhoto = async () => {
    if (profilePhoto) {
      await deleteUserProfilePhoto(profilePhoto._id);
      setProfilePhoto(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const { image } = await getUserProfilePhoto(user._id);
        setProfilePhoto(image);

        const dinosData = await getFavoriteDinosV2(user._id);
        setFavoriteDinosData(dinosData ?? []);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="px-2 md:px-5 lg:px-20 pb-3 lg:pb-5 flex flex-col h-full gap-10 md:gap-14">
      <div className="flex flex-col items-center lg:flex-row lg:items-start gap-3 lg:gap-10 bg-softGray py-3 px-5">
        <div className="flex flex-col gap-2 w-fit items-center">
          <label
            htmlFor="fileUploadForDinoImage"
            className="group relative cursor-pointer rounded-full overflow-hidden"
          >
            <Image
              src={profilePhoto ? profilePhoto.file : avatar}
              width={1600}
              height={1600}
              className="w-36 h-36 object-cover rounded-full"
              alt="dino image"
            />
            <div className="absolute top-0 left-0 flex justify-center items-center text-center opacity-0 bg-white bg-opacity-60 w-full h-full group-hover:opacity-100 duration-300">
              {t("account.selectPhoto")}
            </div>
            <input
              id="fileUploadForDinoImage"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </label>
          {imagePath && (
            <button
              type="button"
              className="text-[14px] lg:text-[16px] text-brightOrange hover:text-black"
              onClick={onHandleAddImage}
            >
              {t("account.confirmChange")}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1 lg:text-[18px] items-center lg:items-start text-darkGray">
          <p className="text-[16px] lg:text-[20px] font-semibold text-black">
            <span className="hidden lg:inline-block">{t("account.usernameLabel")}</span>{" "}
            {user?.username}
          </p>
          <div className="flex flex-row lg:flex-col gap-1">
            <p>
              <span className="hidden lg:inline-block">{t("account.nameLabel")}</span> {user?.name}
            </p>
            <p>
              <span className="hidden lg:inline-block">{t("account.surnameLabel")}</span>{" "}
              {user?.lastname}
            </p>
          </div>
          <p>
            <span className="hidden lg:inline-block">{t("account.emailLabel")}</span> {user?.email}
          </p>
        </div>

        <div className="lg:ml-auto flex flex-col gap-2">
          {user?.role === "ADMIN" && (
            <Link
              href={`/${locale}/admin/new`}
              className="text-[14px] lg:text-[16px] bg-darkPurple py-1 px-5 text-white hover:bg-opacity-80 duration-300 text-center"
            >
              {t("account.adminPanel")}
            </Link>
          )}
          {profilePhoto && (
            <button
              className="text-[14px] lg:text-[16px] bg-darkGray py-1 px-5 text-white hover:bg-opacity-80 duration-300"
              type="button"
              onClick={onClickResetPhoto}
            >
              {t("account.resetPhoto")}
            </button>
          )}
          <button
            className="mt-auto text-[14px] lg:text-[16px] bg-fieryRed py-1 px-5 text-white hover:bg-opacity-80 duration-300"
            type="button"
            onClick={onClickLogout}
          >
            {t("buttonText.logout")}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-[20px] lg:text-[24px] font-bold text-brightOrange text-center">
          {t("account.favoriteDinos")}
        </h3>

        {favoriteDinosData.length > 0 ? (
          <div className="embla">
            <div className="embla__viewport-fav-dino" ref={emblaRef}>
              <div className="embla__container-fav-dino gap-5">
                {favoriteDinosData.map((favDino) => (
                  <div
                    key={favDino.dino._id}
                    className="embla__slide-fav-dino"
                  >
                    <Link
                      href={`/${locale}/encyclopedia/${favDino.dino._id}`}
                      className="bg-darkGray text-white text-center py-1 font-medium text-[14px] lg:text-[18px] block hover:bg-slateGray duration-300"
                    >
                      {locale === "en" ? favDino.dino.name.en : favDino.dino.name.uk}
                    </Link>
                    <Image
                      src={favDino.image ? favDino.image.file : avatar}
                      className="w-auto h-[200px] lg:h-[300px] object-fill"
                      width={1600}
                      height={1600}
                      alt="dino image"
                    />
                    <button
                      type="button"
                      onClick={(e) => onClickDeleteFavDino(e, favDino.dino._id)}
                      className="bg-fieryRed text-white w-full py-1 font-semibold hover:opacity-80 duration-300"
                    >
                      {t("buttonText.delete")}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full text-center">
            <p className="text-[16px] lg:text-[20px] text-darkGray">
              {t("account.noFavDinos")}
            </p>
            <p className="text-[16px] md:text-[20px] text-darkGray">
              {t("account.goTo")}{" "}
              <Link
                className="text-fieryRed font-medium"
                href={`/${locale}/encyclopedia`}
              >
                {t("account.encyclopediaLink")}
              </Link>{" "}
              {t("account.toAddDino")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
