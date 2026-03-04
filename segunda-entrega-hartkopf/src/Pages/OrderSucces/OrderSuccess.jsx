import { useNavigate, useLocation } from "react-router-dom";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId || "—";

  return (
    <div className="orderSuccess__container">
      <h2>¡Gracias por tu compra!</h2>

      <p>Tu número de orden es:</p>
      <strong className="orderSuccess__id">{orderId}</strong>

      <button
        className="orderSuccess__button"
        onClick={() => navigate("/items-list")}
      >
        Seguir comprando
      </button>
    </div>
  );
}
