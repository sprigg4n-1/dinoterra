import Link from "next/link";
import React from "react";

const LinkToDinoComponent = ({
  text,
  name,
}: {
  text: string;
  name: string;
}) => {
  return (
    <Link className="font-semibold underline" href={`encyclopedia/${name}`}>
      {text}
    </Link>
  );
};

export default LinkToDinoComponent;
