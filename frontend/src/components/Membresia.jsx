import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { getMembershipLevel, getNextLevel } from "../utils/membership";

const Membresia = () => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const stored = localStorage.getItem("user");

    if (!loggedIn || !stored) {
      navigate("/login");
      return;
    }

    const u = JSON.parse(stored);
    setUser(u);

    const fetchMembership = async () => {
      try {
        const res = await API.get(`/membership/${u.id}`);

        const backendPoints = res.data.points ?? 0;
        const backendLevel = res.data.level ?? "";

        setPoints(backendPoints);
        setLevel(backendLevel);  // 👈 usar lo que manda el backend

        const updatedUser = { ...u, points: backendPoints };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (err) {
        console.error("Error obteniendo membresía:", err);
        const fallbackPoints = u.points ?? 0;
        setPoints(fallbackPoints);
        setLevel(getMembershipLevel(fallbackPoints)); // opcional
      } finally {
        setLoading(false);
      }
    };

    fetchMembership();
  }, [navigate]);

  if (loading || !user) {
    return <p style={{ padding: "2rem" }}>Cargando información de membresía...</p>;
  }

  const next = getNextLevel(points);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mi Membresía</h1>
      <p><strong>Usuario:</strong> {user.name}</p>
      <p><strong>Puntos actuales:</strong> {points}</p>
      <p><strong>Nivel actual:</strong> {level}</p>

      {next && next.remaining > 0 ? (
        <p>
          Te faltan <strong>{next.remaining}</strong> puntos para subir al nivel{" "}
          <strong>{next.next}</strong>.
        </p>
      ) : (
        <p>🎉 ¡Ya alcanzaste el nivel máximo Premium!</p>
      )}
    </div>
  );
};

export default Membresia;