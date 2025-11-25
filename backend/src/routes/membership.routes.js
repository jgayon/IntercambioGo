// backend/src/routes/membership.routes.js
import express from "express";
import {
  getUserMembership,
  addPoints,
} from "../controllers/membership.controller.js";
import { authRequired } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ver nivel / puntos: puede ser solo logueado también
router.get("/:userId", authRequired, getUserMembership);

// Sumar puntos (después de intercambio completado, etc.)
router.post("/addpoints", authRequired, addPoints);

export default router;