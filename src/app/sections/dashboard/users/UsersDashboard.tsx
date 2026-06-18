"use client";

import React, { useMemo, useState } from "react";

import UsersListDashboard from "./UsersListDashboard";
import CreateUserFormDashboard from "./CreateUserFormDashboard";

import DashboardTabsTopNavigation from "@/components/dashboard/DashboardTabsTopNavigation";
import { useTranslations } from "next-intl";

const UsersDashboard = () => {
  const t = useTranslations("admin.tabs");
  const [activeTab, setActiveTab] = useState<string>("all");

  const userTabs = useMemo(
    () => [
      { id: "all", text: t("usersList") },
      { id: "create", text: t("userCreate") },
    ],
    [t],
  );

  const onChangeActiveTab = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <DashboardTabsTopNavigation
        items={userTabs}
        activeItemId={activeTab}
        setActive={onChangeActiveTab}
      />
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
