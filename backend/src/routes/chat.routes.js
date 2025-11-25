// backend/src/routes/chat.routes.js
import express from "express";
import { getMessages, sendMessage } from "../controllers/chat.controller.js";
import { authRequired } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Mensajes de un intercambio
router.get("/:tradeId", authRequired, getMessages);

// Enviar mensaje
router.post("/", authRequired, sendMessage);

export default router;