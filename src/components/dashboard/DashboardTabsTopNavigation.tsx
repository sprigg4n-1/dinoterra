import React from "react";

interface Props {
  items: readonly { readonly id: string; readonly text: string }[];
  activeItemId: string;
  setActive: (value: string) => void;
}

const DashboardTabsTopNavigation = ({
  items,
  activeItemId,
  setActive,
}: Props) => {
  return (
    <div className="flex flex-col gap-1 w-full text-white sm:flex-row lg:sticky top-0 left-0 z-10 lg:bg-white lg:py-2 lg:px-1">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            setActive(item.id);
          }}
          className={`py-2 px-1 text-[16px] xl:text-[18px] w-full ${
            item.id === activeItemId ? "bg-brightOrange" : "bg-darkPurple"
          }`}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
};

export default DashboardTabsTopNavigation;
