import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// ON
app.listen(process.env.PORT || 3000, async () => {
    console.log("[API]: Servidor corriendo en puerto 3000");
});