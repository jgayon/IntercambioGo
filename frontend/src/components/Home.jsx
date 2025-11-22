import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #00bfa5, #1de9b6)',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        ♻️ IntercambioGo
      </h1>
      <p style={{ fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
        Promueve el consumo sostenible mediante el intercambio de ropa, libros, accesorios y más.
        Conéctate con personas cercanas y da nueva vida a los objetos que ya no usas.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/productos">
          <button style={{
            backgroundColor: '#fff',
            color: '#00bfa5',
            border: 'none',
            borderRadius: '25px',
            padding: '0.8rem 1.5rem',
            margin: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            🌿 Explorar Productos
          </button>
        </Link>
        <Link to="/login">
          <button style={{
            backgroundColor: '#004d40',
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            padding: '0.8rem 1.5rem',
            margin: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            👤 Iniciar Sesión / Crear Cuenta
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;