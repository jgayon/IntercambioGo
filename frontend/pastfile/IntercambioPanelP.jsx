import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function IntercambioPanel() {
  const [trades, setTrades] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem("loggedIn");
    if (!logged) {
      navigate("/");
      return;
    }

    const u = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(u);

    const storedTrades = JSON.parse(localStorage.getItem("trades") || "[]");
    setTrades(storedTrades);
  }, []);

  const updateTrades = (updated) => {
    setTrades(updated);
    localStorage.setItem("trades", JSON.stringify(updated));
  };

  const handleDecision = (id, status) => {
    const updated = trades.map((t) => {
        if (t.id !== id) return t;

        if (status === "aceptado") {
        // SUMAR PUNTOS AL USUARIO
        let currentUser = JSON.parse(localStorage.getItem("user"));
        currentUser.points = (currentUser.points || 0) + 50;
        localStorage.setItem("user", JSON.stringify(currentUser));
        }

        return { ...t, status };
    });

    updateTrades(updated);
    };


  if (!currentUser) return <p>Cargando...</p>;

  const enviados = trades.filter(t => t.userProduct.owner === currentUser.email);
  const recibidos = trades.filter(t => t.targetProduct.owner === currentUser.email);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <Link to="/">⬅ Volver</Link>
      <h1>♻ Mis Intercambios</h1>

      {/* ENVIADOS */}
      <h2>📤 Enviados</h2>
      {enviados.length === 0 ? (
        <p>No has enviado solicitudes.</p>
      ) : enviados.map(t => (
        <div key={t.id} style={{
          background: "#f7f7f7",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem"
        }}>
          <p><strong>Producto ofrecido:</strong> {t.userProduct.title}</p>
          <p><strong>Producto objetivo:</strong> {t.targetProduct.title}</p>
          <p><strong>Estado:</strong> {t.status}</p>

          <button
            onClick={() => navigate(`/chat/${t.id}`)}
            style={{
              background: "#00bfa5",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            💬 Chat
          </button>
        </div>
      ))}

      {/* RECIBIDOS */}
      <h2>📥 Recibidos</h2>
      {recibidos.length === 0 ? (
        <p>No tienes solicitudes recibidas.</p>
      ) : recibidos.map(t => (
        <div key={t.id} style={{
          background: "#eef6ff",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem"
        }}>
          <p><strong>Tu producto:</strong> {t.targetProduct.title}</p>
          <p><strong>Te ofrecen:</strong> {t.userProduct.title}</p>
          <p><strong>Estado:</strong> {t.status}</p>

          {t.status === "pendiente" && (
            <div>
              <button
                onClick={() => handleDecision(t.id, "aceptado")}
                style={{
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  marginRight: "0.5rem"
                }}
              >
                ✔ Aceptar
              </button>

              <button
                onClick={() => handleDecision(t.id, "rechazado")}
                style={{
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px"
                }}
              >
                ✖ Rechazar
              </button>
            </div>
          )}

          <button
            onClick={() => navigate(`/chat/${t.id}`)}
            style={{
              background: "#00bfa5",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              marginTop: "0.5rem"
            }}
          >
            💬 Chat
          </button>
        </div>
      ))}
    </div>
  );
}

export default IntercambioPanel;
