"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { checkStatus } from "@/services/SecurityService";
import { IUser } from "@/config/types";

interface AuthContextType {
  isAuthenticated: boolean | null;
  user: IUser | null;
  updateAuthStatus: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await checkStatus();

      console.log(res);

      // if (res.success) {
      //   setIsAuthenticated(true);
      //   setUser(res.data);
      // } else {
      //   setIsAuthenticated(false);
      //   setUser(null);
      // }
    };

    fetchStatus();
  }, []);

  const updateAuthStatus = (status: boolean, userData: IUser | null = null) => {
    setIsAuthenticated(status);
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, updateAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
