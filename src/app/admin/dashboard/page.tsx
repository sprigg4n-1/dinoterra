"use client";

import React, { useState } from "react";

import AsideDashboard from "@/app/sections/dashboard/AsideDashboard";
import DinosDashboard from "@/app/sections/dashboard/DinosDashboard";
import UsersDashboard from "@/app/sections/dashboard/UsersDashboard";

const DashboardPage = () => {
  const [activePage, setActivePage] = useState<string>("dinos");

  const toggleActivePage = (value: string) => {
    setActivePage(value);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <AsideDashboard
        activePage={activePage}
        setActivePage={toggleActivePage}
      />
      <div className="flex-1 min-h-screen py-3 px-2 lg:px-5">
        {activePage === "dinos" ? (
          <DinosDashboard />
        ) : activePage === "users" ? (
          <UsersDashboard />
        ) : null}
      </div>
    </div>
  );
};

export default DashboardPage;
