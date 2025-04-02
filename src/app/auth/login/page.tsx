"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import eyeOff from "@/images/vectors/eye-off.svg";
import eyeShow from "@/images/vectors/eye-show.svg";
import Image from "next/image";

import { loginUser } from "@/services/SecurityService";
import { useAuthStorage } from "@/hooks/useAuthStorage";

const LoginPage = () => {
  const router = useRouter();

  const { saveUser } = useAuthStorage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  // functions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(username, password);
      console.log(response);

      if (response) {
        saveUser(username, password);
        router.replace("/");
      }
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
        <button
          type="submit"
          className="bg-darkGray w-1/2 mx-auto py-2 text-[18px] font-bold text-white hover:bg-brightOrange duration-300 mt-5"
        >
          Увійти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
