import { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "@/hooks/useAuth";
import AsideDashboardV2 from "@/app/sections/dashboard/AsideDashboardV2";

export const metadata: Metadata = {
  title: "DinoTerra | Admin V2",
};

export default function AdminV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <MantineProvider>
        <div className="flex flex-col lg:flex-row min-h-screen">
          <AsideDashboardV2 />
          <div className="flex-1 py-4 px-3 lg:px-6">{children}</div>
        </div>
      </MantineProvider>
    </AuthProvider>
  );
}
