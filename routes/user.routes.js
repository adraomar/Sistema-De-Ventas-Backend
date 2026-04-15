import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { getUsers, createUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/", verifyToken, getUsers); // http://localhost:3000/users/
router.post("/create", verifyToken, createUser); // http://localhost:3000/users/create

export default router;