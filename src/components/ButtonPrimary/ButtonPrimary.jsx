import "./ButtonPrimary.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function ButtonPrimary({ children, onClick, className = "" }) {
  const { dark, changeTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={onClick}
      className={`button-primary ${dark ? "dark" : "light"} ${className}`}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
