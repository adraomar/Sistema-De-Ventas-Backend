import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";

const router = Router();

router.get("/", verifyToken, getProducts);
router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;