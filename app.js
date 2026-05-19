import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import productsRoutes from "./routes/products.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/roles", rolesRoutes);
app.use("/products", productsRoutes);

// ON
app.listen(process.env.PORT || 3000, async () => {
    console.log("[API]: Servidor corriendo en puerto 3000");
});