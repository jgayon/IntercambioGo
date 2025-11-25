// backend/src/routes/trades.routes.js
import express from "express";
import {
  getTrades,
  createTrade,
  updateTradeStatus,
} from "../controllers/trades.controller.js";
import { authRequired } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ver intercambios (del usuario logueado, según tu controlador)
router.get("/", authRequired, getTrades);

// Crear una solicitud de intercambio
router.post("/", authRequired, createTrade);

// Cambiar estado (aceptar / rechazar / completado)
router.put("/:id", authRequired, updateTradeStatus);

export default router;