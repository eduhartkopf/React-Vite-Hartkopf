import { useState, useEffect } from "react";

export default function useCounter({ initial = 1, stock }) {
  const [counter, setCounter] = useState(initial);

  useEffect(() => {
    if (stock === 0) {
      setCounter(0);
    } else if (counter > stock) {
      setCounter(stock);
    }
  }, [stock]);

 
    const less = () => {
      if (counter > 1) {
        setCounter(counter - 1);
      }
    };

    const add = () => {
      if (counter < stock) {
        setCounter(counter + 1);
      }
    };

    return [counter, less, add];
}
