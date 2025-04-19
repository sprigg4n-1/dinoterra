"use client";

import { useAuth } from "@/hooks/useAuth";
import AboutUsPage from "../sections/home-page/AboutUsPage";
import DinoRecomendationPage from "../sections/home-page/DinoRecomendationPage";
import IntroPage from "../sections/home-page/IntroPage";
import MapNavigatorPage from "../sections/home-page/MapNavigatorPage";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="bg-darkPurple">
      <IntroPage />
      <AboutUsPage />
      <MapNavigatorPage />
      <DinoRecomendationPage />
    </div>
  );
}
