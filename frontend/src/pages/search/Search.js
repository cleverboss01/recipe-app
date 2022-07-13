import { useLocation, useNavigate } from "react-router-dom";
import RecipeList from "../../components/RecipeList";
import { useDispatch } from "react-redux";
import "./Search.css";
import Navbar from "../../components/Navbar";
import ThemeSelector from "../../components/ThemeSelector";

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, message, recipes } = useSelector(
    (state) => state.recipes
  );

  const url = "http://localhost:3000/recipes?q=" + query;
  const { error, isPending, data } = useFetch(url);
  return (
    <div>
      <Navbar />
      <ThemeSelector />
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
