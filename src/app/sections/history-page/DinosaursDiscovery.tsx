import TitleComponent from "@/components/TitleComponent";
import React from "react";

const DinosaursDiscovery = ({
  tabId,
  label,
}: {
  tabId: string;
  label: string;
}) => {
  return (
    <div id={tabId}>
      <TitleComponent
        text={label}
        size="md"
        textColor="black"
        additionalClasses="font-bold text-center"
      />
      <div className="flex flex-col gap-10">
        <div>
          <TitleComponent
            text="Перші знахідки"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Річард Оуен"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Кістяні війни"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Гадрозаври-качконоси"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Сучасні методи пошуку"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Найвідоміші знахідки"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default DinosaursDiscovery;
