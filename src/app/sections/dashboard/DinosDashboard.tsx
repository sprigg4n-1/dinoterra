"use client";

import React, { useState } from "react";
import DinosListDashboard from "./DinosListDashboard";
import ChangeDinoFormDashboard from "./ChangeDinoFormDashboard";
import CreateDinoFormDashboard from "./CreateDinoFormDashboard";

const DinosDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="flex flex-col gap-5 relative">
      <div className="flex flex-col gap-1 w-full text-white sm:flex-row lg:sticky top-0 left-0 z-10 lg:bg-white lg:py-2 lg:px-1">
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("all");
          }}
          className={`py-2 px-1 text-[16px] xl:text-[18px] sm:w-1/3 ${
            activeTab === "all" ? "bg-brightOrange" : "bg-darkPurple"
          }`}>
          Список динозаврів
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("create");
          }}
          className={`py-2 px-1 text-[16px] xl:text-[18px] sm:w-1/3 ${
            activeTab === "create" ? "bg-brightOrange" : "bg-darkPurple"
          }`}>
          Додавання динозавра
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("change");
          }}
          className={`py-2 px-1 text-[16px] xl:text-[18px] sm:w-1/3 ${
            activeTab === "change" ? "bg-brightOrange" : "bg-darkPurple"
          }`}>
          Редагування динозавра
        </button>
      </div>
      <div>
        {activeTab === "all" ? (
          <DinosListDashboard />
        ) : activeTab === "create" ? (
          <CreateDinoFormDashboard />
        ) : activeTab === "change" ? (
          <ChangeDinoFormDashboard />
        ) : null}
      </div>
    </div>
  );
};

export default DinosDashboard;
