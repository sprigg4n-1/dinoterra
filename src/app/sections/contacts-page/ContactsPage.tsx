import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";
import ContactsForm from "./ContactsForm";
import { useTranslations } from "next-intl";

const ContactsPage = () => {
  const t = useTranslations();
  return (
    <div className="px-2 sm:px-5 lg:px-20 py-3 lg:py-5 h-full flex flex-col">
      <SectionMainTitleComponent
        title={t("contacts.title")}
        firstTextPosition="center"
        titleColor="orange"
        titleSize="md"
        subtitle={t("contacts.subtitle")}
        subtitleColor="purple"
        subtitleSize="lg"
      />
      <ContactsForm />
    </div>
  );
};

export default ContactsPage;
