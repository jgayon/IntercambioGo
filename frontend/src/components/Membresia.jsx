import { useEffect, useState } from "react";
import { getMembershipLevel, getNextLevel } from "../utils/membership";
import { Link } from "react-router-dom";

function Membresia() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let u = JSON.parse(localStorage.getItem("user"));
    if (!u.points) u.points = 0; // compatibilidad
    setUser(u);
  }, []);

  if (!user) return <p>Cargando...</p>;

  const level = getMembershipLevel(user.points);
  const next = getNextLevel(user.points);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <Link to="/perfil">⬅ Volver</Link>

      <h1>⭐ Mi Membresía</h1>

      <p><strong>Usuario:</strong> {user.name}</p>
      <p><strong>Puntos:</strong> {user.points}</p>
      <p><strong>Nivel actual:</strong> {level}</p>

      <h3>Progreso hacia el siguiente nivel</h3>
      <p>Necesitas {next.remaining} puntos para llegar a {next.next}</p>

      <div style={{
        width: "100%",
        height: "10px",
        background: "#ccc",
        borderRadius: "5px",
        marginTop: "1rem"
      }}>
        <div
          style={{
            width: `${Math.min((user.points % 100) / 100 * 100, 100)}%`,
            background: "#00bfa5",
            height: "100%",
            borderRadius: "5px"
          }}
        ></div>
      </div>

      <h3 style={{ marginTop: "2rem" }}>🎁 Beneficios</h3>
      <ul>
        {level === "🟢 Básico" && <li>Acceso normal</li>}

        {level === "🔵 Plata" && <>
          <li>Prioridad en intercambios</li>
          <li>Más visibilidad</li>
        </>}

        {level === "🟡 Oro" && <>
          <li>Todos los beneficios de Plata</li>
          <li>Acceso anticipado a productos</li>
        </>}

        {level === "🔥 Premium" && <>
          <li>Máxima visibilidad</li>
          <li>Soporte preferencial</li>
          <li>Acceso anticipado VIP</li>
        </>}
      </ul>
    </div>
  );
}

export default Membresia;
