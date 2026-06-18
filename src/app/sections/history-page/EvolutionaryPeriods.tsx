import LinkToSourceComponent from "@/components/history/LinkToSourceComponent";
import ParaghraphsComponent from "@/components/history/ParaghraphsComponent";
import TitleComponent from "@/components/TitleComponent";
import { useTranslations } from "next-intl";

const EvolutionaryPeriods = ({
  tabId,
  label,
}: {
  tabId: string;
  label: string;
}) => {
  const t = useTranslations();
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
            text={t("history.periods.triassic.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.periods.triassic.p") as string[]}
              />
              <LinkToSourceComponent
                link="https://www.nationalgeographic.com/science/article/triassic"
                text={`${t("history.takenFrom")} National Geographic`}
              />
            </div>
          </div>
        </div>

        <div>
          <TitleComponent
            text={t("history.periods.jurassic.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.periods.jurassic.p") as string[]}
              />
              <LinkToSourceComponent
                link="https://www.nationalgeographic.com/science/article/jurassic"
                text={`${t("history.takenFrom")} National Geographic`}
              />
            </div>
          </div>
        </div>

        <div>
          <TitleComponent
            text={t("history.periods.cretaceous.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.periods.cretaceous.p") as string[]}
              />
              <LinkToSourceComponent
                link="https://www.nationalgeographic.com/science/article/cretaceous"
                text={`${t("history.takenFrom")} National Geographic`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvolutionaryPeriods;
