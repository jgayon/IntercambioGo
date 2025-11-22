import express from "express";
import {
  getTrades,
  createTrade,
  updateTradeStatus
} from "../controllers/trades.controllers.js";

const router = express.Router();

router.get("/", getTrades);             // obtener todas las solicitudes
router.post("/", createTrade);          // crear una solicitud
router.put("/:id", updateTradeStatus);  // aceptar/rechazar

export default router;
