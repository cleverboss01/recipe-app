import { Link } from "react-router-dom";
import "./Navbar.css";
import Searchbar from "./Searchbar";
import { useTheme } from "../hooks/useTheme";
import { FaRegTimesCircle } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineSegment } from "react-icons/md";
import { useState } from "react";

export default function Navbar() {
  const [click, setClick] = useState(false);

  const { color } = useTheme();
  return (
    <div className="navbar" style={{ background: color }}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          Recipe Store
        </Link>
        <div className="menu-icon" onClick={() => setClick(!click)}>
          {click ? <FaRegTimesCircle /> : <MdOutlineSegment />}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <Searchbar />
          <li className="nav-line">
            <hr />
          </li>

          <li className="nav-item">
            <Link to="/recipes/create" className="nav-links">
              <BiFoodMenu />
              Create Recipe
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
