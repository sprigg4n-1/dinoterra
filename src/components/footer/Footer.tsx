import Link from "next/link";
import React from "react";

const SOCIAL_LINKS = [
  { link: "https://t.me/dinoterra_off", title: "Telegram" },
  { link: "https://www.instagram.com/dinoterra_off/", title: "Instagram" },
  { link: "https://x.com/DinoTerraOff", title: "Twitter" },
];

const PAGE_LINKS = [
  { link: "/", title: "Про нас" },
  { link: "/contacts", title: "Контакти" },
  { link: "/legal", title: "Політика конфіденційності" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-softGray text-darkGray mt-auto text-center py-5 px-2 sm:px-5 lg:px-20 flex flex-col gap-5 xl:flex-row xl:justify-between items-center">
      <div className="flex flex-col gap-2 xl:gap-5 xl:flex-row text-[14px] xl:text-[18px] ">
        {PAGE_LINKS.map((link) => (
          <Link
            key={link.title}
            href={link.link}
            className="hover:underline duration-300">
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-2 xl:gap-5 xl:flex-row text-[14px] xl:text-[18px]">
        {SOCIAL_LINKS.map((link) => (
          <Link
            key={link.title}
            href={link.link}
            target="_blank"
            className="hover:underline duration-300">
            {link.title}
          </Link>
        ))}
      </div>
      <span className="text-[14px] xl:text-[18px]">
        © 2025 DinoTerra. Всі права захищені.
      </span>
    </footer>
  );
};

export default Footer;
