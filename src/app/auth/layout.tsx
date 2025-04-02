import { Tektur } from "next/font/google";

import "../globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { AuthProvider } from "@/hooks/useAuthStorage";

const tektur = Tektur({ subsets: ["latin"] });

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
