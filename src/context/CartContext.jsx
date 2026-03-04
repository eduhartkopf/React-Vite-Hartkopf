import { createContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalQuantity(
      cart.reduce((accumulator, product) => accumulator + product.quantity, 0)
    );
  }, [cart]);

  useEffect(() => {
    setTotalPrice(
      cart.reduce((acc, product) => acc + product.quantity * product.price, 0)
    );
  }, [cart]);
  const addCartProduct = (newProduct) => {
    const productStock = Number(newProduct.stock);
    const productInCart = cart.find((p) => p.id === newProduct.id);

    if (productInCart) {
      const newQuantity = productInCart.quantity + newProduct.quantity;

      if (newQuantity > productStock) {
        toast.error(
          `Stock insuficiente. Disponible: ${productStock} producto/s`
        );
        return;
      }

      const updatedCart = cart.map((product) =>
        product.id === newProduct.id
          ? { ...product, quantity: newQuantity }
          : product
      );

      setCart(updatedCart);
      return;
    }

    if (newProduct.quantity > productStock) {
      toast.error(`Stock insuficiente. Disponible: ${productStock} producto/s`);
      return;
    }

    setCart([...cart, newProduct]);
  };

  const deleteCartProduct = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };
  const clearCart = () => setCart([]);
  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        totalPrice,
        addCartProduct,
        deleteCartProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
