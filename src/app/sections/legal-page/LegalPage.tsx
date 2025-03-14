import SectionMainTitleComponent from "@/components/SectionMainTitleComponent";
import React from "react";

const LegalPage = () => {
  return (
    <div className="px-2 sm:px-5 lg:px-20 py-3 lg:py-5">
      <SectionMainTitleComponent
        title="Поліика конфіденційності"
        firstTextPosition="center"
        titleSize="md"
      />
    </div>
  );
};

export default LegalPage;
