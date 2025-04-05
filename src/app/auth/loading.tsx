import LoaderComponent from "@/components/LoaderComponent";
import React from "react";

const loading = () => {
  return (
    <div className="bg-brightOrange backdrop-blur-sm h-screen flex items-center justify-center">
      <LoaderComponent loaderColor="#F44336" pathColor="#fff" />
    </div>
  );
};

export default loading;
