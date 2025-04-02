import { projectFormService } from '../services/project-form-service.js';

export const projectFormController = {

 createForm: async (req, res) => {
    try {
        const form = await projectFormService(req.body);
        res.status(201).json({ message: 'Form created successfully', form });
    } catch (err) {
        res.status(500).json({ message: 'Error creating project form', error: err.message });
    }
},

getFormById : async (req, res) => {
    try {
        const form = await projectFormService(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(form);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching form', error: err.message });
    }
},

getFormByTenantId : async (req, res) => {
    try {
        const { tenant_id } = req.params;  // FIXED: Extract from params
        const form = await projectFormService(tenant_id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(form);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching form', error: err.message });
    }
},

updateForm : async (req, res) => {
    try {
        const { id } = req.params;
        const { form_config } = req.body;
        const updatedForm = await projectFormService(id, { form_config });

        if (!updatedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json({ message: 'Form updated successfully', form: updatedForm });
    } catch (err) {
        res.status(500).json({ message: 'Error updating form', error: err.message });
    }
},
};
