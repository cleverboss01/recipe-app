import { useTheme } from "../hooks/useTheme";
import { useDispatch } from "react-redux";
import { deleteRecipe, getOneRecipe } from "../features/recipes/recipeSlice";
//styles
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const dispatch = useDispatch();
  const { mode, color } = useTheme();
  if (recipes.length === 0) {
    return <div className="error">You have not added any recipes...</div>;
  }

  return (
    <div className="recipe-list">
      {recipes &&
        recipes.map((recipe) => (
          <div key={recipe._id} className={`card ${mode}`}>
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} to make.</p>
            <div>{recipe.method.substring(0, 100)}...</div>
            <button
              onClick={() => dispatch(getOneRecipe(recipe._id))}
              className="btn btn-primary"
              background={color}
            >
              Cook this
            </button>
            <button
              onClick={() => dispatch(deleteRecipe(recipe._id))}
              className="btn btn-danger"
              background={color}
            >
              Remove
            </button>
          </div>
        ))}
    </div>
  );
}
