"use client";

import React, { useState } from "react";

import { registerUser } from "@/services/SecurityService";

import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";
import InputComponent from "@/components/form/InputComponent";

const CreateUserFormDashboard = () => {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // functions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      alert("Паролі не співпадають");
      setErrorMessage("Паролі не співпадають");
      return;
    }

    const response = await registerUser(
      name,
      lastname,
      username,
      password,
      email,
      "ADMIN"
    );

    if (!response.success) {
      if (response.message === "User with this username already exists") {
        alert("Нікнейм уже зайнятий");
        setErrorMessage("Нікнейм уже зайнятий");
      }

      if (response.message === "User with this email already exists") {
        alert("Пошта вже існує, спробуйте іншу");
        setErrorMessage("Пошта вже існує, спробуйте іншу");
      }

      return;
    }

    alert("Успішно зареєстровано!!");

    setName("");
    setLastname("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <DashboardTitleComponent text={"Реєстрація адміна"} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 text-[14px] sm:text-[16px]"
      >
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <InputComponent
            text="Ім'я"
            value={name}
            valueOnChange={(e) => setName(e.target.value)}
            textStyle="small"
            placeholder="Уведіть ім'я"
            isRequired
            colorStyle="black"
            borderColor="transparent"
            customLabelStyles="flex-1"
          />
          <InputComponent
            text="Прізвище"
            value={lastname}
            valueOnChange={(e) => setLastname(e.target.value)}
            textStyle="small"
            placeholder="Уведіть прізвище"
            isRequired
            colorStyle="black"
            borderColor="transparent"
            customLabelStyles="flex-1"
          />
        </div>

        <InputComponent
          text="Нікнейм"
          value={username}
          valueOnChange={(e) => setUsername(e.target.value)}
          textStyle="small"
          placeholder="Уведіть нікнейм"
          isRequired
          colorStyle="black"
          borderColor="transparent"
        />
        <InputComponent
          text="Пошта"
          value={email}
          valueOnChange={(e) => setEmail(e.target.value)}
          textStyle="small"
          placeholder="Уведіть пошту"
          isRequired
          colorStyle="black"
          borderColor="transparent"
          type="email"
        />
        <InputComponent
          text="Пароль"
          value={password}
          valueOnChange={(e) => setPassword(e.target.value)}
          textStyle="small"
          placeholder="Уведіть пароль"
          isRequired
          colorStyle="black"
          borderColor="transparent"
          type="password"
        />
        <InputComponent
          text="Повторіть пароль"
          value={confirmPassword}
          valueOnChange={(e) => setConfirmPassword(e.target.value)}
          textStyle="small"
          placeholder="Уведіть повторно пароль"
          isRequired
          colorStyle="black"
          borderColor="transparent"
          type="password"
        />

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
