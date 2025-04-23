import Link from "next/link";

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
