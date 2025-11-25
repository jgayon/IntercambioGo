// products.routes.js
import express from "express";
import { createProduct, getAllProducts } from "../controllers/products.controller.js";
import { authRequired } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ver productos: puede ser público
router.get("/", getAllProducts);

// Crear producto: SOLO usuario logueado
router.post("/", authRequired, createProduct);

export default router;

