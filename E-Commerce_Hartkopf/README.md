# E-Commerce Web App — Proyecto Final

Este proyecto consiste en una aplicación web de e-commerce desarrollada con **React**,
**Vite** y **React Router**, implementando navegación dinámica, carga de productos desde
**Firebase Firestore**, almacenamiento de imágenes en **Firebase Storage**, gestión de
usuario mediante **Context**, y un flujo completo de compra con **Checkout** y **Order Success**.

El objetivo del proyecto es presentar un Front End funcional, modular, mantenible
y basado en buenas prácticas modernas de React.

---

## Tecnologías y Librerías Principales

- **React + Vite** — Arquitectura ligera y rápida.
- **React Router DOM** — Navegación por rutas, rutas dinámicas y rutas protegidas.
- **Firebase Firestore** — Base de datos NoSQL para productos y órdenes.
- **imgBB** — Hosting de imágenes de productos.
- **Context API** — Manejo global del usuario y persistencia opcional.
- **CSS modular** — Estilos separados por componentes.
- **Lucide-react** — Íconos limpios y livianos.

---

## Funcionalidades Implementadas

### 🔹 Catálogo dinámico

- Render de productos desde Firestore.
- Categorías filtrables desde rutas dinámicas (`/category/:id`).
- Vista individual de producto.

### 🔹 Carrito y Checkout

- Context global para agregar, quitar y vaciar el carrito.
- Cantidad configurada por el usuario mediante `ItemCount`.
- Vista de Checkout.
- Generación de orden en Firestore.
- Pantalla de confirmación con ID de compra.

### 🔹 Autenticación básica

- Context para almacenar `email` y `accessToken`.
- Persistencia opcional con `localStorage`.

### 🔹 Integración con Firebase

- Subida manual de imágenes a Storage.
- Obtención manual del URL de descarga.
- Creación de documentos de productos en Firestore.
- Colección de órdenes con detalles de compra.

---

## Buenas Prácticas Aplicadas

- Rutas limpias y semánticas.
- Componentes con responsabilidades claras.
- Hooks adecuados (`useEffect`, `useParams`, `useNavigate`, `useContext`).
- Separación estricta entre UI y lógica.
- Persistencia del usuario sin bloquear navegación.
- Manejo de estados de carga y errores.

---

## Instalación y Ejecución

1. **Clonar el repositorio:**

git clone https://github.com/eduhartkopf/NavegaLasRutas-Hartkopf.git

2. **Entrar al proyecto:**

cd nombre-del-proyecto

3. **Instalar dependencias:**

npm install

4. **Crear archivo de configuración Firebase:**

Crear /src/firebase/config.js con tus credenciales de Firebase.

5. **Ejecutar el proyecto en modo desarrollo:**

npm run dev

6. **Compilar para producción:**

npm run build

**Estado Actual del Proyecto**
Proyecto completamente funcional, con navegación, catálogo dinámico, carrito,
checkout, órdenes en Firestore y estructura lista para futuras expansiones.
