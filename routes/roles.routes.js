import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { getRoles } from "../controllers/roles.controller.js";

const router = Router();

router.get("/", verifyToken, getRoles); // http://localhost:3000/users/
export default router;