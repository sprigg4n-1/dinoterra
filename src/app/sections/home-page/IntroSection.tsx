import { useTranslations } from "next-intl";

import BaseContainer from "@/components/BaseContainer";
import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";
import Link from "next/link";

const IntroSection = () => {
  const t = useTranslations();

  return (
    <section className="bg-intro-bg bg-bottom bg-cover bg-no-repeat">
      <BaseContainer>
        <div className="lg:min-h-[calc(100vh-72px)] min-h-[calc(100vh-56px)] flex flex-col gap-14 lg:gap-20 items-center justify-center">
          <SectionMainTitleComponent
            title={t("home.intro.title")}
            subtitle={t("home.intro.subtitle")}
            firstTextPosition="center"
            titleColor="orange"
            subtitleColor="white"
            subtitleWidth={800}
          />

          <Link
            href="/encyclopedia"
            className="lg:hidden block text-[20px] py-2 px-10 text-center rounded-xl bg-brightOrange text-white hover:bg-fieryRed duration-300"
          >
            {t("buttonText.start")}
          </Link>
          <Link
            href="/encyclopedia"
            className="hidden lg:block uppercase py-2 px-10 text-[22px] font-semibold text-center rounded-xl bg-brightOrange text-white hover:bg-fieryRed duration-300"
          >
            {t("buttonText.startExploring")}
          </Link>
        </div>
      </BaseContainer>
    </section>
  );
};

export default IntroSection;
