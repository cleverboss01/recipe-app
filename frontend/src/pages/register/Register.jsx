import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import Land from "../../components/LandNavbar";
import ThemeSelector from "../../components/ThemeSelector";
import { FaUser } from "react-icons/fa";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useTheme } from "../../hooks/useTheme";
import Aos from "aos";
import "aos/dist/aos.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { color, mode } = useTheme();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    Aos.init({ duration: 1500 });

    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success("Registraton Successful!");
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

    // if (password !== password2) {
    //   toast.error("Passwords do not match");
    // } else {
    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Land />
      <ThemeSelector />

      <section className="register" data-aos="fade-right">
        <section
          className={
            mode !== "dark" ? "register header" : "register header dark"
          }
        >
          <h1>
            <FaUser />
            Register
          </h1>
          <h4>Please create an account</h4>
        </section>

        <section className={mode !== "dark" ? "form" : "form dark"}>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Fullname: </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                className="form-control"
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
              <label htmlFor="password2">Confirm: </label>
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                onChange={onChange}
                placeholder="Confirm password"
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-block"
                style={{ background: color }}
              >
                Register
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default Register;
