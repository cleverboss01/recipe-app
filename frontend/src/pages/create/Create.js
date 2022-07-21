import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../../features/recipes/recipeSlice";
import "./Create.css";
import React from "react";
import Navbar from "../../components/Navbar";
import ThemeSelector from "../../components/ThemeSelector";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { useTheme } from "../../hooks/useTheme";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Create() {
  const { mode, color } = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.recipes);

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createRecipe({
        title,
        ingredients,
        method,
        cookingTime: cookingTime + " minutes",
      })
    );
    toast.success("Hooray! Recipe added");

    navigate("/recipes");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Navbar />
      <ThemeSelector />
      <section className="create" data-aos="fade-right">
        <section className={mode !== "dark" ? "form" : "form dark"}>
          {" "}
          <h2 className={mode !== "dark" ? "page-title" : "page-title dark"}>
            Hi {user && user.name}, add a new recipe
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Recipe title: </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>{" "}
            <p>
              Current ingredients:{" "}
              {ingredients.map((i) => (
                <em key={i}>{i}, </em>
              ))}
            </p>
            <div className="form-group">
              <label htmlFor="ingredients">Recipe ingredients: </label>
              <input
                type="text"
                className="form-control"
                id="ingredients"
                name="ingredients"
                value={newIngredient}
                ref={ingredientInput}
                onChange={(e) => setNewIngredient(e.target.value)}
              />{" "}
              <button
                onClick={handleAdd}
                className="add-btn"
                style={{ background: color }}
              >
                Add
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="method">Recipe method:</label>
              <textarea
                onChange={(e) => setMethod(e.target.value)}
                value={method}
                id="method"
                name="method"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="time">Cooking time (minutes): </label>
              <input
                type="number"
                onChange={(e) => setCookingTime(e.target.value)}
                id="time"
                name="time"
                value={cookingTime}
                required
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-block"
                style={{ background: color }}
              >
                Create
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}
