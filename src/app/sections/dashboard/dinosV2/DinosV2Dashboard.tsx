"use client";

import { useMemo, useState } from "react";
import DashboardTabsTopNavigation from "@/components/dashboard/DashboardTabsTopNavigation";
import DinosV2ListDashboard from "./DinosV2ListDashboard";
import CreateDinoV2FormDashboard from "./CreateDinoV2FormDashboard";

const DinosV2Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = useMemo(
    () => [
      { id: "all", text: "Всі динозаври" },
      { id: "create", text: "Додати" },
    ],
    [],
  );

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
