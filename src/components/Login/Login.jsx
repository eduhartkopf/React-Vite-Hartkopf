import React, { useContext, useState } from "react";
import "./Login.css";
import { ThemeContext } from "../../context/ThemeContext";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";

function Login() {
  const { theme } = useContext(ThemeContext);
  const { saveUser } = useContext(UserContext);
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    setErrorMsg("");

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then(async (userCredential) => {
        const user = userCredential.user;
        const token = await user.getIdToken();

        saveUser(user.email, token);
        navigate("/category/all");
      })
      .catch((error) => {
        console.error("Error en login:", error.code, error.message);
        setErrorMsg("Correo o contraseña incorrectos");
      });
  };

  return (
    <div className={`login-page ${theme}`}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Ingrese email"
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Ingrese contraseña"
      />

      <button onClick={handleLogin}>Ingresar</button>

      {errorMsg && <p className="error">{errorMsg}</p>}
    </div>
  );
}

export default Login;
