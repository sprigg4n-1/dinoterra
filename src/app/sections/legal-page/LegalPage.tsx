import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";
import { useTranslations } from "next-intl";

const LegalPage = () => {
  const t = useTranslations();
  return (
    <div className="px-2 sm:px-5 lg:px-20 py-3 lg:py-5">
      <SectionMainTitleComponent
        title={t("legal.title")}
        firstTextPosition="center"
        titleSize="md"
      />

      <p className="text-center text-[16px] sm:text-[20px] font-semibold">
        ...?
      </p>
    </div>
  );
};

export default LegalPage;
