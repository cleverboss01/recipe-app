import Navbar from "../../components/Navbar";
import ThemeSelector from "../../components/ThemeSelector";
import { useTheme } from "../../hooks/useTheme";
import "./Recipe.css";
import OneRecipe from "../../components/OneRecipe";

export default function Recipe({ recipe }) {
  const { mode } = useTheme();
  return (
    <>
      <Navbar />
      <ThemeSelector />
      <div className={`recipe ${mode}`}>
        {recipe && <OneRecipe recipe={recipe} />}
      </div>
    </>
  );
}
