import express from 'express';
import  { projectFormController }  from '../controllers/project-form-controllers.js';

const router = express.Router();

// Create a new project form
router.post('/', projectFormController.createProjectForm);

// Get a project form by ID
router.get('/:id', projectFormController.getProjectFormById);

// Get a project form by TENANT_ID
router.get('/tenant/:tenant_id', projectFormController.getProjectFormByTenantId);

// Update a project form by ID
router.put('/:id', projectFormController.updateProjectForm);

export default router;
