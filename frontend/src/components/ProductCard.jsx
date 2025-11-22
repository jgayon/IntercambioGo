import { Link } from "react-router-dom";

function ProductCard({ product }) {
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
            height: "200px",
            objectFit: "cover",
            borderRadius: "5px",
            marginBottom: "0.8rem",
          }}
        />

        <h3 style={{ margin: "0.5rem 0", color: "#333" }}>
          {product.title}
        </h3>

        <p style={{ color: "#666", fontSize: "0.9rem", minHeight: "50px" }}>
          {product.description.slice(0, 60)}...
        </p>

        <strong style={{ color: "#e74c3c", fontSize: "1.2rem" }}>
          💲 {product.price}
        </strong>

        <div style={{ marginTop: "0.8rem" }}>
          <button
            style={{
              width: "100%",
              padding: "0.6rem",
              backgroundColor: "#00bfa5",
              color: "white",
              border: "none",
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
