import "./HeroSection.css";
import "./Button.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";

const HeroSection = ({
  lightBg,
  topLine,
  lightText,
  headline,
  subHeadline,
  description,
  formLabel,
  listDesc,
  subPhotos,
  img,
  alt,
  imgStart,
}) => {
  const { mode } = useTheme();

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <>
      <div
        className={lightBg ? "home__hero-section" : "home__hero-section darkBg"}
      >
        <div className="container" data-aos="fade-up">
          <div
            className="row home__hero-row"
            style={{
              display: "flex",
              flexDirection: imgStart === "start" ? "row-reverse" : "row",
            }}
          >
            <div className="col">
              <div className="home__hero-text-wrapper">
                <div className={topLine ? "top-line" : "none"}>{topLine}</div>
                <h1 className={lightText ? "heading" : "heading dark"}>
                  {headline}
                </h1>
                <h4 className={lightText ? "sub-heading" : "sub-heading dark"}>
                  {subHeadline}
                </h4>
                <p
                  className={
                    mode !== "dark"
                      ? "home__hero-subtitle"
                      : "home__hero-subtitle dark"
                  }
                >
                  {description}
                </p>
                <ul className={lightText ? "list" : "list dark"}>
                  {listDesc &&
                    listDesc.map((listItem, index) => (
                      <li key={index}>{listItem}</li>
                    ))}
                </ul>
                <div className="home__sub-photo">
                  {subPhotos &&
                    subPhotos.map((pic) => <img src={pic.src} alt={pic.alt} />)}
                </div>
                {formLabel && (
                  <div className="form-container">
                    <form>
                      <input type="text" placeholder="Enter email address" />
                      <input
                        type="submit"
                        className="blue"
                        value="Get Premium"
                      />
                    </form>
                  </div>
                )}
              </div>
            </div>
            <div className="col">
              <div className="home__hero-img-wrapper">
                <img src={img} alt={alt} className="home__hero-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
