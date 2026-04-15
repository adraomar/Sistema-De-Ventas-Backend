import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register); // http://localhost:3000/auth/register
router.post("/login", login); // http://localhost:3000/auth/login

export default router;