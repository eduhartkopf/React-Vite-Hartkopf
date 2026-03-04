import "./ItemDetail.css";
import ItemCounter from "../ItemCounter/ItemCounter";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import { ShoppingBasket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

function ItemDetail({ product }) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { addCartProduct } = useContext(CartContext);

  const [count, setCount] = useState(1);

  const handleAddCartProduct = () => {
    addCartProduct({
      ...product,
      quantity: count,
    });

    toast.success("Producto agregado al carrito 🛒✨", {
      position: "top-right",
      autoClose: 1500,
    });
  };

  if (!product)
    return <div className="itemDetail__empty">Producto no seleccionado.</div>;

  return (
    <div className={`itemDetail__container ${theme}`}>
      <div className="itemDetail__card">
  <img src={product.img} alt={product.title} className="itemDetail__image" />

  <h2 className="itemDetail__title">{product.title}</h2>

  <p className="itemDetail__description">
    {product.long_description}
  </p>

  {product.stock !== undefined && (
    <div className="itemDetail__counter">
      <ItemCounter stock={product.stock} onChange={setCount} />
    </div>
  )}

  <span className="itemDetail__price">${product.price} ARG</span>


        <div className="itemDetail__actions">
          <ButtonPrimary onClick={handleAddCartProduct}>
            Agregar al Carrito <ShoppingBasket size={20} />
          </ButtonPrimary>
        </div>

        <button className="backButton" onClick={() => navigate("/")}>
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default ItemDetail;
