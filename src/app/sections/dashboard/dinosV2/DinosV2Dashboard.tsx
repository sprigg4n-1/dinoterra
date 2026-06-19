"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardTabsTopNavigation from "@/components/dashboard/DashboardTabsTopNavigation";
import DinosV2ListDashboard from "./DinosV2ListDashboard";
import CreateDinoV2FormDashboard from "./CreateDinoV2FormDashboard";

const DinosV2Dashboard = () => {
  const t = useTranslations("admin.v2.tabs");
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", text: t("all") },
    { id: "create", text: t("create") },
  ];

  return (
    <div className="flex flex-col gap-2">
      <DashboardTabsTopNavigation
        items={tabs}
        activeItemId={activeTab}
        setActive={setActiveTab}
      />
      <div className="h-full">
        {activeTab === "all" ? <DinosV2ListDashboard /> : <CreateDinoV2FormDashboard />}
      </div>
    </div>
  );
};

export default DinosV2Dashboard;
