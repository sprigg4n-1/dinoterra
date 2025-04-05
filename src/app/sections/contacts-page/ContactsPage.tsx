import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";
import ContactsForm from "./ContactsForm";

const ContactsPage = () => {
  return (
    <div className="px-2 sm:px-5 lg:px-20 py-3 lg:py-5 h-full flex flex-col">
      <SectionMainTitleComponent
        title="Є питання?"
        firstTextPosition="center"
        titleColor="orange"
        titleSize="md"
        subtitle="заповніть форму та отримайте відповідь"
        subtitleColor="purple"
        subtitleSize="lg"
      />
      <ContactsForm />
    </div>
  );
};

export default ContactsPage;
