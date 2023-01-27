import express from "express";
import {
  addproject,
  removeProject,
  addTask,
  removeTask,
  test,
  getProjects,
  editTask,
  editProject,
} from "../controllers/note.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// UPDATE
router.get("/test", test);
router.patch("/addProject", addproject);
router.patch("/editProject", editProject);
router.patch("/removeProject", removeProject);
router.patch("/addTask", addTask);
router.patch("/removeTask", removeTask);
router.patch("/editTask", editTask);
router.get("/getProjects", getProjects);

export default router;
