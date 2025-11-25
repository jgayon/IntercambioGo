import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

// Registro de usuario
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    // INSERT en MySQL (sin RETURNING *)
    const [result] = await db.query(
      `INSERT INTO users (name, email, password)
       VALUES (?, ?, ?)`,
      [name, email, hashed]
    );

    // Obtenemos el usuario recién creado
    const insertedId = result.insertId;

    const [rows] = await db.query(
      `SELECT id, name, email, points, created_at
       FROM users
       WHERE id = ?`,
      [insertedId]
    );

    const user = rows[0];

    return res.json({ ok: true, user });
  } catch (err) {
    // Error de correo duplicado en MySQL
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ ok: false, msg: "Correo ya existe" });
    }

    console.error("Error en register:", err);
    return res
      .status(500)
      .json({ ok: false, msg: "Error en el servidor al registrar" });
  }
};

// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // SELECT en MySQL usa ? en vez de $1
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const user = rows[0];

    if (!user) {
      return res.status(400).json({ msg: "Usuario no existe" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return res.json({ ok: true, token, user });
  } catch (err) {
    console.error("Error en login:", err);
    return res
      .status(500)
      .json({ ok: false, msg: "Error en el servidor al iniciar sesión" });
  }
};