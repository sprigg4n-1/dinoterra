"use client";

import React, { useState } from "react";

import eyeOff from "@/images/vectors/eye-off.svg";
import eyeShow from "@/images/vectors/eye-show.svg";
import Image from "next/image";
import { createUser } from "@/services/SecurityService";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
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
      await createUser(name, lastname, username, password, "USER");
      router.replace("/auth/login");
    } catch (error) {
      console.error(`Error with register user: ${error}`);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-darkPurple py-3 px-5 text-white flex flex-col w-1/2 gap-3"
      >
        <label className="flex flex-col">
          <span className="text-[18px] font-semibold">Ім'я</span>
          <input
            type="text"
            required
            placeholder="Уведіть ім'я"
            className="py-3 px-2 text-[16px] border-2 border-softGray focus:outline-none focus:border-brightOrange text-brightOrange"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <span className="text-[18px] font-semibold">Фамілія</span>
          <input
            type="text"
            required
            placeholder="Уведіть фамілію"
            className="py-3 px-2 text-[16px] border-2 border-softGray focus:outline-none focus:border-brightOrange text-brightOrange"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <span className="text-[18px] font-semibold">Нікнейм</span>
          <input
            type="text"
            required
            placeholder="Уведіть нікнейм"
            className="py-3 px-2 text-[16px] border-2 border-softGray focus:outline-none focus:border-brightOrange text-brightOrange"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="relative flex flex-col">
          <span className="text-[18px] font-semibold">Пароль</span>
          <input
            type={`${isShowPassword ? "text" : "password"}`}
            required
            placeholder="Уведіть пароль"
            className="py-3 pl-2 pr-12 text-[16px] border-2 border-softGray focus:outline-none focus:border-brightOrange text-brightOrange"
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
          <span className="text-[18px] font-semibold">Пароль</span>
          <input
            type={`${isShowConfirmPassword ? "text" : "password"}`}
            required
            placeholder="Уведіть пароль"
            className="py-3 pl-2 pr-12 text-[16px] border-2 border-softGray focus:outline-none focus:border-brightOrange text-brightOrange"
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
          className="bg-darkGray w-1/2 mx-auto py-2 text-[18px] font-bold text-white hover:bg-brightOrange duration-300 mt-5"
        >
          Зареєструватись
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
