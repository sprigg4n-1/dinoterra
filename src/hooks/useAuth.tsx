"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { checkStatus } from "@/services/SecurityService";

interface AuthContextType {
  isAuthenticated: boolean | null;
  updateAuthStatus: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await checkStatus();

      if (res === "Authenticated") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    fetchStatus();
  }, []);

  const updateAuthStatus = (status: boolean) => {
    setIsAuthenticated(status);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, updateAuthStatus }}>
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
