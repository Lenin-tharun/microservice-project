import { projectFormService } from '../services/project-form-service.js';

export const projectFormController = {

    createProjectForm: async (req, res) => {
        try {
            const form = await projectFormService.createProjectForm(req.body);  // ✅ FIXED
            res.status(201).json({ success: true, data: form, message: "Project_Form created successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getProjectFormById: async (req, res) => {
        try {
            const form = await projectFormService.getProjectFormById(req.params.id);  // ✅ FIXED
            if (!form) {
                return res.status(404).json({ success: false, message: "ProjectFormId not found" });
            }
            res.status(200).json({ success: true, data: form, message: "User retrieved successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getProjectFormByTenantId: async (req, res) => {
        try {
            const { tenant_id } = req.params;
            const form = await projectFormService.getProjectFormByTenantId(tenant_id);  // ✅ FIXED
            if (!form) {
                return res.status(404).json({ success: false, message: 'Form not found' });
            }
            res.status(200).json({ success: true, data: form, message: "User retrieved successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updateProjectForm: async (req, res) => {
        try {
            const { id } = req.params;
            const { form_config } = req.body;
            const updatedForm = await projectFormService.updateProjectForm(id, { form_config });  // ✅ FIXED

            if (!updatedForm) {
                return res.status(404).json({ success: false, message: 'Form not found' });
            }
            res.status(200).json({ success: true, data: updatedForm, message: "Project form updated successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};
