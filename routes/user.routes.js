import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { getUser, getUsers, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/", verifyToken, getUsers); // http://localhost:3000/users/
router.get("/user", verifyToken, getUser); // http://localhost:3000/users/user/
router.post("/", verifyToken, createUser); // http://localhost:3000/users/
router.put("/:id", verifyToken, updateUser); 
router.delete("/:id", verifyToken, deleteUser);

export default router;