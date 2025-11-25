// src/controllers/products.controllers.js
import { db } from "../config/db.js";

// Obtener todos los productos con datos del dueño
export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT 
        p.*, 
        u.name  AS owner_name, 
        u.email AS owner_email
      FROM products p
      JOIN users u ON p.owner_id = u.id
      `
    );

    return res.json(rows);
  } catch (err) {
    console.error("Error en getAllProducts:", err);
    return res
      .status(500)
      .json({ ok: false, msg: "Error al obtener los productos" });
  }
};

// Crear producto
export const createProduct = async (req, res) => {
  const { title, description, price, image, owner_id } = req.body;

  try {
    // Insert en MySQL (sin RETURNING *)
    const [result] = await db.query(
      `
      INSERT INTO products (title, description, price, image, owner_id)
      VALUES (?, ?, ?, ?, ?)
      `,
      [title, description, price, image, owner_id]
    );

    const insertedId = result.insertId;

    // Traemos el producto recién creado con info del dueño
    const [rows] = await db.query(
      `
      SELECT 
        p.*, 
        u.name  AS owner_name, 
        u.email AS owner_email
      FROM products p
      JOIN users u ON p.owner_id = u.id
      WHERE p.id = ?
      `,
      [insertedId]
    );

    return res.json(rows[0]);
  } catch (err) {
    console.error("Error en createProduct:", err);
    return res
      .status(500)
      .json({ ok: false, msg: "Error al crear el producto" });
  }
};