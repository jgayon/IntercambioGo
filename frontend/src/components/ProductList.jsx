// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import ProductCard from "./ProductCard";

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProducts = async () => {
//     try {
//       // 👇 AHORA SI: tu backend real
//       const res = await API.get("/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Error obteniendo productos:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   if (loading) return <p style={{ textAlign: "center" }}>Cargando productos...</p>;

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h1>Catálogo de Productos</h1>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//           gap: "1rem",
//         }}
//       >
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductList;

import React from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  // --- Estilos de la página de Productos ---
  const pageStyle = {
    padding: '2rem 5vw 4rem', // Espacio alrededor del contenido
    color: '#f9fafb', // Color de texto claro para el fondo oscuro
    minHeight: 'calc(100vh - 120px)', // Para asegurar que ocupe la mayor parte de la pantalla
    boxSizing: 'border-box',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: 'white', // Color blanco para que contraste con el fondo oscuro
  };

  // Aquí iría el resto del contenido del catálogo, como filtros y la cuadrícula de productos.
  
  return (
    <div style={pageStyle}>
      {/* Título principal */}
      <h1 style={titleStyle}>
        Catálogo de Productos
      </h1>

      {/* Aquí iría la cuadrícula de productos y la lógica de filtrado/búsqueda */}
      <div style={{ marginTop: '2rem' }}>
        {/* Simulación del contenido de la lista de productos */}
        <p style={{ color: '#9ca3af' }}>Cargando productos...</p>
      </div>
      
      {/* Si usas clases CSS, usa:
          <h1 className="catalog-title">Catálogo de Productos</h1>
      */}
    </div>
  );
}

export default ProductList;