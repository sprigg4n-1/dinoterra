"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { registerUser } from "@/services/SecurityService";

import Link from "next/link";
import InputComponent from "@/components/form/InputComponent";

const RegisterPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // functions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Паролі не співпадають");
      return;
    }

    const response = await registerUser(
      name,
      lastname,
      username,
      password,
      email,
      "USER"
    );

    console.log(response.success);

    if (!response.success) {
      if (response.message === "User with this username already exists") {
        setErrorMessage("Нікнейм уже зайнятий");
      }

      if (response.message === "User with this email already exists") {
        setErrorMessage("Пошта вже існує, спробуйте іншу");
      }

      return;
    }

    router.replace("/auth/login");
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
        {errorMessage && (
          <p className="text-[14px] md:text-[16px] text-fieryRed font-bold text-center">
            *{errorMessage}
          </p>
        )}
        <div className="flex flex-row justify-between gap-3">
          <InputComponent
            text="Ім'я"
            placeholder="Уведіть ім'я"
            isRequired
            value={name}
            valueOnChange={(e) => setName(e.target.value)}
            customLabelStyles="flex-1"
          />
          <InputComponent
            text="Прізвище"
            placeholder="Уведіть прізвище"
            isRequired
            value={lastname}
            valueOnChange={(e) => setLastname(e.target.value)}
            customLabelStyles="flex-1"
          />
        </div>

        <InputComponent
          text="Нікнейм"
          placeholder="Уведіть нікнейм"
          isRequired
          value={username}
          valueOnChange={(e) => setUsername(e.target.value)}
        />
        <InputComponent
          text="Пошта"
          placeholder="Уведіть пошту"
          isRequired
          value={email}
          type="email"
          valueOnChange={(e) => setEmail(e.target.value)}
        />

        <InputComponent
          text="Пароль"
          placeholder="Уведіть пароль"
          isRequired
          value={password}
          type="password"
          valueOnChange={(e) => setPassword(e.target.value)}
          showPasswordButton
        />
        <InputComponent
          text="Пароль"
          placeholder="Уведіть пароль"
          isRequired
          value={confirmPassword}
          type="password"
          valueOnChange={(e) => setConfirmPassword(e.target.value)}
          showPasswordButton
        />
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
