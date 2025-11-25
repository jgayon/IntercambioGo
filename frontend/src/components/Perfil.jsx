// import { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// function Perfil() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedIn = localStorage.getItem('loggedIn');
//     if (!loggedIn) {
//       navigate('/login');
//       return;
//     }
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("loggedIn");
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("myProducts"); // si quieres limpiar también
//     navigate("/");
//   };

//   if (!user) return <p style={{ textAlign: 'center' }}>Cargando...</p>;

//   return (
//     <div style={{
//       maxWidth: '400px',
//       margin: '3rem auto',
//       backgroundColor: '#f9f9f9',
//       padding: '2rem',
//       borderRadius: '10px',
//       textAlign: 'center'
//     }}>
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//         alt="Foto de perfil"
//         style={{
//           width: '120px',
//           height: '120px',
//           borderRadius: '50%',
//           objectFit: 'cover',
//           marginBottom: '1rem'
//         }}
//       />
//       <h2>{user.name}</h2>
//       <p>📧 {user.email}</p>

//       <button
//         onClick={() => navigate('/editar-perfil')}
//         style={{
//           backgroundColor: '#007bff',
//           color: 'white',
//           border: 'none',
//           padding: '0.6rem 1rem',
//           borderRadius: '5px',
//           marginTop: '1rem',
//           cursor: 'pointer'
//         }}
//       >
//         ✏️ Editar perfil
//       </button>

//       <button
//         onClick={() => navigate('/membresia')}
//         style={{
//           backgroundColor: '#f1c40f',
//           color: 'white',
//           border: 'none',
//           padding: '0.6rem 1rem',
//           borderRadius: '5px',
//           marginTop: '1rem',
//           cursor: 'pointer'
//         }}
//       >
//         ⭐ Mi Membresía
//       </button>

//       <button
//         onClick={handleLogout}
//         style={{
//           backgroundColor: '#e74c3c',
//           color: 'white',
//           border: 'none',
//           padding: '0.6rem 1rem',
//           borderRadius: '5px',
//           marginTop: '1rem',
//           marginLeft: '1rem',
//           cursor: 'pointer'
//         }}
//       >
//         🔒 Cerrar sesión
//       </button>

//       <div style={{ marginTop: '1rem' }}>
//         <Link to="/" style={{ textDecoration: 'underline', color: 'gray' }}>
//           Volver al Home
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Perfil;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Perfil() {
  const navigate = useNavigate();
  
  // --- Datos de usuario simulados ---
  const userData = {
    username: 'estefania', // Nombre del usuario
    email: 'e.intercambiogo@gmail.com', // Email
    // Podrías añadir más datos aquí
  };

  // --- Estilos para la tarjeta de perfil ---
  const profileCardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    maxWidth: '350px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    margin: '2rem 0', // Añade margen superior e inferior
  };

  // --- Estilos para los botones ---
  const buttonBaseStyle = {
    padding: '0.6rem 1.2rem',
    borderRadius: '0.375rem',
    border: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    width: 'auto',
    flexGrow: 1, // Permite que los botones crezcan en el contenedor
    textDecoration: 'none', // Para Link
    textAlign: 'center',
  };

  const editButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#3b82f6', // Azul (Edit perfil)
    color: 'white',
    marginRight: '0.5rem',
  };

  const membershipButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#facc15', // Amarillo (Mi Membresía)
    color: '#1f2937', // Texto oscuro
    marginLeft: '0.5rem',
  };

  const logoutButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#ef4444', // Rojo (Cerrar sesión)
    color: 'white',
    width: 'calc(100% - 1rem)', // Ocupa todo el ancho del contenedor de botones
    marginTop: '1rem',
  };

  const backHomeLinkStyle = {
    marginTop: '1.5rem',
    color: '#00bfa5', // Color principal de IntercambioGo
    textDecoration: 'none',
    fontSize: '0.9rem',
  };
  
  // --- Función para cerrar sesión ---
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  };

  return (
    <div
      // Contenedor principal para centrar la tarjeta vertical y horizontalmente
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Centra horizontalmente, pero permite que empiece desde arriba
        minHeight: 'calc(100vh - 120px)', // Altura mínima para centrar
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <div style={profileCardStyle}>
        
        {/* Imagen de perfil (icono estático para simular) */}
        <div style={{ marginBottom: '1.5rem', width: '96px', height: '96px' }}>
          {/* Aquí se usa un SVG o una imagen real. Para simular el icono de las imágenes: */}
          <img 
            src="ruta_a_tu_icono_de_perfil.svg" // Reemplaza con la ruta de tu imagen real
            alt="Avatar de usuario"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Nombre de usuario */}
        <h3 
          style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            margin: '0 0 0.5rem 0',
            color: '#333' // Color para que se lea sobre el fondo blanco
          }}
        >
          {userData.username}
        </h3>

        {/* Correo electrónico */}
        <p 
          style={{ 
            fontSize: '1rem', 
            color: '#6b7280', 
            margin: '0 0 1.5rem 0' 
          }}
        >
          {userData.email}
        </p>

        {/* Contenedor de botones primarios */}
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '1rem' }}>
          <Link to="/editar-perfil" style={editButtonStyle}>
            Editar perfil
          </Link>
          <Link to="/membresia" style={membershipButtonStyle}>
            Mi Membresía
          </Link>
        </div>

        {/* Botón Cerrar Sesión */}
        <button onClick={handleLogout} style={logoutButtonStyle}>
          🔒 Cerrar sesión
        </button>

        {/* Enlace Volver al Home */}
        <Link to="/" style={backHomeLinkStyle}>
          Volver al Home
        </Link>
      </div>
    </div>
  );
}

export default Perfil;