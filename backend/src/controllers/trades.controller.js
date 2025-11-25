// src/controllers/trades.controllers.js
import { db } from "../config/db.js";

// Obtener todos los intercambios con info de productos y usuarios
export const getTrades = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        t.*,
        up.title AS user_product_title,
        rp.title AS target_product_title,
        u1.name AS requester_name,
        u2.name AS receiver_name
      FROM trades t
      JOIN products up ON t.user_product_id = up.id
      JOIN products rp ON t.target_product_id = rp.id
      JOIN users u1 ON t.requester_id = u1.id
      JOIN users u2 ON t.receiver_id = u2.id
    `);

    return res.json(rows);
  } catch (err) {
    console.error("Error en getTrades:", err);
    return res
      .status(500)
      .json({ ok: false, msg: "Error al obtener los intercambios" });
  }
};

// Crear un nuevo intercambio
export const createTrade = async (req, res) => {
  const { user_product_id, target_product_id, requester_id, receiver_id } =
    req.body;

  try {
    const [result] = await db.query(
      `
      INSERT INTO trades (user_product_id, target_product_id, requester_id, receiver_id)
      VALUES (?, ?, ?, ?)
      `,
      [user_product_id, target_product_id, requester_id, receiver_id]
    );

    const insertedId = result.insertId;

    const [rows] = await db.query(
      `
      SELECT 
        t.*,
        up.title AS user_product_title,
        rp.title AS target_product_title,
        u1.name AS requester_name,
        u2.name AS receiver_name
      FROM trades t
      JOIN products up ON t.user_product_id = up.id
      JOIN products rp ON t.target_product_id = rp.id
      JOIN users u1 ON t.requester_id = u1.id
      JOIN users u2 ON t.receiver_id = u2.id
      WHERE t.id = ?
      `,
      [insertedId]
    );

    return res.json(rows[0]);
  } catch (err) {
    console.error("Error en createTrade:", err);
    return res
      .status(500)
      .json({ ok: false, msg: "Error al crear el intercambio" });
  }
};

// Actualizar el estado de un intercambio
export const updateTradeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // pendiente | aceptado | rechazado

  try {
    await db.query(
      `
      UPDATE trades 
      SET status = ?
      WHERE id = ?
      `,
      [status, id]
    );

    // Volvemos a traer el registro actualizado
    const [rows] = await db.query(
      `
      SELECT 
        t.*,
        up.title AS user_product_title,
        rp.title AS target_product_title,
        u1.name AS requester_name,
        u2.name AS receiver_name
      FROM trades t
      JOIN products up ON t.user_product_id = up.id
      JOIN products rp ON t.target_product_id = rp.id
      JOIN users u1 ON t.requester_id = u1.id
      JOIN users u2 ON t.receiver_id = u2.id
      WHERE t.id = ?
      `,
      [id]
    );

    return res.json(rows[0]);
  } catch (err) {
    console.error("Error en updateTradeStatus:", err);
    return res
      .status(500)
      .json({ ok: false, msg: "Error al actualizar el estado del intercambio" });
  }
};