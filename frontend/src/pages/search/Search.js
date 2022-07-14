import "./Search.css";
import Navbar from "../../components/Navbar";
import ThemeSelector from "../../components/ThemeSelector";

export default function Search() {
  return (
    <div className="search-container">
      <Navbar />
      <ThemeSelector />
      <div className="search-content">
        <h2>Feature Unavailable...</h2>
        <p>
          With this feature, you will be able to find the best and newest
          recipes trending in the foodie community to add to your collection of
          great foods.
        </p>
        <small>Coming soon!</small>
        <div className="vid">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/u54aQPzwbWc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
