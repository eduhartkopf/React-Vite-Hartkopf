import React, { useContext, useState } from "react";
import "./Register.css";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const { theme } = useContext(ThemeContext);
  const { saveUser } = useContext(UserContext);

  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = () => {
    setLoading(true);
    setErrorMsg("");

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const token = await user.getIdToken();
        saveUser(user.email, token);
        navigate("/category/all");
      })
      .catch((error) => {
        console.error("Error al registrar:", error.code, error.message);
        setErrorMsg(
          error.code === "auth/email-already-in-use"
            ? "Este correo ya está registrado. Intenta con otro."
            : "Error al registrar usuario: " + error.message
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={`register-page ${theme}`}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ingrese email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Ingrese contraseña"
      />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registrando..." : "Registrar"}
      </button>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </div>
  );
}

export default Register;
