"use client";

import React, { useState } from "react";

import UsersListDashboard from "./UsersListDashboard";
import CreateUserFormDashboard from "./CreateUserFormDashboard";

import { USER_TOP_TABS } from "@/constants/admin";
import DashboardTabsTopNavigation from "@/components/dashboard/DashboardTabsTopNavigation";

const UsersDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const onChangeActiveTab = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <DashboardTabsTopNavigation
        items={USER_TOP_TABS}
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
