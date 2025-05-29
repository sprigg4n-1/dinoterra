"use client";

import React, { useEffect, useState } from "react";

import { getUserById } from "@/services/SecurityService";
import { IUser } from "@/config/types";

import Link from "next/link";

const UserDashboardPage = ({ id }: { id: number }) => {
  const [user, setUser] = useState<IUser>();

  // use effects
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(id);
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <Link
          className="bg-slateGray text-white w-full text-center py-1 font-semibold hover:opacity-90 sm:w-auto sm:px-10"
          href={"/admin/dashboard/users"}
        >
          Назад
        </Link>
        <h2 className="flex-1 text-center text-[18px] font-bold sm:text-[20px]">
          {user?.name} ({user?._id})
        </h2>
      </div>
    </div>
  );
};

export default UserDashboardPage;
