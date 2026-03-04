import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext.jsx";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../../firebase.js";
import { toast } from "react-toastify";
import "./CheckOut.css";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);
  const navigate = useNavigate();

  const PRODUCTS_COL = "Items";

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyer.name || !buyer.email || !buyer.phone) {
      toast.error("Completá todos los campos antes de continuar");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email)) {
      toast.error("Ingresá un email válido");
      return;
    }

    if (cart.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }

    setLoading(true);

    try {
      const itemsForOrder = cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      }));

      const batch = writeBatch(db);
      const outOfStock = [];

      for (const it of itemsForOrder) {
        const prodRef = doc(db, PRODUCTS_COL, it.id);
        const prodSnap = await getDoc(prodRef);

        if (!prodSnap.exists()) {
          outOfStock.push({ id: it.id, reason: "no existe" });
          continue;
        }

        const currentStock = prodSnap.data().stock ?? 0;
        if (currentStock < it.quantity) {
          outOfStock.push({
            id: it.id,
            available: currentStock,
            requested: it.quantity,
          });
        } else {
          batch.update(prodRef, { stock: currentStock - it.quantity });
        }
      }

      if (outOfStock.length > 0) {
        toast.error("Producto sin stock suficiente");
        console.error("Out of stock:", outOfStock);
        setLoading(false);
        return;
      }

      const order = {
        buyer,
        items: itemsForOrder,
        total: totalPrice,
        date: new Date(),
      };

      await batch.commit();

      const ordersCollection = collection(db, "orders");
      const docRef = await addDoc(ordersCollection, order);
      clearCart();
      toast.success("Compra realizada con éxito 🎉");

      setTimeout(() => {
        navigate("/gracias", { state: { orderId: docRef.id } });
      }, 2300);
    } catch (error) {
      console.error("Error al crear la orden:", error);
      toast.error("Hubo un error al procesar tu compra");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Generando orden...</p>;

  return (
    <div className="checkout-container">
      <div className="checkout-page">
        <h2>Checkout</h2>

        {orderId ? (
          <div className="success">
            <h3>¡Gracias por tu compra!</h3>
            <p>Tu ID de orden es:</p>
            <strong>{orderId}</strong>
          </div>
        ) : (
          <form className="checkout-form" onSubmit={handleSubmit}>
            <label>
              Nombre
              <input
                type="text"
                name="name"
                placeholder=""
                value={buyer.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder=""
                value={buyer.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Teléfono
              <input
                type="tel"
                name="phone"
                placeholder=""
                value={buyer.phone}
                onChange={handleChange}
              />
            </label>

            <button type="submit">Finalizar Compra</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Checkout;
