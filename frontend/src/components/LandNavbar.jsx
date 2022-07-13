import { Link } from "react-router-dom";
import { FaSignInAlt, FaUser, FaSignOutAlt, FaHamburger } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LandNavbar.css";
import { toast } from "react-toastify";
import { logout, reset } from "../features/auth/authSlice";
import { useTheme } from "../hooks/useTheme";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Land() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <div className="land-navbar" style={{ background: color }}>
        <nav>
          <Link to="/" className="brand">
            <h1>Recipe Store</h1>
          </Link>
          {user ? (
            <>
              <Link to="/recipes" className="btn auth-btn">
                <FaHamburger />
                My Recipes
              </Link>

              <button
                className="btn auth-btn"
                onClick={onLogout}
                style={{ marginLeft: "10px" }}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth">
                <FaSignInAlt />
                Login
              </Link>
              <Link to="/register" className="auth">
                <FaUser />
                Sign-up
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
