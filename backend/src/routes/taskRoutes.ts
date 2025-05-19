import express from "express";
import {
  createCategory,
  createTask,
  deleteCategory,
  deleteTask,
  getCategories,
  getTasks,
  updateCategory,
  updateTask,
} from "../controllers/taskController";

const router = express.Router();

// タスク関連のルート
router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

// カテゴリ関連のルート
router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
