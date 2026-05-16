"use client";

import React, { useState } from "react";

import DinosListDashboard from "./DinosListDashboard";
import ChangeDinoFormDashboard from "./ChangeDinoFormDashboard";
import CreateDinoFormDashboard from "./CreateDinoFormDashboard";
import DashboardTabsTopNavigation from "@/components/dashboard/DashboardTabsTopNavigation";

import { DINO_TOP_TABS } from "@/constants/admin";

const DinosDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const onChangeActiveTab = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <DashboardTabsTopNavigation
        items={DINO_TOP_TABS}
        activeItemId={activeTab}
        setActive={onChangeActiveTab}
      />
      <div className="h-full">
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
