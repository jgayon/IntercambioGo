import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function EditarPerfil() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
    alert('✅ Perfil actualizado');
    navigate('/perfil');
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '3rem auto',
      background: '#f8f8f8',
      padding: '2rem',
      borderRadius: '10px'
    }}>
      <h2 style={{ textAlign: 'center' }}>✏️ Editar perfil</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={user.name || ''} onChange={handleChange} placeholder="Nombre completo" /><br/>
        <input name="email" value={user.email || ''} onChange={handleChange} placeholder="Correo" /><br/>
        <input name="password" value={user.password || ''} onChange={handleChange} placeholder="Contraseña" /><br/>
        <button type="submit" style={{
          width: '100%',
          backgroundColor: '#28a745',
          color: 'white',
          padding: '0.6rem',
          border: 'none',
          borderRadius: '5px',
          marginTop: '1rem'
        }}>Guardar</button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/perfil" style={{ textDecoration: 'underline', color: 'gray' }}>Volver</Link>
      </div>
    </div>
  );
}

export default EditarPerfil;