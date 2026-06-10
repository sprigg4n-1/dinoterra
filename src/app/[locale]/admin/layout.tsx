import "@mantine/carousel/styles.css";
import { Metadata } from "next";
import AsideDashboard from "@/app/sections/dashboard/AsideDashboard";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata: Metadata = {
  title: "DinoTerra | Admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <MantineProvider>
        <div className="flex flex-col lg:flex-row">
          <AsideDashboard />
          <div className="flex-1 min-h-screen py-3 px-2 lg:px-5">
            {children}
          </div>
        </div>
      </MantineProvider>
    </AuthProvider>
  );
}
