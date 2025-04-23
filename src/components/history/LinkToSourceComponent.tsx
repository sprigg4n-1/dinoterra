import Link from "next/link";

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
