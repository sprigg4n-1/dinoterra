import { Tektur } from "next/font/google";

import "../globals.css";
import "maplibre-gl/dist/maplibre-gl.css";

const tektur = Tektur({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tektur.className}`}>{children}</body>
    </html>
  );
}
