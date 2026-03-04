import React from "react";
import "./Contact.css";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

function Contact() {
  const { dark, changeTheme } = useContext(ThemeContext);

  return (
    <div className={`contact-page ${dark ? "dark" : "light"}`}>
      <h2>Contacto</h2>
      <p>Puedes escribirnos a: contacto@rampandroll.com</p>
      <a href="/" className="btn-home">
        Volver al inicio
      </a>
    </div>
  );
}

export default Contact;
