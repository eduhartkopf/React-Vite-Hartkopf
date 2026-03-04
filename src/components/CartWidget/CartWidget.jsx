import "./CartWidget.css";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext"; 

function CartWidget() {
  const { dark } = useContext(ThemeContext);
  const{totalQuantity} = useContext(CartContext);
  return (
    <Link to="/cart" className={`${dark ? "dark" : "light"} cart-wrapper`}>
      <ShoppingCart />
      <span className="counterProduct">
        {totalQuantity}
      </span>
    </Link>
  );
}

export default CartWidget;
