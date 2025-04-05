"use client";

import React, { useEffect, useState } from "react";

import { getUserById } from "@/services/SecurityService";

const UserDashboardPage = ({ id }: { id: number }) => {
  const [user, setUser] = useState<any>();

  // use effects
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(id);
      setUser(user);
    };

    fetchUser();
  }, []);

  return <div>{user?.id}</div>;
};

export default UserDashboardPage;
