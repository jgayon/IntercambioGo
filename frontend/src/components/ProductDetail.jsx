import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const myProducts = JSON.parse(localStorage.getItem("myProducts") || "[]");

  useEffect(() => {
    const local = myProducts.find(p => p.id === Number(id));

    if (local) {
      setProduct(local);
    } else {
      fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <Link to="/productos">⬅ Volver</Link>

      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        <img
          src={product.image || product.thumbnail}
          alt={product.title}
          style={{ width: "300px", borderRadius: "10px" }}
        />

        <div>
          <h2>{product.title}</h2>

          {product.owner && (
            <p>
              <strong>Vendedor:</strong> {product.ownerName} ({product.owner})
            </p>
          )}

          <p>{product.description}</p>

          <p><strong>Precio estimado:</strong> 💲{product.price}</p>

          <Link to={`/intercambios?producto=${id}`}>
            <button style={{
              padding: "0.7rem 1rem",
              background: "#00bfa5",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}>
              ♻ Iniciar Intercambio
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
