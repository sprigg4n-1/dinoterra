"use client";

import React, { useEffect, useState } from "react";

import { getUsers } from "@/services/SecurityService";

import Link from "next/link";

const UsersListDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();

      setUsers(users);
    };

    fetchUsers();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      {users.map((user) => (
        <Link
          href={`/admin/dashboard/users/${user.id}`}
          key={user.id}
          className="text-white w-full bg-darkGray text-left py-2 px-5 hover:opacity-90 duration-300"
        >
          {user.id}
        </Link>
      ))}
    </div>
  );
};

export default UsersListDashboard;
