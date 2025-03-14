import React from "react";

const EvolutionaryPeriods = ({
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

export default EvolutionaryPeriods;
