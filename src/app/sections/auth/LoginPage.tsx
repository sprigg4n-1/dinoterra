"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { loginUser } from "@/services/SecurityService";

import Link from "next/link";
import InputComponent from "@/components/form/InputComponent";

const LoginPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // functions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await loginUser(username, password);

    if (!response.success) {
      if (response.message === "User not found") {
        setError("Такого користувача не найдено");
      }

      if (response.message === "Invalid password") {
        setError("Не правильний пароль");
      }

      return;
    }

    router.replace("/");
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
        <InputComponent
          text="Нікнейм"
          value={username}
          valueOnChange={(e) => setUsername(e.target.value)}
          isRequired
          placeholder="Уведіть нікнейм"
        />
        <InputComponent
          text="Пароль"
          value={password}
          valueOnChange={(e) => setPassword(e.target.value)}
          isRequired
          placeholder="Уведіть пароль"
          type="password"
          showPasswordButton
        />
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
