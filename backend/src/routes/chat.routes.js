import express from "express";
import { getMessages, sendMessage } from "../controllers/chat.controllers.js";
const router = express.Router();

router.get("/:tradeId", getMessages); // obtener mensajes de un intercambio
router.post("/", sendMessage);        // enviar mensaje

export default router;
