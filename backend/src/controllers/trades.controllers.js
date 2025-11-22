import { db } from "../config/db.js";

export const getTrades = async (req, res) => {
  const result = await db.query(`
    SELECT t.*, 
      up.title AS user_product_title, rp.title AS target_product_title,
      u1.name AS requester_name, u2.name AS receiver_name
    FROM trades t
    JOIN products up ON t.user_product_id = up.id
    JOIN products rp ON t.target_product_id = rp.id
    JOIN users u1 ON t.requester_id = u1.id
    JOIN users u2 ON t.receiver_id = u2.id
  `);
  res.json(result.rows);
};

export const createTrade = async (req, res) => {
  const { user_product_id, target_product_id, requester_id, receiver_id } = req.body;

  const result = await db.query(`
    INSERT INTO trades (user_product_id, target_product_id, requester_id, receiver_id)
    VALUES ($1,$2,$3,$4) RETURNING *
  `, [user_product_id, target_product_id, requester_id, receiver_id]);

  res.json(result.rows[0]);
};

export const updateTradeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // pendiente | aceptado | rechazado

  const result = await db.query(`
    UPDATE trades SET status=$1 WHERE id=$2 RETURNING *
  `, [status, id]);

  res.json(result.rows[0]);
};
