import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";
import tradeRoutes from "./routes/trades.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import membershipRoutes from "./routes/membership.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// RUTAS PRINCIPALES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/trades", tradeRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/membership", membershipRoutes);

app.get("/", (req, res) => res.send("IntercambioGo Backend Running ✔"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend running on port " + PORT));
