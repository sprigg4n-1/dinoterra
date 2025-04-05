"use client";

import React, { useState } from "react";

import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";

const TABS_TEXT = [
  {
    title: "Наша місія",
    text: "У DinoTerra ми прагнемо розпалити цікавість і поглибити розуміння доісторичного минулого світу. Поєднуючи наукову точність із передовими технологіями, ми створюємо освітній простір для кожного.",
  },
  {
    title: "Чому ми?",
    text: "Залучайтеся до інтерактивних карт, 3D-моделей та динамічних шкал часу.\nОтримуйте доступ до детальних профілів видів та відкривайте захоплюючі історичні контексти.\nКонтент, створений для студентів, педагогів та ентузіастів.",
  },
  {
    title: "Особливості",
    text: "Дізнайтеся про динозаврів як ніколи раніше з детальними профілями видів та захоплюючою візуалізацією.\nПодорожуйте по карті, щоб досліджувати місця знахідок динозаврів у різних регіонах.\nСлідкуйте за хронологією динозаврів, від їх появи до вимирання.",
  },
  {
    title: "Наша історія",
    text: "DinoTerra народилася з любові до динозаврів і бажання поділитися цим захопленням зі світом. Те, що починалося як проста ідея, перетворилося на платформу, створену для того, щоб зробити вивчення динозаврів доступним, інтерактивним і цікавим для всіх.",
  },
];

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  // function
  const onHandleClickChangeTab = (
    e: React.MouseEvent<HTMLButtonElement>,
    newIndex: number
  ) => {
    e.preventDefault();
    setActiveTab(newIndex);
  };

  return (
    <div className="bg-white px-2 sm:px-5 lg:px-20 lg:py-20 py-10">
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
        {TABS_TEXT.map((item) => (
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
          {TABS_TEXT.map((item, i) => (
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
        {TABS_TEXT.map((item, i) => (
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
    </div>
  );
};

export default AboutUsPage;
