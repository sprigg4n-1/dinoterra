import TitleComponent from "@/components/TitleComponent";
import { useTranslations } from "next-intl";

const DinosaursInCulture = ({
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
            text={t("history.culture.literature")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text={t("history.culture.cinema")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text={t("history.culture.museums")}
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
        </div>
        <div>
          <TitleComponent
            text={t("history.culture.massConsciousness")}
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
