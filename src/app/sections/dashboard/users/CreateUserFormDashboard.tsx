"use client";

import React, { useState } from "react";

import { registerUser } from "@/services/SecurityService";

import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";

const CreateUserFormDashboard = () => {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        "ADMIN"
      );

      console.log(response);

      alert("Успішно зареєстровано!!");

      setName("");
      setLastname("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(`Error with register user: ${error}`);
    }
  };

  return (
    <div>
      <DashboardTitleComponent text={"Реєстрація адміна"} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 text-[14px] sm:text-[16px]"
      >
        <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
          <label className="flex flex-col md:w-1/2">
            <span>Ім'я</span>
            <input
              type="text"
              required
              placeholder="Уведіть ім'я"
              className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col md:w-[48%]">
            <span>Фамілія</span>
            <input
              type="text"
              required
              placeholder="Уведіть фамілію"
              className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
        </div>

        <label className="flex flex-col">
          <span>Нікнейм</span>
          <input
            type="text"
            required
            placeholder="Уведіть нікнейм"
            className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          <span>Пошта</span>
          <input
            type="email"
            required
            placeholder="Уведіть пошту"
            className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="relative flex flex-col">
          <span>Пароль</span>
          <input
            type={"password"}
            required
            placeholder="Уведіть пароль"
            className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="relative flex flex-col">
          <span>Повторіть пароль</span>
          <input
            type={"password"}
            required
            placeholder="Уведіть повторно пароль"
            className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className=" text-white text-[16px] md:text-[18px] py-2 bg-brightOrange bg-opacity-50 hover:bg-opacity-100 duration-300"
        >
          Зареєструвати
        </button>
      </form>
    </div>
  );
};

export default CreateUserFormDashboard;
