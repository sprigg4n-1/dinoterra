import React from "react";

const ParaghraphsComponent = ({ values }: { values: string[] }) => {
  return (
    <div className="flex flex-col gap-1">
      {values.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
};

export default ParaghraphsComponent;
