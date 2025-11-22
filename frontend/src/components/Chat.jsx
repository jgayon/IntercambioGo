import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Chat() {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`chat_${id}`) || "[]");
    setMessages(stored);
  }, [id]);

  const send = () => {
    const newMsg = {
      id: Date.now(),
      text,
      sender: "yo",
      date: new Date().toLocaleString()
    };

    const updated = [...messages, newMsg];
    localStorage.setItem(`chat_${id}`, JSON.stringify(updated));
    setMessages(updated);
    setText("");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <Link to="/intercambios">⬅ Volver</Link>

      <h2>💬 Chat del intercambio #{id}</h2>

      <div style={{
        background: "#f0f0f0",
        padding: "1rem",
        borderRadius: "10px",
        height: "300px",
        overflowY: "auto",
        marginBottom: "1rem"
      }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ margin: "0.5rem 0" }}>
            <strong>{msg.sender}:</strong> {msg.text}
            <div style={{ fontSize: "0.8rem", color: "gray" }}>{msg.date}</div>
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
          borderRadius: "5px"
        }}
      >
        Enviar
      </button>
    </div>
  );
}

export default Chat;
