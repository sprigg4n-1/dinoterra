import { useTranslations } from "next-intl";
import Link from "next/link";

const SOCIAL_LINKS = [
  { link: "https://t.me/dinoterra_off", title: "Telegram" },
  { link: "https://www.instagram.com/dinoterra_off/", title: "Instagram" },
  { link: "https://x.com/DinoTerraOff", title: "Twitter" },
];

const PAGE_LINKS = [
  { link: "/", key: "about" },
  { link: "/contacts", key: "contacts" },
  { link: "/legal", key: "privacyPolicy" },
];

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="w-full bg-softGray text-darkGray mt-auto text-center py-5 px-2 sm:px-5 lg:px-20 flex flex-col gap-5 xl:flex-row xl:justify-between items-center">
      {/* PAGE LINKS */}
      <div className="flex flex-col gap-2 xl:gap-5 xl:flex-row text-[14px] xl:text-[18px]">
        {PAGE_LINKS.map((item) => (
          <Link
            key={item.key}
            href={item.link}
            className="hover:underline duration-300"
          >
            {t(item.key)}
          </Link>
        ))}
      </div>

      {/* SOCIAL LINKS (можеш лишити як є, вони не перекладаються) */}
      <div className="flex flex-col gap-2 xl:gap-5 xl:flex-row text-[14px] xl:text-[18px]">
        {SOCIAL_LINKS.map((item) => (
          <Link
            key={item.title}
            href={item.link}
            target="_blank"
            className="hover:underline duration-300"
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* COPYRIGHT */}
      <span className="text-[14px] xl:text-[18px]">{t("copyright")}</span>
    </footer>
  );
};

export default Footer;
