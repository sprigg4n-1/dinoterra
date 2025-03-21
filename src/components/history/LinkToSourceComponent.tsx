import { div } from "framer-motion/client";
import Link from "next/link";
import React from "react";

const LinkToSourceComponent = ({
  link,
  text,
}: {
  link: string;
  text: string;
}) => {
  return (
    <div className="text-center md:text-right italic">
      <Link
        className="italic underline text-slateGray hover:text-brightOrange"
        href={link}
        target="_blank"
      >
        {text}
      </Link>
    </div>
  );
};

export default LinkToSourceComponent;
