import { db } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  const result = await db.query(`
    SELECT p.*, u.name AS owner_name, u.email AS owner_email
    FROM products p
    JOIN users u ON p.owner_id = u.id
  `);
  res.json(result.rows);
};

export const createProduct = async (req, res) => {
  const { title, description, price, image, owner_id } = req.body;

  const result = await db.query(
    `INSERT INTO products (title, description, price, image, owner_id)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [title, description, price, image, owner_id]
  );

  res.json(result.rows[0]);
};
