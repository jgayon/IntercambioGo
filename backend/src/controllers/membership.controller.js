// src/controllers/membership.controllers.js
import { db } from "../config/db.js";

// Obtener nivel de membresía de un usuario
export const getUserMembership = async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT id, name, points FROM users WHERE id = ?",
      [userId]
    );

    const user = rows[0];

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    let level = "Básico";
    if (user.points >= 500) level = "Premium";
    else if (user.points >= 250) level = "Oro";
    else if (user.points >= 100) level = "Plata";

    return res.json({ ...user, level });
  } catch (err) {
    console.error("Error en getUserMembership:", err);
    return res
      .status(500)
      .json({ ok: false, msg: "Error al obtener la membresía del usuario" });
  }
};

// Sumar puntos a un usuario
export const addPoints = async (req, res) => {
  const { userId, points } = req.body;

  try {
    // Actualizamos los puntos
    await db.query(
      `
      UPDATE users 
      SET points = points + ?
      WHERE id = ?
      `,
      [points, userId]
    );

    // Volvemos a consultar el usuario actualizado
    const [rows] = await db.query(
      `
      SELECT id, name, email, points, created_at
      FROM users
      WHERE id = ?
      `,
      [userId]
    );

    const user = rows[0];

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    return res.json(user);
  } catch (err) {
    console.error("Error en addPoints:", err);
    return res
      .status(500)
      .json({ ok: false, msg: "Error al actualizar los puntos del usuario" });
  }
};