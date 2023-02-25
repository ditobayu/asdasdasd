import express from "express";
import {
  createChallenge,
  joinChallenge,
  getChallenge,
  getAllChallenge,
} from "../controllers/challenge.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/createchallenge", createChallenge);
router.patch("/joinChallenge", joinChallenge);
router.get("/getchallenge", getChallenge);
router.get("/getallchallenge", getAllChallenge);

export default router;
