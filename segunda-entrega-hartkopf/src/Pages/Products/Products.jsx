import "../Products/Products.css";
import ItemList from "../../components/ItemList/ItemList";
import NavBar from "../../components/NavBar/NavBar";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const { dark } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.accessToken) {
      navigate("/login");
    }
  }, []);

  return (
    <div className={`products-page ${dark ? "dark" : "light"}`}>
      <NavBar />

      <main className="products-container">
        <ItemList />
      </main>
    </div>
  );
}

export default Products;
