import TitleComponent from "@/components/TitleComponent";
import React from "react";

const DinosaursInCulture = ({
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
            text="Література"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Кінематограф"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Музеї та виставки"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Динозаври в мистецтві"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Популярна культура"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text="Вплив на масову свідомість"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default DinosaursInCulture;
