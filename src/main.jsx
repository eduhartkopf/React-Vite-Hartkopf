import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/theme.css";
import ThemeProvider from "./context/ThemeContext.jsx";
import ThemeWrapper from "./context/ThemeWrapper.jsx";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./context/CartContext.jsx";
import UserProvider from "./context/UserContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ThemeWrapper>
          <CartProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </CartProvider>
        </ThemeWrapper>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
