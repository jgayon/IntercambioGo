import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function UploadProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    price: ""
  });

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/login");
      return;
    }
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) return;

    const existing = JSON.parse(localStorage.getItem("myProducts") || "[]");

    const newProduct = {
      ...form,
      id: Date.now(),
      owner: user.email,            // 👈 dueño único del producto
      ownerName: user.name,         // 👈 nombre del dueño
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("myProducts", JSON.stringify([...existing, newProduct]));

    alert("Producto subido con éxito ✔");
    navigate("/productos");
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>📤 Subir Producto</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Título"
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <textarea
          name="description"
          placeholder="Descripción"
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        ></textarea>

        <input
          name="image"
          placeholder="URL de imagen"
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <input
          name="price"
          type="number"
          placeholder="Precio estimado"
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.7rem",
            background: "#00bfa5",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Subir producto
        </button>
      </form>

      <Link to="/productos" style={{ marginTop: "1rem", display: "inline-block" }}>
        ⬅ Volver al catálogo
      </Link>
    </div>
  );
}

export default UploadProduct;
