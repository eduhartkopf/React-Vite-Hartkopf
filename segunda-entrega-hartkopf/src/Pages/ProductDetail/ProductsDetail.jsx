import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import NotFound from "../../components/NotFound/NotFound";
import { ThemeContext } from "../../context/ThemeContext";
import "./ProductDetail.css";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../firebase";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function ProductsDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const db = getFirestore(app);
        const docRef = doc(db, "Items", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error al obtener producto:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <p>Cargando...</p>;
  if (!product) return <NotFound />;

  return (
    <div className={`productDetail ${theme}`}>
      {product.stock !== undefined && <ItemDetail product={product} />}
    </div>
  );
}

export default ProductsDetail;
