"use client";

import React, { useMemo, useState } from "react";

import DinosListDashboard from "./DinosListDashboard";
import ChangeDinoFormDashboard from "./ChangeDinoFormDashboard";
import CreateDinoFormDashboard from "./CreateDinoFormDashboard";
import DashboardTabsTopNavigation from "@/components/dashboard/DashboardTabsTopNavigation";
import { useTranslations } from "next-intl";

const DinosDashboard = () => {
  const t = useTranslations("admin.tabs");
  const [activeTab, setActiveTab] = useState<string>("all");

  const dinoTabs = useMemo(
    () => [
      { id: "all", text: t("dinosList") },
      { id: "create", text: t("dinoCreate") },
      { id: "change", text: t("dinoChange") },
    ],
    [t],
  );

  const onChangeActiveTab = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <DashboardTabsTopNavigation
        items={dinoTabs}
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
