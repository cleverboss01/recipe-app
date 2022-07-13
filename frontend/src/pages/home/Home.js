import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, getRecipes } from "../../features/recipes/recipeSlice";
import Spinner from "../../components/Spinner";

import "./Home.css";
//import component
import RecipeList from "../../components/RecipeList";
import Navbar from "../../components/Navbar";
import ThemeSelector from "../../components/ThemeSelector";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message, recipes } = useSelector(
    (state) => state.recipes
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getRecipes());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Navbar />
      <ThemeSelector />

      <div className="home">
        <h1>Welcome {user && user.name}</h1>
        {recipes && <RecipeList recipes={recipes} />}
      </div>
    </>
  );
}
