import React from "react";

const DinosaursInCulture = ({
  tabId,
  label,
}: {
  tabId: string;
  label: string;
}) => {
  return (
    <div id={tabId} className="h-screen">
      {label}
    </div>
  );
};

export default DinosaursInCulture;
