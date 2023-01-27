import express from "express";
import { login, refreshData } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/refreshData", verifyToken, refreshData);

export default router;
