import { Link } from "react-router-dom";
import "./Navbar.css";
import Searchbar from "./Searchbar";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { color } = useTheme();
  return (
    <div className="navbar" style={{ background: color }}>
      <div className="navbar container" style={{ background: color }}>
        <Link to="/" className="brand">
          <h1>Recipe Store</h1>
        </Link>
        <Searchbar />
        <Link to="/recipes/create">Create Recipe</Link>
      </div>
    </div>
  );
}
