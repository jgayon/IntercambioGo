// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from "../api/axios";

// function LoginRegister() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     if (isLogin) {
//   //       const res = await API.post("/auth/login", { email: formData.email, password: formData.password });
//   //       localStorage.setItem("token", res.data.token);
//   //       localStorage.setItem("user", JSON.stringify(res.data.user));
//   //       alert(`✅ Bienvenido ${res.data.user.name}`);
//   //       navigate("/perfil");
//   //     } else {
//   //       const res = await API.post("/auth/register", { name: formData.name, email: formData.email, password: formData.password });
//   //       localStorage.setItem("token", res.data.token);
//   //       localStorage.setItem("user", JSON.stringify(res.data.user));
//   //       alert(`🎉 Usuario registrado: ${res.data.user.name}`);
//   //       navigate("/perfil");
//   //     }
//   //   } catch (err) {
//   //     alert(err.response?.data?.msg || "Error de autenticación");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isLogin) {
//         const res = await API.post("/auth/login", {
//           email: formData.email,
//           password: formData.password
//         });

//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         localStorage.setItem("loggedIn", "true");   // 👉 AQUÍ

//         alert(`✅ Bienvenido ${res.data.user.name}`);
//         navigate("/perfil");
//       } else {
//         const res = await API.post("/auth/register", {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password
//         });

//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         localStorage.setItem("loggedIn", "true");   // 👉 Y AQUÍ TAMBIÉN

//         alert(`🎉 Usuario registrado: ${res.data.user.name}`);
//         navigate("/perfil");
//       }
//     } catch (err) {
//       alert(err.response?.data?.msg || "Error de autenticación");
//     }
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #1de9b6, #00bfa5)' }}>
//       <div style={{ background: '#fff', padding: '2rem 3rem', borderRadius: '10px', width: '400px' }}>
//         <h2 style={{ textAlign: 'center', color: '#00bfa5' }}>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <div style={{ marginBottom: '1rem' }}>
//               <label>Nombre completo</label>
//               <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//             </div>
//           )}
//           <div style={{ marginBottom: '1rem' }}>
//             <label>Correo electrónico</label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//           </div>
//           <div style={{ marginBottom: '1rem' }}>
//             <label>Contraseña</label>
//             <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//           </div>
//           <button type="submit">{isLogin ? 'Entrar' : 'Registrarse'}</button>
//         </form>
//         <div style={{ textAlign: 'center', marginTop: '1rem' }}>
//           {isLogin ? (
//             <span onClick={() => setIsLogin(false)}>Regístrate aquí</span>
//           ) : (
//             <span onClick={() => setIsLogin(true)}>Inicia sesión</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginRegister;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Importar Link para el enlace de registro

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true); // Controla si es login o registro
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Aquí iría tu lógica de autenticación (ej. llamada a una API)
    console.log("Intentando iniciar sesión...");
    localStorage.setItem("loggedIn", "true"); // Simula un inicio de sesión exitoso
    navigate("/perfil"); // Redirige al perfil después del login
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    // Aquí iría tu lógica de registro
    console.log("Intentando registrar usuario...");
    // Podrías redirigir al login o directamente al perfil después del registro
    setIsLogin(true); // Después del registro, redirige al formulario de login
    alert("¡Registro exitoso! Por favor, inicia sesión.");
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem", // Espacio entre elementos del formulario
    width: "100%", // Asegura que el formulario ocupe el ancho disponible de la tarjeta
  };

  const inputStyle = {
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box", // Asegura que el padding no aumente el ancho total
    color: "#374151", // Color de texto para inputs
    backgroundColor: "#f9fafb", // Fondo claro para inputs
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    borderRadius: "0.375rem",
    border: "none",
    backgroundColor: "#00bfa5", // Color principal de IntercambioGo
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    width: "100%",
    boxSizing: "border-box",
  };

  const buttonHoverStyle = {
    backgroundColor: "#009688", // Un tono un poco más oscuro al pasar el ratón
  };

  const toggleLinkStyle = {
    color: "#00bfa5",
    textDecoration: "none",
    fontSize: "0.9rem",
    marginTop: "1rem",
    textAlign: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 120px)", // Ajusta para el Navbar y Footer
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2.5rem",
          borderRadius: "0.75rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          maxWidth: "400px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#333", // Un color oscuro para el título
          textAlign: "center",
        }}>
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </h2>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} style={formStyle}>
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Contraseña"
              required
              style={inputStyle}
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
            >
              Entrar
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} style={formStyle}>
            <input
              type="text"
              placeholder="Nombre de usuario"
              required
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Contraseña"
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              required
              style={inputStyle}
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
            >
              Registrarse
            </button>
          </form>
        )}

        <Link
          to="#"
          onClick={() => setIsLogin(!isLogin)}
          style={toggleLinkStyle}
        >
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </Link>
      </div>
    </div>
  );
}

export default LoginRegister;