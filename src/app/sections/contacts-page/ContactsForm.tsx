"use client";

import React, { useState } from "react";

import Image from "next/image";

import formPhoto from "@/images/contacts/form-photo-removebg-preview.png";

const ContactsForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const onClickSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Name: " + name);
    console.log("Email: " + name);
    console.log("Message: " + name);
    setEmail("");
    setName("");
    setMessage("");
  };
  return (
    <div className="flex items-center justify-center lg:mt-5">
      <form
        className="flex-1 flex flex-col gap-2 p-5 lg:bg-[#f1f1f1] h-fit lg:rounded-xl"
        onSubmit={(e) => onClickSubmitForm(e)}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Ім'я"
          className="p-2 border-2 border-brightOrange text-[14px] md:text-[16px]"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Пошта"
          className="p-2 border-2 border-brightOrange text-[14px] md:text-[16px]"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none h-[200px] p-2 border-2 rounded-md border-brightOrange text-[14px] md:text-[16px]"
          placeholder="Текст що ви хочете відправити"
          required
        />
        <button
          type="submit"
          className="text-[16px] md:text-[18px] sm:w-1/2 sm:mx-auto lg:mx-0 lg:w-[200px] text-center bg-slateGray text-white rounded-lg py-3 hover:bg-darkGray duration-300">
          Відправити
        </button>
      </form>
      <div className="hidden lg:block object-fill w-auto h-auto overflow-hidden">
        <Image
          src={formPhoto}
          alt="form photo"
          width={2000}
          height={2000}
          className="h-full w-full scale-150"
        />
      </div>
    </div>
  );
};

export default ContactsForm;
