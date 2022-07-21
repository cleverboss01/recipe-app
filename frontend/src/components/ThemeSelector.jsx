import "./ThemeSelector.css";
import { useTheme } from "../hooks/useTheme";
import modeIcon from "../assets/dark-mode.svg";

const themeColors = ["#dc393a", "#249c6b", "#58249c"];

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();
  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };
  console.log(mode);

  return (
    <div>
      <div className="theme-selector">
        <div className="mode-toggle">
          <img
            src={modeIcon}
            alt="dark-mode-icon"
            onClick={toggleMode}
            style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
          />
        </div>
        <div className="theme-buttons">
          {themeColors.map((color) => (
            <div
              key={color}
              onClick={() => changeColor(color)}
              style={{ background: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
