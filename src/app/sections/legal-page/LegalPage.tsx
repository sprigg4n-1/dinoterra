import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";

const LegalPage = () => {
  return (
    <div className="px-2 sm:px-5 lg:px-20 py-3 lg:py-5">
      <SectionMainTitleComponent
        title="Поліика конфіденційності"
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
