import UserDashboardPage from "@/app/sections/dashboard/users/UserDashboardPage";
import { getUserById } from "@/services/SecurityService";
import React from "react";

const UserDashboard = async ({ params }: { params: any }) => {
  const { id } = await params;

  return (
    <>
      <UserDashboardPage id={id} />
    </>
  );
};

export default UserDashboard;
