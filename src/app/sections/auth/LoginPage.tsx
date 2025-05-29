"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

import { loginUser } from "@/services/SecurityService";

import Link from "next/link";
import Image from "next/image";

import eyeOff from "@/images/vectors/eye-off.svg";
import eyeShow from "@/images/vectors/eye-show.svg";

const LoginPage = () => {
  const router = useRouter();

  const { updateAuthStatus, user } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const [error, setError] = useState("");

  // functions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(username, password);

      console.log(response);

      if (response) router.replace("/");
    } catch (error) {
      console.error(`Error with login user: ${error}`);
    }
  };

  // use effects
  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [password, username]);

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
        {error && (
          <p className="text-[14px] md:text-[16px] text-fieryRed font-bold text-center">
            *{error}
          </p>
        )}
        <label className="flex flex-col">
          <span className="text-[16px] md:text-[18px]">Нікнейм</span>
          <input
            type="text"
            required
            placeholder="Уведіть нікнейм"
            className="py-3 px-2 text-[16px] md:text-[18px] border-2 border-softGray focus:outline-none focus:border-darkGray text-darkGray"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="relative flex flex-col">
          <span className="text-[16px] md:text-[18px]">Пароль</span>
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
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <button
            type="submit"
            className=" text-white hover:underline text-[16px] md:text-[18px]"
          >
            Увійти
          </button>

          <button
            type="button"
            className=" text-white hover:underline text-[16px] md:text-[18px]"
          >
            Забули пароль?
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center text-[14px] md:text-[16px] border-t-2 border-opacity-30 border-white pt-2">
          <p className="text-white opacity-80">Не маєте ще акаунта?</p>
          <Link
            href="/auth/registration"
            className="text-white hover:underline font-semibold"
          >
            Зареєструватись
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
