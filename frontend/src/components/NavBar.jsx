import { Link } from "react-router-dom";

function Navbar() {
  const loggedIn = localStorage.getItem("loggedIn");

  return (
    <nav style={{
      background: "#00bfa5",
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
      color: "white",
      fontFamily: "Arial"
    }}>
      <h2>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          IntercambioGo
        </Link>
      </h2>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/productos" style={{ color: "white" }}>Productos</Link>

        {loggedIn && (
          <Link to="/mis-intercambios" style={{ color: "white" }}>
            Intercambios
          </Link>
        )}

        {loggedIn ? (
          <Link to="/perfil" style={{ color: "white" }}>Mi Perfil</Link>
        ) : (
          <Link to="/login" style={{ color: "white" }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
