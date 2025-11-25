// // src/pages/IntercambioPanel.jsx (por ejemplo)
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../api/axios";

// const IntercambioPanel = () => {
//   const [trades, setTrades] = useState([]);
//   const navigate = useNavigate();

//   const fetchTrades = async () => {
//     try {
//       const res = await API.get("/trades");
//       setTrades(res.data);
//     } catch (err) {
//       console.error("Error obteniendo intercambios:", err);
//     }
//   };

//   useEffect(() => {
//     const loggedIn = localStorage.getItem("loggedIn");
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!loggedIn || !user) {
//       navigate("/login");
//       return;
//     }

//     fetchTrades();
//   }, [navigate]);

//   const handleDecision = async (id, status) => {
//     try {
//       const res = await API.put(`/trades/${id}`, { status });

//       // Si se acepta el intercambio, sumamos puntos al receptor
//       if (status === "aceptado") {
//         await API.post("/membership/addpoints", {
//           userId: res.data.receiver_id,
//           points: 50,
//         });
//       }

//       // Volver a cargar la lista actualizada
//       fetchTrades();
//     } catch (err) {
//       console.error("Error actualizando intercambio:", err);
//     }
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <Link to="/productos">⬅ Volver</Link>
//       <h1>Mis Intercambios</h1>

//       {trades.length === 0 ? (
//         <p>No tienes intercambios todavía.</p>
//       ) : (
//         trades.map((t) => (
//           <div key={t.id} style={{ marginBottom: "1rem" }}>
//             <p>
//               <strong>{t.user_product_title}</strong> →{" "}
//               <strong>{t.target_product_title}</strong> ({t.status})
//             </p>

//             {t.status === "pendiente" && (
//               <>
//                 <button onClick={() => handleDecision(t.id, "aceptado")}>
//                   ✔ Aceptar
//                 </button>
//                 <button onClick={() => handleDecision(t.id, "rechazado")}>
//                   ✖ Rechazar
//                 </button>
//               </>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default IntercambioPanel;

import React from 'react';
import { Link } from 'react-router-dom';

function IntercambioPanel() {
  // --- Estilos de la página de Intercambios ---
  const panelStyle = {
    padding: '2rem 5vw 4rem', // Espacio alrededor del contenido
    color: '#f9fafb', // Color de texto claro para el fondo oscuro
    minHeight: 'calc(100vh - 120px)', // Para asegurar que ocupe la mayor parte de la pantalla
  };

  const backLinkStyle = {
    display: 'block',
    marginBottom: '2rem',
    color: '#00bfa5', // El color principal de IntercambioGo
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: 'white',
  };

  const emptyStateStyle = {
    fontSize: '1.1rem',
    color: '#9ca3af', // Gris más claro
    marginTop: '1.5rem',
  };

  // El Footer con el texto de copyright (simulando la barra verde oscura en la parte inferior)
  // Aunque el footer ya existe en App.jsx, aquí lo simularemos para el contenido
  const footerSimStyle = {
    backgroundColor: '#009688', // Un tono más oscuro que el Navbar
    color: 'white',
    padding: '1rem',
    fontSize: '0.9rem',
    textAlign: 'center',
    marginTop: 'auto', // Empuja al final si el contenido es corto
  };
  
  return (
    // Usamos 'main' en App.jsx, aquí solo la estructura interna
    <div style={panelStyle}>
      {/* Enlace para volver */}
      <Link to="/" style={backLinkStyle}>
        ← Volver
      </Link>

      {/* Título principal */}
      <h1 style={titleStyle}>
        Mis Intercambios
      </h1>

      {/* Contenido/Estado */}
      <div style={emptyStateStyle}>
        <p>No tienes intercambios todavía.</p>
        
        {/* Aquí iría la lógica para renderizar la lista de intercambios si existen */}
      </div>

      {/* Nota: El Footer con el copyright se renderiza fuera de este componente 
          en App.jsx, pero si deseas que se parezca exactamente al de la imagen
          (como una barra que termina la sección principal), 
          podríamos envolver el contenido en un contenedor de página 
          y asegurarnos de que el Footer real se vea así.
          
          Por ahora, asumimos que el Footer se renderiza correctamente con la barra verde. 
          Si tu footer no tiene la barra verde, por favor ajusta el componente Footer.jsx.
      */}
    </div>
  );
}

export default IntercambioPanel;