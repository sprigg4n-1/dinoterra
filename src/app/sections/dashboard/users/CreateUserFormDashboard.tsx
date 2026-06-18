"use client";

import React, { useState } from "react";

import { registerUser } from "@/services/SecurityService";

import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";
import InputComponent from "@/components/form/InputComponent";
import { useTranslations } from "next-intl";

const CreateUserFormDashboard = () => {
  const t = useTranslations("admin.users");
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
      alert(t("passwordsMismatch"));
      setErrorMessage(t("passwordsMismatch"));
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
        alert(t("usernameTaken"));
        setErrorMessage(t("usernameTaken"));
      }

      if (response.message === "User with this email already exists") {
        alert(t("emailExists"));
        setErrorMessage(t("emailExists"));
      }

      return;
    }

    alert(t("registerSuccess"));

    setName("");
    setLastname("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <DashboardTitleComponent text={t("createTitle")} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 text-[14px] sm:text-[16px]"
      >
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <InputComponent
            text={t("nameLabel")}
            value={name}
            valueOnChange={(e) => setName(e.target.value)}
            textStyle="small"
            placeholder={t("namePlaceholder")}
            isRequired
            colorStyle="black"
            borderColor="transparent"
            customLabelStyles="flex-1"
          />
          <InputComponent
            text={t("lastnameLabel")}
            value={lastname}
            valueOnChange={(e) => setLastname(e.target.value)}
            textStyle="small"
            placeholder={t("lastnamePlaceholder")}
            isRequired
            colorStyle="black"
            borderColor="transparent"
            customLabelStyles="flex-1"
          />
        </div>

        <InputComponent
          text={t("usernameLabel")}
          value={username}
          valueOnChange={(e) => setUsername(e.target.value)}
          textStyle="small"
          placeholder={t("usernamePlaceholder")}
          isRequired
          colorStyle="black"
          borderColor="transparent"
        />
        <InputComponent
          text={t("emailLabel")}
          value={email}
          valueOnChange={(e) => setEmail(e.target.value)}
          textStyle="small"
          placeholder={t("emailPlaceholder")}
          isRequired
          colorStyle="black"
          borderColor="transparent"
          type="email"
        />
        <InputComponent
          text={t("passwordLabel")}
          value={password}
          valueOnChange={(e) => setPassword(e.target.value)}
          textStyle="small"
          placeholder={t("passwordPlaceholder")}
          isRequired
          colorStyle="black"
          borderColor="transparent"
          type="password"
        />
        <InputComponent
          text={t("confirmPasswordLabel")}
          value={confirmPassword}
          valueOnChange={(e) => setConfirmPassword(e.target.value)}
          textStyle="small"
          placeholder={t("confirmPasswordPlaceholder")}
          isRequired
          colorStyle="black"
          borderColor="transparent"
          type="password"
        />

        <button
          type="submit"
          className=" text-white text-[16px] md:text-[18px] py-2 bg-brightOrange bg-opacity-50 hover:bg-opacity-100 duration-300"
        >
          {t("register")}
        </button>
      </form>
    </div>
  );
};

export default CreateUserFormDashboard;
