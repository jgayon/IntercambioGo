// backend/src/routes/users.routes.js
import express from "express";
import { updateUser } from "../controllers/users.controller.js";
import { authRequired } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Editar perfil de usuario
router.put("/:id", authRequired, updateUser);

export default router;