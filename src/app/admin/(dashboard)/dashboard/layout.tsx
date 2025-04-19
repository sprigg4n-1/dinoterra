import "@mantine/carousel/styles.css";
import "@/app/globals.css";
import "maplibre-gl/dist/maplibre-gl.css";

import { Tektur } from "next/font/google";
import AsideDashboard from "@/app/sections/dashboard/AsideDashboard";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "@/hooks/useAuth";

const tektur = Tektur({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tektur.className}`}>
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
      </body>
    </html>
  );
}
