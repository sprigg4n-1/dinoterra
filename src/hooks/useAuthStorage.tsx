"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: number;
  username: string;
  password: string;
  lastname: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  saveUser: (
    id: number,
    username: string,
    password: string,
    lastname: string,
    name: string,
    role: string
  ) => void;
  clearUser: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthStorage = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthStorage must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const saveUser = (
    id: number,
    username: string,
    password: string,
    lastname: string,
    name: string,
    role: string
  ) => {
    const userData = { id, username, password, lastname, name, role };
    console.log(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const clearUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, saveUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};
