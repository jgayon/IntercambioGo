import { db } from "../config/db.js";

export const getUserMembership = async (req, res) => {
  const { userId } = req.params;

  const userQ = await db.query("SELECT name, points FROM users WHERE id=$1", [userId]);
  const user = userQ.rows[0];

  if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

  let level = "Básico";
  if (user.points >= 500) level = "Premium";
  else if (user.points >= 250) level = "Oro";
  else if (user.points >= 100) level = "Plata";

  res.json({ ...user, level });
};

export const addPoints = async (req, res) => {
  const { userId, points } = req.body;

  const result = await db.query(`
    UPDATE users SET points = points + $1 WHERE id=$2 RETURNING *
  `, [points, userId]);

  res.json(result.rows[0]);
};
