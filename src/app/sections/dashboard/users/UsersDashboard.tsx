"use client";

import React, { useState } from "react";

import UsersListDashboard from "./UsersListDashboard";
import CreateUserFormDashboard from "./CreateUserFormDashboard";

const UsersDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex flex-col gap-1 w-full text-white sm:flex-row lg:sticky top-0 left-0 z-10 lg:bg-white lg:py-2 lg:px-1">
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("all");
          }}
          className={`py-2 px-1 text-[16px] xl:text-[18px] sm:w-1/2 ${
            activeTab === "all" ? "bg-brightOrange" : "bg-darkPurple"
          }`}
        >
          Список користувачів
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("create");
          }}
          className={`py-2 px-1 text-[16px] xl:text-[18px] sm:w-1/2 ${
            activeTab === "create" ? "bg-brightOrange" : "bg-darkPurple"
          }`}
        >
          Додавання адміна
        </button>
      </div>
      <div className="h-full">
        {activeTab === "all" ? (
          <UsersListDashboard />
        ) : activeTab === "create" ? (
          <CreateUserFormDashboard />
        ) : null}
      </div>
    </div>
  );
};

export default UsersDashboard;
