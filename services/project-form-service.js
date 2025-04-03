
import { ProjectFormModel } from '../models/project-form-model.js';

export const projectFormService = {

// Create Project Form
createProjectForm : async (data) => {
    if (!data.form_config || !data.tenant_id) {
        throw new Error("Missing required fields: form_config, tenant_id");
    }

    try {
        // Attempt to create a new project form using the model
        return await ProjectFormModel.createProjectForm(data.form_config, data.tenant_id);
    } catch (error) {
        console.error(`Error in createProjectForm: ${error.message}`);
        throw new Error("Error creating project form: " + error.message);
    }
},

// Get Project Form by ID
getProjectFormById : async (id) => {
    if (!id) {
        throw new Error("Invalid project form ID");
    }

    try {
        // Fetch project form by ID from the model
        return await ProjectFormModel.getProjectFormById(id);
    } catch (error) {
        console.error(`Error in getProjectFormById: ${error.message}`);
        throw new Error("Error retrieving project form: " + error.message);
    }
},

// Get Project Form by ID
getProjectFormByTenantId : async (tenant_id) => {
    if (!tenant_id) {
        throw new Error("Invalid project form tenant_id");
    }

    try {
        // Fetch project form by ID from the model
        return await ProjectFormModel.getProjectFormByTenantId(tenant_id);
    } catch (error) {
        console.error(`Error in getProjectFormByTenantId: ${error.message}`);
        throw new Error("Error retrieving project form: " + error.message);
    }
},

// Update Project Form by ID
updateProjectForm : async (id, data) => {
    if (!id || !data.form_config) {
        throw new Error("Invalid update parameters: Missing form_config or ID");
    }

    try {
        // Attempt to update the project form using the model
        return await ProjectFormModel.updateProjectForm(id, data.form_config);
    } catch (error) {
        console.error(`Error in updateProjectForm: ${error.message}`);
        throw new Error("Error updating project form: " + error.message);
    }
},
};
