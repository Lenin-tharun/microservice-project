import express from "express";
import { projectEmployeeController }  from "../controllers/project-employee-controllers.js";

const router = express.Router();

// Route to assign a user to a project
router.post("/", projectEmployeeController.saveProjectEmployee);

// Route to retrieve all users associated with a specific project
router.get("/:project_id", projectEmployeeController.getProjectEmployees);

export default router;
