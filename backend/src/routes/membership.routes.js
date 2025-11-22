import express from "express";
import { getUserMembership, addPoints } from "../controllers/membership.controller.js";
const router = express.Router();

router.get("/:userId", getUserMembership); // obtener nivel y puntos
router.post("/addpoints", addPoints);      // sumar puntos tras intercambio

export default router;
