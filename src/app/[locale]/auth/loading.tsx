import LoaderComponent from "@/components/LoaderComponent";

export default function Loading() {
  return (
    <div className="bg-brightOrange backdrop-blur-sm h-screen flex items-center justify-center">
      <LoaderComponent loaderColor="#F44336" pathColor="#fff" />
    </div>
  );
}
