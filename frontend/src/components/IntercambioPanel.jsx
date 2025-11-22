import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function IntercambioPanel() {
  const [trades, setTrades] = useState([]);

  const fetchTrades = async () => {
    const res = await API.get("/trades");
    setTrades(res.data);
  };

  useEffect(() => { fetchTrades(); }, []);

  const handleDecision = async (id, status) => {
    const res = await API.put(`/trades/${id}`, { status });
    if (status === "aceptado") {
      await API.post("/membership/addpoints", { userId: res.data.receiver_id, points: 50 });
    }
    fetchTrades();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/">⬅ Volver</Link>
      <h1>Mis Intercambios</h1>
      {trades.map(t => (
        <div key={t.id}>
          <p>{t.user_product_title} → {t.target_product_title} ({t.status})</p>
          {t.status === "pendiente" && (
            <>
              <button onClick={() => handleDecision(t.id, "aceptado")}>✔ Aceptar</button>
              <button onClick={() => handleDecision(t.id, "rechazado")}>✖ Rechazar</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default IntercambioPanel;
