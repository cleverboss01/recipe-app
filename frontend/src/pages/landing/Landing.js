import LandNavbar from "../../components/LandNavbar";
import ThemeSelector from "../../components/ThemeSelector";
import HeroSection from "../../components/HeroSection";
import { homeDataOne, homeDataTwo } from "../../pageData/pageData";

const Landing = () => {
  return (
    <>
      <div className="land">
        <LandNavbar />
        <ThemeSelector />
        <div className="content">
          <HeroSection {...homeDataOne} />
          <HeroSection {...homeDataTwo} />
        </div>
      </div>
    </>
  );
};

export default Landing;
