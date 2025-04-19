import { Tektur } from "next/font/google";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

import "../globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { AuthProvider } from "@/hooks/useAuth";
import { Metadata } from "next";

const tektur = Tektur({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DinoTerra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tektur.className} flex flex-col h-screen`}>
        <AuthProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
