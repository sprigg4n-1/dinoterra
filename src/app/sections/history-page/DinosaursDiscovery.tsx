import LinkToSourceComponent from "@/components/history/LinkToSourceComponent";
import ParaghraphsComponent from "@/components/history/ParaghraphsComponent";
import TitleComponent from "@/components/TitleComponent";
import { useTranslations } from "next-intl";

const DinosaursDiscovery = ({
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
            text={t("history.discovery.firstFinds.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.discovery.firstFinds.p") as string[]}
              />
              <LinkToSourceComponent
                link="https://edition.cnn.com/2024/01/01/europe/megalosaurus-first-dinosaur-discovery-scn/index.html"
                text={`${t("history.takenFrom")} CNN`}
              />
            </div>
          </div>
        </div>

        <div>
          <TitleComponent
            text={t("history.discovery.richardOwen.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.discovery.richardOwen.p") as string[]}
              />
              <LinkToSourceComponent
                link="https://www.nhm.ac.uk/our-science/services/library/collections/owen.html"
                text={`${t("history.takenFrom")} Natural History Museum`}
              />
            </div>
          </div>
        </div>

        <div>
          <TitleComponent
            text={t("history.discovery.boneWars.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.discovery.boneWars.p") as string[]}
              />
              <LinkToSourceComponent
                link="https://lenta.ua/kistyani-viyni-abo-chim-zakinchilasya-velika-gonka-za-dinozavrami-47445/"
                text={`${t("history.takenFrom")} Lenta`}
              />
            </div>
          </div>
        </div>

        <div>
          <TitleComponent
            text={t("history.discovery.modernMethods.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.discovery.modernMethods.p") as string[]}
              />
              <LinkToSourceComponent
                link="https://creative-beast.com/how-modern-tools-are-reviving-ancient-dinosaur-worlds/"
                text={`${t("history.takenFrom")} Creative Beast`}
              />
            </div>
          </div>
        </div>

        <div>
          <TitleComponent
            text={t("history.discovery.famousFinds.title")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={t.raw("history.discovery.famousFinds.p") as string[]}
              />
              <LinkToSourceComponent
                link="https://www.finestfossils.co.uk/blog/10-of-the-best-dinosaur-fossils-ever-found/"
                text={`${t("history.takenFrom")} Finest Fossils`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinosaursDiscovery;
