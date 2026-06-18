import LinkToSourceComponent from "@/components/history/LinkToSourceComponent";
import ParaghraphsComponent from "@/components/history/ParaghraphsComponent";
import TitleComponent from "@/components/TitleComponent";
import { useTranslations } from "next-intl";

const DinosaursOrigin = ({
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
            text={t("history.origin.timeOfAppearance.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.origin.timeOfAppearance.p1") as string[]}
              />
              <LinkToSourceComponent
                link="https://nashformat.ua/pdf-preview/dynozavry.-novyj-poglyad-941430"
                text={`${t("history.takenFrom")} NashFormat`}
              />
            </div>
            <div>
              <ParaghraphsComponent
                values={t.raw("history.origin.timeOfAppearance.p2") as string[]}
              />
              <LinkToSourceComponent
                link="https://www.livescience.com/3945-history-dinosaurs.html"
                text={`${t("history.takenFrom")} livescience`}
              />
            </div>
          </div>
        </div>

        <div>
          <TitleComponent
            text={t("history.origin.evolutionaryRoots.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.origin.evolutionaryRoots.p") as string[]}
              />
              <LinkToSourceComponent
                link="https://www.reuters.com/science/where-did-dinosaurs-first-evolve-scientists-have-an-answer-2025-01-23/"
                text={`${t("history.takenFrom")} reuters`}
              />
            </div>
          </div>
        </div>

        <div>
          <TitleComponent
            text={t("history.origin.firstAncestors.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.origin.firstAncestors.p") as string[]}
              />
              <LinkToSourceComponent
                link="https://www.nhm.ac.uk/discover/where-did-dinosaurs-come-from.html"
                text={`${t("history.takenFrom")} NHM`}
              />
            </div>
          </div>
        </div>

        <div>
          <TitleComponent
            text={t("history.origin.basicAdaptations.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.origin.basicAdaptations.p") as string[]}
              />
              <LinkToSourceComponent
                link="https://www.reuters.com/science/where-did-dinosaurs-first-evolve-scientists-have-an-answer-2025-01-23/"
                text={`${t("history.takenFrom")} reuters`}
              />
            </div>
          </div>
        </div>

        <div>
          <TitleComponent
            text={t("history.origin.firstTrueDinos.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.origin.firstTrueDinos.p") as string[]}
              />
              <LinkToSourceComponent
                link="https://www.smithsonianmag.com/science-nature/scientists-discover-oldest-known-dinosaur-152807497/"
                text={`${t("history.takenFrom")} Smithsonian`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinosaursOrigin;
