import { Metadata } from "next";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { AuthProvider } from "@/hooks/useAuth";
import FixedUploadPhotoComponent from "@/components/upload-photo/FixedUploadPhotoComponent";

export const metadata: Metadata = {
  title: "DinoTerra",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen relative">
        <Header />
        <div className="flex-1">{children}</div>
        <FixedUploadPhotoComponent />
        <Footer />
      </div>
    </AuthProvider>
  );
}
