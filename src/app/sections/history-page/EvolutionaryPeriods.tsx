import TitleComponent from "@/components/TitleComponent";
import React from "react";

const EvolutionaryPeriods = ({
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
            text="Тріасовий період"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Юрський період"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Крейдяний період"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Кліматичні зміни"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Розділення континентів"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Ключові еволюційні інновації"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default EvolutionaryPeriods;
