import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import "./Cart.css";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { dark } = useContext(ThemeContext);
  const { cart, deleteCartProduct } = useContext(CartContext);

  const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const db = getFirestore(app);
        const itemsCollection = collection(db, "Items");
        const snapshot = await getDocs(itemsCollection);

        const itemsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductsData(itemsList);
      } catch (error) {
        console.error("Error al obtener items:", error);
      }
    };

    fetchItems();
  }, []);

  const detailedCart = cart.map((item) => {
    const productInfo = productsData.find((p) => p.id === item.id);
    return productInfo ? { ...productInfo, quantity: item.quantity } : null;
  });

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className={`cart-page ${dark ? "dark" : "light"}`}>
      <h2 className="cart-title">Tu carrito</h2>

      {detailedCart.length === 0 ? (
        <p className="cart-empty">El carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-grid">
            {detailedCart.map((item) =>
              item ? (
                <div key={item.id} className="cart-card">
                  <img src={item.img} width={80} className="cart-card-img" />

                  <p className="cart-card-price">Precio: ${item.price}</p>
                  <p className="cart-card-qty">Cantidad: {item.quantity}</p>
                  <p className="cart-card-total">
                    Total: ${item.price * item.quantity}
                  </p>

                  <button
                    className="cart-card-delete"
                    onClick={() => deleteCartProduct(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ) : null
            )}
          </div>
          <button className="go-checkout-btn" onClick={goToCheckout}>
            Ir al Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
