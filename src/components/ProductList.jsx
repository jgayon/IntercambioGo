import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=10')
      .then((response) => {
        if (!response.ok) throw new Error('Error al cargar productos');
        return response.json();
      })
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>🔄 Cargando productos...</p>;
  if (error) return <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>❌ Error: {error}</p>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🛒 Catálogo de Productos</h1>

      {/* 🔙 Enlace Volver */}
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" style={{
          color: '#00bfa5',
          textDecoration: 'underline',
          fontWeight: 'bold'
        }}>
          Volver
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem'
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;