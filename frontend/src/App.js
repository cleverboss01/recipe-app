import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages component
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Search from "./pages/search/Search";
import Recipe from "./pages/recipe/Recipe";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//styles
import "./App.css";
import { useTheme } from "./hooks/useTheme";
import Footer from "./components/Footer";

function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes" element={<Home />} />
          <Route path="/recipes/create" element={<Create />} />
          <Route path="/recipes?" element={<Search />} />
          <Route path="/recipes/:id" element={<Recipe />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
