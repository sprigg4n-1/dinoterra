import Link from "next/link";
import React from "react";

const TopDinoPageComponent = ({ title }: { title: string }) => {
  return (
    <div className="my-3 sm:my-5 text-darkGray font-medium text-[14px] sm:text-[16px]">
      <Link href={`/encyclopedia`} className="hover:text-black">
        Енциклопедія
      </Link>
      {" > "}
      <span>{title}</span>
    </div>
  );
};

export default TopDinoPageComponent;
