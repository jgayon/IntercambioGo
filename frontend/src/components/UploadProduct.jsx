import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function UploadProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    price: ""
  });

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Proteger la ruta: solo usuarios logueados pueden subir productos
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("No se encontró información del usuario. Inicia sesión nuevamente.");
      navigate("/login");
      return;
    }

    try {
      // Enviar el producto al BACKEND (MySQL) usando el modelo de datos real
      const payload = {
        title: form.title,
        description: form.description,
        image: form.image,
        price: Number(form.price),
        owner_id: user.id, // clave foránea al usuario dueño
      };

      await API.post("/products", payload);

      alert("✅ Producto subido correctamente");
      navigate("/productos");
    } catch (err) {
      console.error("Error subiendo producto:", err);
      alert("⚠️ Hubo un error al subir el producto");
    }
  };

  if (!user) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando...</p>;
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Subir nuevo producto
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        ></textarea>

        <input
          name="image"
          placeholder="URL de imagen"
          value={form.image}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="Precio aproximado"
          value={form.price}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#00bfa5",
            color: "white",
            border: "none",
            padding: "0.7rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Subir producto
        </button>
      </form>

      <Link
        to="/productos"
        style={{ marginTop: "1rem", display: "inline-block", color: "#555" }}
      >
        ⬅ Volver al catálogo
      </Link>
    </div>
  );
}

export default UploadProduct;