import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { getUsers} from "../controllers/user.controller.js";

const router = Router();

router.get("/", verifyToken, getUsers); // http://localhost:3000/users/

export default router;