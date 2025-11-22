import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

function ProductList() {
  const [externalProducts, setExternalProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=15')
      .then(res => res.json())
      .then(data => setExternalProducts(data.products))
      .finally(() => setLoading(false));

    const local = JSON.parse(localStorage.getItem("myProducts") || "[]");
    setMyProducts(local);
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando...</p>;

  const allProducts = [
    ...myProducts.map(p => ({
      ...p,
      isLocal: true
    })),
    ...externalProducts.map(p => ({ ...p, isLocal: false }))
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛒 Catálogo de Productos</h1>

      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" style={{ color: '#00bfa5', textDecoration: 'underline' }}>
          Volver al Home
        </Link>
      </div>

      <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
        <Link to="/subir-producto">
          <button style={{
            background: "#00bfa5",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            ➕ Subir Producto
          </button>
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        {allProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
