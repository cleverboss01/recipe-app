import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOneRecipe } from "../features/recipes/recipeSlice";
import Search from "../pages/search/Search";
//styles
import "./Searchbar.css";

export default function Searchbar() {
  const { recipes } = useSelector((state) => state.recipes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      recipes &&
        recipes.map((recipe) => {
          if (term === recipe.title) {
            dispatch(getOneRecipe(recipe._id));
            console.log(recipe);
            <Search recipe={recipe} />;
            navigate(`/recipes?${term}`);
          }
        });
    }
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </form>
    </div>
  );
}
