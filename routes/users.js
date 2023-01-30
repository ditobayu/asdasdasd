import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getAllUser,
  getChat,
  sendChat,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.post("/sendchat", sendChat);
router.patch("/getchat", getChat);
router.get("/alluser", getAllUser);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
