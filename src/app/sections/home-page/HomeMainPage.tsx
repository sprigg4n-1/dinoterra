import IntroSection from "./IntroSection";
import AboutUsSection from "./AboutUsSection";
import MapNavigatorSection from "./MapNavigatorSection";
import DinoRecomendationSection from "./DinoRecomendationSection";

const HomeMainPage = () => {
  return (
    <main className="bg-darkPurple">
      <IntroSection />
      <AboutUsSection />
      <MapNavigatorSection />
      <DinoRecomendationSection />
    </main>
  );
};

export default HomeMainPage;
