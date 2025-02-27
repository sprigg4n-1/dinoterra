import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";
import Link from "next/link";
import React from "react";

const IntroPage = () => {
  return (
    <div className="lg:min-h-[calc(100vh-72px)] min-h-[calc(100vh-56px)] px-2 lg:px-5 bg-intro-bg bg-bottom bg-cover bg-no-repeat flex flex-col gap-14 lg:gap-20 items-center justify-center">
      <SectionMainTitleComponent
        title="Досліджуйте світ динозаврів"
        subtitle="Відкрийте для себе стародавніх істот за допомогою інтерактивних карт,
          3D-моделей і захоплюючих фактів."
        firstTextPosition="center"
        titleColor="orange"
        subtitleColor="white"
        subtitleWidth={800}
      />

      <Link
        href="/encyclopedia"
        className="lg:hidden block text-[20px] py-1 w-[220px] text-center rounded-xl bg-brightOrange text-white hover:bg-fieryRed duration-300">
        Почати
      </Link>
      <Link
        href="/encyclopedia"
        className="hidden lg:block uppercase py-1 w-[350px] text-[22px] font-semibold text-center rounded-xl bg-brightOrange text-white hover:bg-fieryRed duration-300">
        Почніть дослідження
      </Link>
    </div>
  );
};

export default IntroPage;
