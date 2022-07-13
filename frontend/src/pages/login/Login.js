import Land from "../../components/LandNavbar";
import { useState, useEffect } from "react";
import ThemeSelector from "../../components/ThemeSelector";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useTheme } from "../../hooks/useTheme";
import Aos from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { color } = useTheme();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    Aos.init({ duration: 1500 });

    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success(`Welcome back ${user.name}`);
      navigate("/recipes");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: [e.target.value],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Land />
      <ThemeSelector />

      <section className="login" data-aos="fade-right">
        <section className="login header">
          <h1>
            <FaSignInAlt /> Login
          </h1>
          <h4>Sign in to create recipes!</h4>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group email">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                className="form-control email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter password"
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-block"
                style={{ background: color }}
              >
                Login
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default Login;
