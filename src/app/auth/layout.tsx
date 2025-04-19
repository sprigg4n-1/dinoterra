import { Tektur } from "next/font/google";

import "../globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { AuthProvider } from "@/hooks/useAuth";
import { Metadata } from "next";

const tektur = Tektur({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DinoTerra | Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tektur.className}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
