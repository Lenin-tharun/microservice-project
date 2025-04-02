import express from "express";
import { projectUserController }  from "../controllers/project-users-controllers.js";

const router = express.Router();

// Route to assign a user to a project
router.post("/", projectUserController.saveProjectUsers);

// Route to retrieve all users associated with a specific project
router.get("/:project_id", projectUserController.getProjectUsers);

export default router;
