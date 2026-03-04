import { useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext.jsx";

function ThemeWrapper({ children }) {
  const { dark, changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(dark);
  }, [dark]);

  return children;
}

export default ThemeWrapper;
