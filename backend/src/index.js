import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";
import tradeRoutes from "./routes/trades.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import membershipRoutes from "./routes/membership.routes.js";
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",     // Frontend local (Vite)
  "https://TU-APP.vercel.app"  // Frontend desplegado (ajústalo cuando lo tengas)
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// app.use(cors());
app.use(express.json());

// RUTAS PRINCIPALES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/trades", tradeRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("IntercambioGo Backend Running ✔"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend running on port " + PORT));