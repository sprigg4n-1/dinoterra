"use client";

import { useState } from "react";

import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";
import { ABOUT_TABS } from "@/constants/about";
import BaseContainer from "@/components/BaseContainer";

const AboutUsSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  // function
  const onHandleClickChangeTab = (
    e: React.MouseEvent<HTMLButtonElement>,
    newIndex: number,
  ) => {
    e.preventDefault();
    setActiveTab(newIndex);
  };

  return (
    <section className="bg-white py-5 lg:py-10">
      <BaseContainer>
        <SectionMainTitleComponent
          title="Про Нас"
          subtitle="DinoTerra — це ваш головний ресурс для вивчення динозаврів. Пориньте в
        нашу інтерактивну енциклопедію, досліджуйте стародавній світ за
        допомогою детальних карт і дізнайтесь про захоплюючу історію кожного
        виду. Незалежно від того, чи ви студент, викладач чи ентузіаст
        динозаврів, наша платформа пропонує унікальний досвід занурення."
          firstTextPosition="center"
          titleColor="orange"
          subtitleColor="purple"
          subtitleWidth={1600}
        />

        {/* mobile */}
        <div className="lg:hidden flex flex-col gap-5 mt-[50px] ">
          {ABOUT_TABS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center gap-2"
            >
              <h3 className="text-[18px] font-semibold text-brightOrange sm:text-[20px]">
                {item.title}
              </h3>
              <p className="text-darkPurple text-[14px] sm:text-[16px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* pc */}
        <div className="hidden lg:flex flex-col w-full bg-softGray mt-[75px]">
          <div className="flex w-full bg-beige justify-between ">
            {ABOUT_TABS.map((item, i) => (
              <button
                onClick={(e) => onHandleClickChangeTab(e, i)}
                key={item.title}
                className={`${
                  i === activeTab
                    ? "bg-brightOrange text-white"
                    : "bg-transparent text-brightOrange"
                } w-1/4 text-[24px] font-semibold py-1`}
              >
                {item.title}
              </button>
            ))}
          </div>
          {ABOUT_TABS.map((item, i) => (
            <div
              key={item.title}
              className={`${
                i === activeTab ? "flex" : "hidden"
              } flex-col items-center text-center gap-2 py-20 px-24 text-[20px]`}
            >
              {item.text}
            </div>
          ))}
        </div>
      </BaseContainer>
    </section>
  );
};

export default AboutUsSection;
