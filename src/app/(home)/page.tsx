"use client";

import AboutUsPage from "../sections/home-page/AboutUsPage";
import DinoRecomendationPage from "../sections/home-page/DinoRecomendationPage";
import IntroPage from "../sections/home-page/IntroPage";
import MapNavigatorPage from "../sections/home-page/MapNavigatorPage";

export default function Home() {
  return (
    <div className="bg-darkPurple">
      <IntroPage />
      <AboutUsPage />
      <MapNavigatorPage />
      <DinoRecomendationPage />
    </div>
  );
}
