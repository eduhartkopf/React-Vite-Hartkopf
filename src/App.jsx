import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ItemList from "./components/ItemList/ItemList";
import NotFound from "./components/NotFound/NotFound";
import Contact from "./Pages/Contact/Contact.jsx";
import Login from "./components/Login/Login";
import ProductsDetail from "./Pages/ProductDetail/ProductsDetail.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Checkout from "./components/CheckOut/CheckOut.jsx";
import Register from "./Pages/Register/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext.jsx";
import OrderSuccess from "./Pages/OrderSucces/OrderSuccess.jsx";


function App() {
  const { dark } = useContext(ThemeContext);

  return (
    <div className={`app-root ${dark ? "dark" : "light"}`}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/products/:productId" element={<ProductsDetail />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/items-list" element={<ItemList />} />

        <Route path="/category/:categoryId" element={<ItemList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/gracias" element={<OrderSuccess />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
