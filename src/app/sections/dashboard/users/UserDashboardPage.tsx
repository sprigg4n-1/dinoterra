"use client";

import { getUserById } from "@/services/SecurityService";
import React, { useEffect, useState } from "react";

const UserDashboardPage = ({ id }: { id: number }) => {
  const [user, setUser] = useState<any>();

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
