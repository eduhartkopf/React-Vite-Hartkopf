import React, { createContext, useState, useMemo } from "react";

export const ThemeContext = createContext({
  theme: "light",
  dark: false,
  changeTheme: () => {},
});

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const changeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = useMemo(
    () => ({
      theme,
      dark: theme === "dark",
      changeTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
