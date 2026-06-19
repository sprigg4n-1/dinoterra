"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter as useIntlRouter, usePathname as useIntlPathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import logo from "@/images/logo.svg";
import close from "@/images/vectors/close.svg";

const AsideDashboardV2 = () => {
  const t = useTranslations("admin.v2.aside");
  const locale = useLocale();
  const pathname = usePathname();
  const intlPathname = useIntlPathname();
  const intlRouter = useIntlRouter();
  const [isOpen, setIsOpen] = useState(false);

  const NAV = [
    { id: "dinos", label: t("dinos"), href: "/admin/new/dashboard/dinos" },
    { id: "users", label: t("users"), href: "/admin/new/dashboard/users" },
  ];

  const active = (href: string) => pathname.includes(href);

  const linkClass = (href: string) =>
    `block w-full p-3 text-[16px] lg:text-[17px] duration-200 ${
      active(href)
        ? "bg-brightOrange text-white font-semibold lg:text-right"
        : "bg-softGray text-black hover:bg-brightOrange hover:text-white"
    }`;

  const switchLocale = (next: string) => {
    intlRouter.replace(intlPathname, { locale: next });
  };

  const LangSwitcher = () => (
    <div className="flex gap-1 w-full">
      {(["uk", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`flex-1 py-1.5 text-[13px] font-bold uppercase tracking-wide duration-200 ${
            locale === l
              ? "bg-brightOrange text-white"
              : "bg-softGray text-black hover:bg-slateGray hover:text-white"
          }`}
        >
          {l === "uk" ? "УКР" : "ENG"}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-darkPurple py-3 px-2 text-white flex justify-between items-center gap-10 lg:w-[350px] lg:h-screen lg:flex-col lg:justify-normal sticky top-0 left-0 z-30">
      <h2 className="font-bold text-[18px] lg:text-[20px] text-center leading-tight">
        DinoTerra
        <br />
        <span className="text-brightOrange text-[13px] font-normal">
          Admin V2
        </span>
      </h2>

      {/* burger */}
      <button
        className="flex lg:hidden w-8 h-6 flex-col justify-between"
        onClick={() => setIsOpen(true)}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-full h-[3px] bg-white rounded" />
        ))}
      </button>

      {/* mobile menu */}
      <motion.div
        initial={{ translateX: "-100%" }}
        animate={{ translateX: isOpen ? "0" : "-100%" }}
        transition={{ duration: 0.25 }}
        className="absolute top-0 left-0 w-full h-screen lg:hidden px-3 py-3 flex flex-col bg-darkPurple z-50"
      >
        <div className="flex justify-between items-center mb-6">
          <Image
            src={logo}
            width={120}
            height={30}
            alt="logo"
            className="w-[100px] h-auto"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="hover:rotate-90 duration-300"
          >
            <Image src={close} width={28} height={28} alt="close" />
          </button>
        </div>

        <ul className="flex flex-col gap-2 w-full sm:w-1/2 mx-auto">
          {NAV.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={linkClass(item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-2 w-full sm:w-1/2 mx-auto">
          <LangSwitcher />
          <Link
            href="/account"
            className="block w-full p-3 text-[16px] text-center bg-red-400 hover:bg-fieryRed duration-200"
          >
            {t("logout")}
          </Link>
        </div>
      </motion.div>

      {/* desktop nav */}
      <ul className="hidden lg:flex flex-col gap-3 w-full mt-4">
        {NAV.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden lg:flex flex-col gap-2 mt-auto w-full">
        <LangSwitcher />
        <Link
          href="/account"
          className="w-full p-3 text-[16px] text-center bg-red-400 hover:bg-fieryRed duration-200"
        >
          {t("logout")}
        </Link>
      </div>
    </div>
  );
};

export default AsideDashboardV2;
