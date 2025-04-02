import express from 'express';
import { projectFormController } from '../controllers/project-form-controllers.js';

const router = express.Router();

// Create a new project form
router.post('/', projectFormController.createForm);

// Get a project form by ID
router.get('/:id', projectFormController.getFormById);

// Get a project form by TENANT_ID
router.get('/tenant/:tenant_id', projectFormController.getFormByTenantId);

// Update a project form by ID
router.put('/:id', projectFormController.updateForm);

export default router;
