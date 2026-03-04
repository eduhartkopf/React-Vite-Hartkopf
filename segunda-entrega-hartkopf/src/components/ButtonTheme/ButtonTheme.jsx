import { useContext } from "react";
import { SunMoon } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import "./ButtonTheme.css";

function ButtonTheme() {
  const { changeTheme } = useContext(ThemeContext);

  return (
    <button className="theme-button" onClick={changeTheme}>
      <SunMoon />
    </button>
  );
}

export default ButtonTheme;
