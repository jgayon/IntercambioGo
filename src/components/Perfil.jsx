import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Perfil() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      navigate('/');
      return;
    }
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/');
  };

  if (!user) return <p style={{ textAlign: 'center' }}>Cargando...</p>;

  return (
    <div style={{
      maxWidth: '400px',
      margin: '3rem auto',
      backgroundColor: '#f9f9f9',
      padding: '2rem',
      borderRadius: '10px',
      textAlign: 'center'
    }}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="Foto de perfil"
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '1rem'
        }}
      />
      <h2>{user.name}</h2>
      <p>📧 {user.email}</p>

      <button
        onClick={() => navigate('/editar-perfil')}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '0.6rem 1rem',
          borderRadius: '5px',
          marginTop: '1rem',
          cursor: 'pointer'
        }}
      >
        ✏️ Editar perfil
      </button>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          padding: '0.6rem 1rem',
          borderRadius: '5px',
          marginTop: '1rem',
          marginLeft: '1rem',
          cursor: 'pointer'
        }}
      >
        🔒 Cerrar sesión
      </button>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/" style={{ textDecoration: 'underline', color: 'gray' }}>
          Volver al Home
        </Link>
      </div>
    </div>
  );
}

export default Perfil;