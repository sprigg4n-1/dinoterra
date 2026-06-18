"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { useState } from "react";

const LocaleSwitcher = () => {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-2 relative">
      <button
        className="border-[2px] border-white text-white text-[16px] bg-brightOrange px-4 py-1 rounded-[12px]  uppercase font-semibold"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {locale}
      </button>
      <div
        className={`flex-col items-center justify-center absolute z-10 gap-1 top-[calc(100%+2px)] bg-softGray rounded-[12px] border-brightOrange border-[3px] w-full  py-1 ${isOpen ? "flex" : "hidden"}`}
      >
        {routing.locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`text-[16px] uppercase font-semibold duration-300 ${
              locale === loc ? "text-brightOrange" : "text-white"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
