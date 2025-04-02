"use client";

import { getUsers } from "@/services/SecurityService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-darkPurple text-white flex items-center justify-evenly">
      <Link
        className="py-2 w-[250px] text-center rounded-md text-[18px] bg-brightOrange hover:text-brightOrange hover:bg-white duration-300"
        href="/auth/login"
      >
        Вхід
      </Link>
      <Link
        className="py-2 w-[250px] text-center rounded-md text-[18px] bg-brightOrange hover:text-brightOrange hover:bg-white duration-300"
        href="/auth/registration"
      >
        Реєстрація
      </Link>
    </div>
  );
}
