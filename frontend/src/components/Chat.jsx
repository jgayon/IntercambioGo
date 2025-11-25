import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Chat() {
  const { id } = useParams();          // id del intercambio (tradeId)
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Cargar usuario y mensajes desde el backend
  useEffect(() => {
    const logged = localStorage.getItem("loggedIn");
    if (!logged) {
      navigate("/login");
      return;
    }

    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) {
      navigate("/login");
      return;
    }
    setCurrentUser(u);

    const loadMessages = async () => {
      try {
        // GET /api/chat/:tradeId
        const { data } = await API.get(`/chat/${id}`);
        // data = [{ id, trade_id, sender_id, message, created_at, sender_name }, ...]
        setMessages(data);
      } catch (err) {
        console.error("Error cargando mensajes:", err);
      }
    };

    loadMessages();
  }, [id, navigate]);

  const send = async () => {
    if (!text.trim() || !currentUser) return;

    try {
      // POST /api/chat
      const { data: newMsg } = await API.post("/chat", {
        trade_id: Number(id),
        sender_id: currentUser.id,
        message: text,
      });

      // newMsg viene del backend con sender_name, created_at, etc.
      setMessages((prev) => [...prev, newMsg]);
      setText("");
    } catch (err) {
      console.error("Error enviando mensaje:", err);
      alert("No se pudo enviar el mensaje");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <Link to="/mis-intercambios">⬅ Volver</Link>

      <h2>💬 Chat del intercambio #{id}</h2>

      <div
        style={{
          background: "#f0f0f0",
          padding: "1rem",
          borderRadius: "10px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "1rem",
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: "gray" }}>Aún no hay mensajes.</p>
        )}

        {messages.map((msg) => (
          <div key={msg.id} style={{ margin: "0.5rem 0" }}>
            <strong>
              {msg.sender_name || (msg.sender_id === currentUser?.id ? "Tú" : "Usuario")}:
            </strong>{" "}
            {msg.message}
            <div style={{ fontSize: "0.8rem", color: "gray" }}>
              {new Date(msg.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un mensaje"
        style={{ width: "80%", padding: "0.5rem" }}
      />

      <button
        onClick={send}
        style={{
          width: "18%",
          padding: "0.5rem",
          background: "#00bfa5",
          color: "white",
          border: "none",
          marginLeft: "2%",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Enviar
      </button>
    </div>
  );
}

export default Chat;