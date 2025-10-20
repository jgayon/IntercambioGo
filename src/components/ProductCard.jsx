function ProductCard({ product }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      borderRadius: '5px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <img 
        src={product.thumbnail} 
        alt={product.title}
        style={{ 
          width: '100%', 
          height: '200px', 
          objectFit: 'cover',
          borderRadius: '3px'
        }} 
      />
      <h3 style={{ margin: '0.5rem 0', color: '#333' }}>
        {product.title}
      </h3>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>
        {product.description}
      </p>
      <strong style={{ color: '#e74c3c', fontSize: '1.2rem' }}>
        💲 {product.price}
      </strong>
    </div>
  );
}

export default ProductCard;