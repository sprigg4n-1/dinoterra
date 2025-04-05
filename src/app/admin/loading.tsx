import LoaderComponent from "@/components/LoaderComponent";
import React from "react";

const loading = () => {
  return (
    <div className="bg-darkPurple backdrop-blur-sm h-screen flex items-center justify-center">
      <LoaderComponent loaderColor="#FF9800" pathColor="#fff" />
    </div>
  );
};

export default loading;
