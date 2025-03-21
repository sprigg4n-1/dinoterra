"use client";

import React, { useEffect, useState } from "react";

import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";
import DinosaursOrigin from "./DinosaursOrigin";
import EvolutionaryPeriods from "./EvolutionaryPeriods";
import DinosaurExtinction from "./DinosaurExtinction";
import DinosaursDiscovery from "./DinosaursDiscovery";
import DinosaursInCulture from "./DinosaursInCulture";
import Link from "next/link";

const sections = [
  { id: "origin", label: "Походження динозаврів" },
  { id: "evolution", label: "Переломні періоди" },
  { id: "extinction", label: "Вимирання динозаврів" },
  { id: "discovery", label: "Відкриття динозаврів" },
  { id: "culture", label: "Динозаври в культурі" },
];

const HistoryPage = () => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="px-2 sm:px-5 lg:px-20 py-3 lg:py-5">
      <SectionMainTitleComponent
        title="Історія динозаврів"
        firstTextPosition="left"
        titleColor="orange"
      />
      <div className="relative py-2 lg:py-5 flex gap-10">
        <nav className="hidden sticky h-fit -left-10 top-[10%] lg:flex flex-col w-[220px]">
          {sections.map(({ id, label }) => (
            <Link
              key={id}
              href={`#${id}`}
              className={`text-center px-5 py-10 transition text-[14px] ${
                activeSection === id
                  ? "text-brightOrange border-r-4 border-brightOrange font-semibold"
                  : "text-darkGray border-r-4 font-normal"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex-1 flex flex-col gap-5 text-[14px] md:text-[16px] lg:text-[18px]">
          <DinosaursOrigin tabId="origin" label={sections[0].label} />
          <EvolutionaryPeriods tabId="evolution" label={sections[1].label} />
          <DinosaurExtinction tabId="extinction" label={sections[2].label} />
          <DinosaursDiscovery tabId="discovery" label={sections[3].label} />
          <DinosaursInCulture tabId="culture" label={sections[4].label} />
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
