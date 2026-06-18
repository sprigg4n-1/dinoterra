import LinkToSourceComponent from "@/components/history/LinkToSourceComponent";
import ParaghraphsComponent from "@/components/history/ParaghraphsComponent";
import TitleComponent from "@/components/TitleComponent";
import { useTranslations } from "next-intl";

const DinosaurExtinction = ({
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
            text={t("history.extinction.kpgExtinction.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.extinction.kpgExtinction.p") as string[]}
              />
              <LinkToSourceComponent
                link="https://ucmp.berkeley.edu/education/events/cowen1b.html"
                text={`${t("history.takenFrom")} University of California, Berkeley`}
              />
            </div>
          </div>
        </div>

        <div>
          <TitleComponent
            text={t("history.extinction.asteroidTheory.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.extinction.asteroidTheory.p1") as string[]}
              />
              <LinkToSourceComponent
                link="https://www.nationalgeographic.com/science/article/mass-extinction"
                text={`${t("history.takenFrom")} National Geographic`}
              />
            </div>
            <div>
              <ParaghraphsComponent
                values={t.raw("history.extinction.asteroidTheory.p2") as string[]}
              />
              <LinkToSourceComponent
                link="https://ucmp.berkeley.edu/education/events/cowen1b.html"
                text={`${t("history.takenFrom")} University of California, Berkeley`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinosaurExtinction;
