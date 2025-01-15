import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="px-10">
        <h1>Hello world</h1>
        <Link href={"/interactive-map"}>map</Link>
      </div>
    </div>
  );
}
