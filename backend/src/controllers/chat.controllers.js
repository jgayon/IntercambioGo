import { db } from "../config/db.js";

export const getMessages = async (req, res) => {
  const { tradeId } = req.params;
  const result = await db.query(`
    SELECT m.*, u.name AS sender_name
    FROM messages m
    JOIN users u ON m.sender_id = u.id
    WHERE m.trade_id=$1
    ORDER BY m.created_at ASC
  `, [tradeId]);

  res.json(result.rows);
};

export const sendMessage = async (req, res) => {
  const { trade_id, sender_id, message } = req.body;

  const result = await db.query(`
    INSERT INTO messages (trade_id, sender_id, message)
    VALUES ($1,$2,$3) RETURNING *
  `, [trade_id, sender_id, message]);

  res.json(result.rows[0]);
};
