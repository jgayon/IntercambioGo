import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      // 👇 AHORA: leer desde tu backend real
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Error obteniendo producto:", err);
      navigate("/productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate(-1)}>⬅ Volver</button>

      <h1>{product.title}</h1>

      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "400px",
          borderRadius: "10px",
          marginBottom: "1rem",
        }}
      />

      <p><strong>Descripción:</strong> {product.description}</p>
      <p><strong>Precio:</strong> 💲 {product.price}</p>
      <p><strong>Propietario:</strong> {product.owner_name}</p>

      {/* 👇 Datos coherentes con tu modelo relacional */}
      <p><strong>Publicado por usuario ID:</strong> {product.owner_id}</p>

      <button
        style={{
          backgroundColor: "#00bfa5",
          color: "white",
          padding: "0.7rem 1rem",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/intercambios?producto=${id}`)}
      >
        🔄 Proponer intercambio
      </button>
    </div>
  );
}

export default ProductDetail;