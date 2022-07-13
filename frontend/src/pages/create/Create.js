import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../../features/recipes/recipeSlice";

//styles
import "./Create.css";

import React from "react";
import Navbar from "../../components/Navbar";
import ThemeSelector from "../../components/ThemeSelector";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

export default function Create() {
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

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Navbar />
      <ThemeSelector />
      <div className="create">
        <h2 className="page-title">Hi {user && user.name}, add a new recipe</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Recipe title:</span>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </label>

          <label>
            <span>Recipe ingredients:</span>
            <div className="ingredients">
              <input
                type="text"
                onChange={(e) => setNewIngredient(e.target.value)}
                value={newIngredient}
                ref={ingredientInput}
              />
              <button onClick={handleAdd} className="btn">
                Add
              </button>
            </div>
          </label>
          <p>
            Current ingredients:{" "}
            {ingredients.map((i) => (
              <em key={i}>{i}, </em>
            ))}
          </p>

          <label>
            <span>Recipe method:</span>
            <textarea
              onChange={(e) => setMethod(e.target.value)}
              value={method}
              required
            ></textarea>
          </label>
          <label>
            <span>Cooking time (minutes):</span>
            <input
              type="number"
              onChange={(e) => setCookingTime(e.target.value)}
              value={cookingTime}
              required
            />
          </label>
          <button className="button">Create</button>
        </form>
      </div>
    </>
  );
}
