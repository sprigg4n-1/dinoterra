"use client";

import React, { useEffect, useState } from "react";

import { getUsers } from "@/services/SecurityService";

import { IUser } from "@/config/types";

import Link from "next/link";
import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";

const UsersListDashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();

      setUsers(users);
    };

    fetchUsers();
  }, []);
  return (
    <>
      <DashboardTitleComponent text={"Список користувачів"} />

      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <Link
            href={`/admin/dashboard/users/${user?._id}`}
            key={user?._id}
            className="text-white w-full bg-darkGray text-left py-2 px-5 hover:opacity-90 duration-300"
          >
            {user._id}
          </Link>
        ))}
      </div>
    </>
  );
};

export default UsersListDashboard;
