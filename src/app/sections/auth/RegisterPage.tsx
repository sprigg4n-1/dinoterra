"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { registerUser } from "@/services/SecurityService";

import Image from "next/image";
import Link from "next/link";

import eyeOff from "@/images/vectors/eye-off.svg";
import eyeShow from "@/images/vectors/eye-show.svg";

const RegisterPage = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);

  // functions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Паролі не співпадають");
      return;
    }

    try {
      const response = await registerUser(
        name,
        lastname,
        username,
        password,
        email,
        "USER"
      );

      console.log(response);
      router.replace("/auth/login");
    } catch (error) {
      console.error(`Error with register user: ${error}`);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-auth-bg bg-bottom bg-cover bg-no-repeat relative after:absolute after:w-full after:h-full after:bg-black after:bg-opacity-65 after:backdrop-blur-[2px]">
      <form
        onSubmit={handleSubmit}
        className="bg-brightOrange pb-3 pt-12 px-5 text-white flex flex-col w-full h-fit justify-center md:w-1/2 gap-3 relative z-10"
      >
        <Link
          href={"/auth"}
          className="absolute top-2 left-3 md:-left-3 bg-fieryRed py-1 px-5 shadow-md hover:scale-110 duration-300 cursor-pointer"
        >
          до початку
        </Link>
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0">
          <label className="flex flex-col md:w-[48%]">
            <span className="text-[16px] md:text-[18px] font-semibold">
              Ім'я
            </span>
            <input
              type="text"
              required
              placeholder="Уведіть ім'я"
              className="py-3 px-2 text-[16px] md:text-[18px] border-2 border-softGray focus:outline-none focus:border-darkGray text-darkGray"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col md:w-[48%]">
            <span className="text-[16px] md:text-[18px] font-semibold">
              Фамілія
            </span>
            <input
              type="text"
              required
              placeholder="Уведіть фамілію"
              className="py-3 px-2 text-[16px] md:text-[18px] border-2 border-softGray focus:outline-none focus:border-darkGray text-darkGray"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
        </div>

        <label className="flex flex-col">
          <span className="text-[16px] md:text-[18px] font-semibold">
            Нікнейм
          </span>
          <input
            type="text"
            required
            placeholder="Уведіть нікнейм"
            className="py-3 px-2 text-[16px] md:text-[18px] border-2 border-softGray focus:outline-none focus:border-darkGray text-darkGray"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <span className="text-[16px] md:text-[18px] font-semibold">
            Пошта
          </span>
          <input
            type="text"
            required
            placeholder="Уведіть пошту"
            className="py-3 px-2 text-[16px] md:text-[18px] border-2 border-softGray focus:outline-none focus:border-darkGray text-darkGray"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="relative flex flex-col">
          <span className="text-[16px] md:text-[18px] font-semibold">
            Пароль
          </span>
          <input
            type={`${isShowPassword ? "text" : "password"}`}
            required
            placeholder="Уведіть пароль"
            className="py-3 pl-2 pr-12 text-[16px] md:text-[18px] border-2 border-softGray focus:outline-none focus:border-darkGray text-darkGray"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute right-3 top-1/2 h-3 w-6"
            type="button"
            onClick={() =>
              setIsShowPassword((isShowPassword) => !isShowPassword)
            }
          >
            {isShowPassword ? (
              <Image src={eyeShow} alt="show password" />
            ) : (
              <Image src={eyeOff} alt="not show password" />
            )}
          </button>
        </label>
        <label className="relative flex flex-col">
          <span className="text-[16px] md:text-[18px] font-semibold">
            Пароль
          </span>
          <input
            type={`${isShowConfirmPassword ? "text" : "password"}`}
            required
            placeholder="Уведіть пароль"
            className="py-3 pl-2 pr-12 text-[16px] md:text-[18px] border-2 border-softGray focus:outline-none focus:border-darkGray text-darkGray"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="absolute right-3 top-1/2 h-3 w-6"
            type="button"
            onClick={() =>
              setIsShowConfirmPassword(
                (isShowConfirmPassword) => !isShowConfirmPassword
              )
            }
          >
            {isShowConfirmPassword ? (
              <Image src={eyeShow} alt="show password" />
            ) : (
              <Image src={eyeOff} alt="not show password" />
            )}
          </button>
        </label>
        <button
          type="submit"
          className=" text-white text-[16px] md:text-[18px] py-2 bg-fieryRed bg-opacity-50 hover:bg-opacity-100 duration-300"
        >
          Зареєструватись
        </button>
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center text-[14px] md:text-[16px] border-t-2 border-opacity-30 border-white pt-2">
          <p className="text-white opacity-80">Уже зареєстровані?</p>
          <Link
            href="/auth/login"
            className="text-white hover:underline font-semibold"
          >
            Увійти
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
