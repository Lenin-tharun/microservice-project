import express from "express";
import { taskController } from "../controllers/task-controllers.js";

const router = express.Router();

// Create a new task
router.post("/", taskController.createTask);

// Get all tasks
router.get("/", taskController.getAllTasks);

// Get tasks by tenant ID
router.get("/tenant/:tenant_id", taskController.getTaskByTenantId);

// Get tasks by project ID
router.get("/project/:project_id", taskController.getTasksByProjectId);

// Get task by ID (should be placed after the specific routes above)
router.get("/:task_id", taskController.getTaskById);

// Update a task by ID
router.put("/:task_id", taskController.updateTask);

// Delete a task by ID
router.delete("/:task_id", taskController.deleteTask);

export default router;
