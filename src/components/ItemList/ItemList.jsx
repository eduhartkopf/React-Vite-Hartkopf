import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemList.css";
import { ShoppingBasket } from "lucide-react";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import { ThemeContext } from "../../context/ThemeContext";
import { CartContext } from "../../context/CartContext.jsx";
import { toast } from "react-toastify";
import ItemCounter from "../ItemCounter/ItemCounter.jsx";
import { app } from "../../firebase.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function ItemList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { categoryId } = useParams();
  const { theme } = useContext(ThemeContext);
  const { addCartProduct } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

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

        setProducts(itemsList);
      } catch (error) {
        console.error("Error al obtener items:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredProducts =
    !categoryId || categoryId.toLowerCase() === "all"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === categoryId.toLowerCase()
        );

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  const handleAddCart = (product) => {
    const selectedQuantity = quantities[product.id] || 1;

    if (selectedQuantity > product.stock) {
      toast.error(`No hay suficiente stock para "${product.title}"`);
      return;
    }

    addCartProduct({ ...product, quantity: selectedQuantity });

    toast.success(
      `Producto "${product.title}" agregado al carrito ×${selectedQuantity} 🛒✨`,
      {
        position: "top-right",
        autoClose: 1500,
      }
    );
  };

  return (
    <div className={`itemList ${theme}`}>
      {loading && <p>Cargando productos...</p>}

      {!loading && error && (
        <p style={{ color: "red" }}>Hubo un error al cargar los productos.</p>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <p>No se encontraron productos para esta categoría.</p>
      )}

      {!loading &&
        !error &&
        sortedProducts.map((product) => (
          <div key={product.id} className="itemCard">
            <img
              className="img-product"
              src={product.img}
              alt={product.title}
            />

            <h3>{product.title}</h3>
            <p>{product.short_description}</p>

            <p className="price">${product.price}</p>

            {product.stock !== undefined && (
  <ItemCounter
    stock={product.stock}
    className="counter-card"
    onChange={(value) => handleQuantityChange(product.id, value)}
  />
)}


            <div className="buttons">
              <Link to={`/products/${product.id}`}>
                <ButtonPrimary>Ver Producto</ButtonPrimary>
              </Link>

              <ButtonPrimary onClick={() => handleAddCart(product)}>
                Agregar al Carrito <ShoppingBasket size={18} />
              </ButtonPrimary>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ItemList;
