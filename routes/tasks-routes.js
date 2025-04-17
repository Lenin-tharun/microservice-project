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

//getTaskStatusSummary
router.get("/statussummary/:project_id", taskController.getTaskStatusSummary);

//getTaskDurationReport
router.get("/duration/:project_id", taskController.getTaskDurationReport);

//getEmployeeTaskReport
//router.get("/employees/:project_id", taskController.getEmployeeTaskReport);

//getOverdueTasks
router.get("/overdue/:project_id", taskController.getOverdueTasks);

//getMonthlyTaskStats
router.get("/monthly/:tenant_id", taskController.getMonthlyTaskStatus);

export default router;
