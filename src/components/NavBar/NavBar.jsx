// src/components/NavBar/NavBar.jsx
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Key } from "lucide-react";

import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget.jsx";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary.jsx";
import ButtonTheme from "../ButtonTheme/ButtonTheme.jsx";

import { ThemeContext } from "../../context/ThemeContext.jsx";
import { UserContext } from "../../context/UserContext.jsx";

// Importamos las imágenes desde src/assets
import portadaLight from "../../assets/images/Items/portada Light.jpg";
import portadaDark from "../../assets/images/Items/portada Dark.jpg";
import logo from "../../assets/images/Items/logo Skate Proyectoreact.png";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, changeTheme } = useContext(ThemeContext);
  const { user, deleteUser } = useContext(UserContext);
  const navigate = useNavigate();
  const auth = getAuth();
  const categories = ["Skate", "Longboard", "Rollers"];

  // Imagen de fondo según tema
  const bgImage = theme === "dark" ? portadaDark : portadaLight;

  const goHome = () => {
    if (user?.email) navigate("/items-list");
    else navigate("/login");
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
    setIsOpen(false);
  };

  const handleLogIn = () => navigate("/login");

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        deleteUser();
        navigate("/login");
      })
      .catch((error) => console.log("Error: ", error));
  };

  return (
    <nav
      className={`inicio ${theme}`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        padding: "20px",
        paddingBottom: "180px",
        position: "relative",
        zIndex: 10,
        overflow: "visible",
      }}
    >
      <div className="left-block">
        <img className="logo" alt="logo" src={logo} />
        <CartWidget />
        <h1 className="h1">Ramp & Roll</h1>

        <ul className="NavBar">
          <li className="dropdown">
            <span onClick={() => setIsOpen(!isOpen)}>Categorías</span>
            {isOpen && (
              <ul className="dropdown-menu">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="dropdown-item"
                  >
                    {cat}
                  </li>
                ))}

                <li
                  className="dropdown-item back-home"
                  onClick={() => {
                    goHome();
                    setIsOpen(false);
                  }}
                >
                  ← Volver al inicio
                </li>
              </ul>
            )}
          </li>

          <li>
            <NavLink to="/contact">Contactos</NavLink>
          </li>

          <ButtonTheme changeTheme={changeTheme} dark={theme} />

          {user?.email ? (
            <button onClick={handleLogOut} className="logout-button">
              Salir
            </button>
          ) : (
            <ButtonPrimary onClick={handleLogIn} className="login-button">
              Login <Key />
            </ButtonPrimary>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
