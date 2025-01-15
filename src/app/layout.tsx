import { Tektur } from "next/font/google";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";

const tektur = Tektur({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tektur.className} flex flex-col h-screen`}>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
