import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    const result = await db.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, email, hashed]
    );
    return res.json({ ok: true, user: result.rows[0] });

  } catch (err) {
    return res.status(400).json({ ok: false, msg: "Correo ya existe" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const userQ = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  const user = userQ.rows[0];

  if (!user) return res.status(400).json({ msg: "Usuario no existe" });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(400).json({ msg: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  return res.json({ ok: true, token, user });
};
