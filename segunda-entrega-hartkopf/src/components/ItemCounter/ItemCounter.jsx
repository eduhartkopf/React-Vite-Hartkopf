import "./ItemCounter.css";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import useCounter from "../../hooks/useCounter.js";

function ItemCounter({ stock, onChange, className }) {
  const { dark, changeTheme } = useContext(ThemeContext);

  const [counter, less, add] = useCounter({
    initial: 1,
    stock: Number(stock),
  });

  useEffect(() => {
    onChange(counter);
  }, [counter]);

  return (
    <div
      className={`item-counter ${dark ? "dark" : "light"} ${className || ""}`}
    >
      <button onClick={less}>-</button>
      <span>{counter}</span>
      <button onClick={add}>+</button>
    </div>
  );
}

export default ItemCounter;
