import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const description = product?.description || "";

  // Solo agregamos "..." si la descripción es más larga de 60 caracteres
  const shortDescription =
    description.length > 60
      ? `${description.slice(0, 60)}...`
      : description;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
      }}
    >
      <Link
        to={`/producto/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "5px",
            marginBottom: "0.8rem",
          }}
        />

        <h3 style={{ margin: "0.5rem 0", color: "#333" }}>
          {product.title}
        </h3>

        <p style={{ color: "#666", fontSize: "0.9rem", minHeight: "50px" }}>
          {shortDescription}
        </p>

        <strong style={{ color: "#e74c3c", fontSize: "1.2rem" }}>
          💲 {product.price}
        </strong>

        <div style={{ marginTop: "0.8rem" }}>
          <button
            style={{
              backgroundColor: "#00bfa5",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Ver detalles
          </button>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;