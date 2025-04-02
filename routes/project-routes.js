import express from 'express';
import { projectController }from '../controllers/project-controllers.js';

const router = express.Router();

// ✅ Create a new project
router.post('/', projectController.createProject);

// ✅ Get all projects
router.get('/', projectController.getAllProjects);

// ✅ Get a project by ID
router.get('/:id', projectController.getProjectById);

// ✅ Get projects by tenant ID
router.get('/tenant/:tenantId', projectController.getProjectByTenantId);

// ✅ Get projects by status and tenant id
router.get('/status/:status', projectController.getProjectByStatusAndTenantId);

// ✅ Update a project by ID
router.put('/:id', projectController.updateProject);

// ✅ Delete a project by ID
router.delete('/:id', projectController.deleteProject);

export default router;
