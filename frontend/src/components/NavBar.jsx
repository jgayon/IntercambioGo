// import { Link } from "react-router-dom";

// function Navbar() {
//   const loggedIn = localStorage.getItem("loggedIn");

//   return (
//     <nav style={{
//       background: "#00bfa5",
//       padding: "1rem",
//       display: "flex",
//       justifyContent: "space-between",
//       color: "white",
//       fontFamily: "Arial"
//     }}>
//       <h2>
//         <Link to="/" style={{ color: "white", textDecoration: "none" }}>
//           IntercambioGo
//         </Link>
//       </h2>

//       <div style={{ display: "flex", gap: "1rem" }}>
//         <Link to="/productos" style={{ color: "white" }}>Productos</Link>

//         {loggedIn && (
//           <Link to="/mis-intercambios" style={{ color: "white" }}>
//             Intercambios
//           </Link>
//         )}

//         {loggedIn ? (
//           <Link to="/perfil" style={{ color: "white" }}>Mi Perfil</Link>
//         ) : (
//           <Link to="/login" style={{ color: "white" }}>Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// import { Link } from "react-router-dom";

// function Navbar() {
//   const loggedIn = localStorage.getItem("loggedIn");

//   return (
//     <nav
//       style={{
//         background: "#00bfa5",
//         padding: "1rem 3rem",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         color: "white",
//         fontFamily: "Arial, system-ui, sans-serif",
//       }}
//     >
//       {/* Logo / nombre */}
//       <h2 style={{ margin: 0 }}>
//         <Link
//           to="/"
//           style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
//         >
//           IntercambioGo
//         </Link>
//       </h2>

//       {/* Links de navegación */}
//       <div
//         style={{
//           display: "flex",
//           gap: "2rem",
//           alignItems: "center",
//           fontSize: "1rem",
//         }}
//       >
//         <Link to="/productos" style={{ color: "white", textDecoration: "none" }}>
//           Productos
//         </Link>

//         {/* 👉 ESTE ES EL LINK QUE FALTABA */}
//         <Link
//           to="/intercambios"
//           style={{ color: "white", textDecoration: "none" }}
//         >
//           Intercambios
//         </Link>

//         {loggedIn ? (
//           <Link
//             to="/perfil"
//             style={{ color: "white", textDecoration: "none" }}
//           >
//             Mi Perfil
//           </Link>
//         ) : (
//           <Link
//             to="/login"
//             style={{ color: "white", textDecoration: "none" }}
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// import { Link } from "react-router-dom";

// function Navbar() {
//   const loggedIn = localStorage.getItem("loggedIn");

//   return (
//     <nav
//       style={{
//         background: "#00bfa5",
//         padding: "1rem 3rem",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         color: "white",
//         fontFamily: "Arial, system-ui, sans-serif",
//       }}
//     >
//       {/* Logo / nombre */}
//       <h2 style={{ margin: 0 }}>
//         <Link
//           to="/"
//           style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
//         >
//           IntercambioGo
//         </Link>
//       </h2>

//       {/* Links de navegación */}
//       <div
//         style={{
//           display: "flex",
//           gap: "2rem",
//           alignItems: "center",
//           fontSize: "1rem",
//         }}
//       >
//         <Link to="/productos" style={{ color: "white", textDecoration: "none" }}>
//           Productos
//         </Link>

//         {/* Link condicional: Intercambios solo si está logueado */}
//         {loggedIn && (
//           <Link
//             to="/mis-intercambios" // Usar la ruta correcta del panel
//             style={{ color: "white", textDecoration: "none" }}
//           >
//             Intercambios
//           </Link>
//         )}

//         {loggedIn ? (
//           <Link
//             to="/perfil"
//             style={{ color: "white", textDecoration: "none" }}
//           >
//             Mi Perfil
//           </Link>
//         ) : (
//           <Link
//             to="/login"
//             style={{ color: "white", textDecoration: "none" }}
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link } from "react-router-dom";

function Navbar() {
  const loggedIn = localStorage.getItem("loggedIn");

  return (
    <nav
      style={{
        background: "#00bfa5",
        padding: "1rem 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        fontFamily: "Arial, system-ui, sans-serif",
      }}
    >
      {/* Logo / nombre */}
      <h2 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
        >
          IntercambioGo
        </Link>
      </h2>

      {/* Links de navegación */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          fontSize: "1rem",
        }}
      >
        <Link to="/productos" style={{ color: "white", textDecoration: "none" }}>
          Productos
        </Link>

        {/* Link condicional: Intercambios solo si está logueado */}
        {loggedIn && (
          <Link
            to="/mis-intercambios" // Usar la ruta correcta del panel
            style={{ color: "white", textDecoration: "none" }}
          >
            Intercambios
          </Link>
        )}

        {loggedIn ? (
          <Link
            to="/perfil"
            style={{ color: "white", textDecoration: "none" }}
          >
            Mi Perfil
          </Link>
        ) : (
          <Link
            to="/login"
            style={{ color: "white", textDecoration: "none" }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;