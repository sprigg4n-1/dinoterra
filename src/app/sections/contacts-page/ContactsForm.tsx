"use client";

import React, { useState } from "react";

import { WEB3_FORM_API } from "@/config/config";

import Image from "next/image";
import LoaderComponent from "@/components/LoaderComponent";
import Link from "next/link";

import closeImage from "@/images/vectors/close.svg";
import InputComponent from "@/components/form/InputComponent";

const ContactsForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [sending, setSending] = useState<"sending" | "success" | "error" | "">(
    ""
  );
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  // functions
  const onClickSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending("sending");
    setIsOpenModal(true);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3_FORM_API,
        name: name,
        email: email,
        message: message,
      }),
    });

    const result = await response.json();
    if (result.success) {
      setSending("success");
    } else {
      setSending("error");
    }

    setEmail("");
    setName("");
    setMessage("");
  };

  const onClickCloseModal = () => {
    setIsOpenModal(false);
    setSending("");
  };

  return (
    <div className="flex-1 justify-center items-center flex lg:mt-5 w-full">
      <form
        className="w-full flex flex-col gap-2 p-5 lg:w-2/3 lg:mx-auto lg:bg-slateGray lg:bg-opacity-50"
        onSubmit={(e) => onClickSubmitForm(e)}
      >
        <InputComponent
          placeholder="Ім'я"
          value={name}
          valueOnChange={(e) => setName(e.target.value)}
          borderColor="orange"
        />
        <InputComponent
          placeholder="Пошта"
          value={email}
          type="email"
          valueOnChange={(e) => setEmail(e.target.value)}
          borderColor="orange"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none h-[200px] p-2 border-2 border-brightOrange text-[16px] md:text-[18px] focus:outline-none focus:border-darkGray"
          placeholder="Пишіть ваші питання і не тільки"
          required
        />
        <button
          type="submit"
          className="text-[16px] md:text-[18px] sm:w-1/2 sm:mx-auto lg:mx-0 lg:w-[200px] text-center bg-slateGray text-white rounded-lg py-3 hover:bg-darkGray duration-300"
        >
          Відправити
        </button>
      </form>

      {isOpenModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-screen bg-darkGray bg-opacity-80 flex justify-center items-center">
          <div className="relative w-[90%] h-fit lg:w-2/3 bg-slateGray rounded-md py-10 px-5">
            <button
              className="absolute top-3 right-3 w-7 h-7 hover:rotate-90 duration-300"
              onClick={onClickCloseModal}
            >
              <Image
                src={closeImage}
                alt="close"
                width={40}
                height={40}
                className="object-fit"
              />
            </button>

            <div>
              <h2 className="text-center text-white uppercase font-semibold text-[18px] sm:text-[22px]">
                {sending === "sending"
                  ? "Отримано, чекаємо..."
                  : sending === "success"
                  ? "Дякуємо за повідомлення!"
                  : sending === "error"
                  ? "Помилка!"
                  : "Чекаємо..."}
              </h2>
              <p
                className={`text-center ${
                  sending === "success" ? "text-brightOrange" : "text-fieryRed"
                }  text-[14px] sm:text-[16px]`}
              >
                {sending === "success"
                  ? "Ваше повідомлення успішно доставлене, очікуйте відповідь"
                  : sending === "error"
                  ? "Сталась помилка на сервері..."
                  : ""}
              </p>
            </div>

            {sending === "sending" && (
              <div className="flex items-center justify-center mt-20">
                <LoaderComponent pathColor="#fff" />
              </div>
            )}

            {sending === "success" || sending === "error" ? (
              <div className="flex justify-center items-center mt-20">
                <Link
                  href="/"
                  onClick={onClickCloseModal}
                  className="py-2 px-10 bg-darkGray text-white rounded-md text-center text-[14px] sm:text-[18px]"
                >
                  Повернутися на головну
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsForm;
