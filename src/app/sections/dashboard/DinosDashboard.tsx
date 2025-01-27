"use client";

import React, { useState } from "react";
import DinosListDashboard from "./DinosListDashboard";
import ChangeDinoFormDashboard from "./ChangeDinoFormDashboard";
import CreateDinoFormDashboard from "./CreateDinoFormDashboard";

const DinosDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full bg-darkPurple text-white justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("all");
          }}
          className={`w-1/3 py-2 text-[18px] ${
            activeTab === "all" ? "bg-brightOrange" : ""
          }`}>
          Список динозаврів
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("create");
          }}
          className={`w-1/3 py-2 text-[18px] ${
            activeTab === "create" ? "bg-brightOrange" : ""
          }`}>
          Додавання динозавра
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("change");
          }}
          className={`w-1/3 py-2 text-[18px] ${
            activeTab === "change" ? "bg-brightOrange" : ""
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
