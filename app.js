import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", userRoutes);

// ON
app.listen(process.env.PORT || 3000, () => {
    console.log("[API]: Servidor corriendo en puerto 3000");
});