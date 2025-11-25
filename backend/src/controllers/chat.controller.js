// src/controllers/chat.controllers.js
import { db } from "../config/db.js";

// Obtener mensajes de un intercambio
export const getMessages = async (req, res) => {
  const { tradeId } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT m.*, u.name AS sender_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.trade_id = ?
      ORDER BY m.created_at ASC
      `,
      [tradeId]
    );

    return res.json(rows);
  } catch (err) {
    console.error("Error en getMessages:", err);
    return res
      .status(500)
      .json({ ok: false, msg: "Error al obtener los mensajes" });
  }
};

// Enviar mensaje
export const sendMessage = async (req, res) => {
  const { trade_id, sender_id, message } = req.body;

  try {
    const [result] = await db.query(
      `
      INSERT INTO messages (trade_id, sender_id, message)
      VALUES (?, ?, ?)
      `,
      [trade_id, sender_id, message]
    );

    const insertedId = result.insertId;

    const [rows] = await db.query(
      `
      SELECT m.*, u.name AS sender_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.id = ?
      `,
      [insertedId]
    );

    return res.json(rows[0]);
  } catch (err) {
    console.error("Error en sendMessage:", err);
    return res
      .status(500)
      .json({ ok: false, msg: "Error al enviar mensaje" });
  }
};