import { useContext } from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

function NotFound() {
  const { dark } = useContext(ThemeContext);

  return (
    <div className={`not-found ${dark ? "dark" : "light"}`}>
      <h2>Página no encontrada</h2>
      <p>La ruta o el producto solicitado no existe.</p>
      <Link to="/" className="btn-home">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;
