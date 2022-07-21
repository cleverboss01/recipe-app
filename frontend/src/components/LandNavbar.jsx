import { Link } from "react-router-dom";
import {
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
  FaHamburger,
  FaRegTimesCircle,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LandNavbar.css";
import { toast } from "react-toastify";
import { logout, reset } from "../features/auth/authSlice";
import { useTheme } from "../hooks/useTheme";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlineSegment } from "react-icons/md";
import { useState } from "react";
import "./Button.css";
import { IconContext } from "react-icons";

export default function Land() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [click, setClick] = useState(false);

  const closeMobileMenu = () => setClick(false);

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    toast.success("You logged out!");
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const { color } = useTheme();

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar" style={{ background: color }}>
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              Recipe Store
            </Link>
            <div className="menu-icon" onClick={() => setClick(!click)}>
              {click ? <FaRegTimesCircle /> : <MdOutlineSegment />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/recipes" className="nav-links">
                      <FaHamburger />
                      My Recipes
                    </Link>
                  </li>
                  <li className="nav-line">
                    <hr />
                  </li>
                  <li className="nav-item">
                    <Link to="" onClick={onLogout} className="nav-links">
                      <FaSignOutAlt />
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      <FaSignInAlt />
                      Login
                    </Link>
                  </li>
                  <li className="nav-line">
                    <hr />
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/register"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      <FaUser />
                      Sign-up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}
