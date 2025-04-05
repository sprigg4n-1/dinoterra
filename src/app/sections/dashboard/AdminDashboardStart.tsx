"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import eyeOff from "@/images/vectors/eye-off.svg";
import eyeShow from "@/images/vectors/eye-show.svg";

const AdminDashboardStart = () => {
  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [login, setLogin] = useState<string>("");

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (login === "admin" && password === "admin") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/");
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-slateGray h-2/3 w-2/3 flex flex-col rounded-lg px-5 py-2">
        <h2 className="text-[22px] font-bold text-darkPurple">
          Вхід до адмін панелі
        </h2>
        <form
          onSubmit={(e) => onSubmitForm(e)}
          className="flex flex-col items-center gap-5 my-auto"
        >
          <label className="flex flex-col w-1/2 text-darkPurple">
            <span className="text-[18px] font-semibold">Логін</span>
            <input
              type="text"
              required
              placeholder="Уведіть логін"
              className="py-3 px-2 text-[16px] border-2 border-softGray focus:outline-none focus:border-brightOrange"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </label>
          <label className="relative flex flex-col w-1/2 text-darkPurple">
            <span className="text-[18px] font-semibold">Пароль</span>
            <input
              type={`${isShowPassword ? "text" : "password"}`}
              required
              placeholder="Уведіть пароль"
              className="py-3 pl-2 pr-12 text-[16px] border-2 border-softGray focus:outline-none focus:border-brightOrange"
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
            className="mt-5 block w-[200px] py-3 bg-white text-brightOrange text-[18px] font-bold hover:bg-brightOrange hover:text-white duration-300"
          >
            Вхід
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboardStart;
