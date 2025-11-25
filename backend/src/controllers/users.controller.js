// // backend/src/controllers/users.controllers.js
// import bcrypt from "bcrypt";
// import { db } from "../config/db.js";

// // Actualizar datos de un usuario
// export const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { name, email, password } = req.body;

//   try {
//     let hashedPassword = null;

//     if (password && password.trim() !== "") {
//       hashedPassword = await bcrypt.hash(password, 10);
//     }

//     const [result] = await db.query(
//       `
//       UPDATE users
//       SET name = ?,
//           email = ?,
//           password = COALESCE(?, password)
//       WHERE id = ?
//       RETURNING *;
//       `,
//       [name, email, hashedPassword, id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ msg: "Usuario no encontrado" });
//     }
    
//     // Volvemos a consultar el usuario actualizado
//     const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

//     return res.json(result.rows[0]);
//   } catch (error) {
//     console.error("Error actualizando usuario:", error);
//     return res.status(500).json({ msg: "Error al actualizar usuario" });
//   }
// };

// backend/src/controllers/users.controllers.js


import bcrypt from "bcrypt";
import { db } from "../config/db.js";

// Actualizar datos de un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    let hashedPassword = null;

    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // 1) Actualizar el usuario (sin RETURNING)
    const [result] = await db.query(
      `
      UPDATE users
      SET 
        name = ?,
        email = ?,
        password = COALESCE(?, password)
      WHERE id = ?
      `,
      [name, email, hashedPassword, id]
    );

    // Si no se actualizó ninguna fila, el usuario no existe
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // 2) Volver a consultar el usuario actualizado
    const [rows] = await db.query(
      `
      SELECT id, name, email, points, created_at
      FROM users
      WHERE id = ?
      `,
      [id]
    );

    const updatedUser = rows[0];

    return res.json(updatedUser);
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return res.status(500).json({ msg: "Error al actualizar usuario" });
  }
};