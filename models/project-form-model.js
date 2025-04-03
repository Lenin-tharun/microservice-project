import { executeQuery } from "../utils/query-Executer.js";


export const ProjectFormModel = {
    // Create or Update Project Form (Prevents Duplicates)
    createProjectForm: async (form_config, tenant_id) => {
        const query = `
            INSERT INTO project_forms (form_config, tenant_id, created_at, updated_at)
            VALUES ($1, $2, NOW(), NOW())
            ON CONFLICT (tenant_id) 
            DO UPDATE SET 
                form_config = EXCLUDED.form_config,
                updated_at = NOW()
            RETURNING *;
        `;

        try {
            const result = await executeQuery(query, [JSON.stringify(form_config), tenant_id]);

            if (result.length > 0) {
                return result[0]; // Return the created or updated form
            }
            throw new Error("Failed to create or update project form.");
        } catch (err) {
            console.error('❌ Error creating/updating project form:', err);
            throw new Error('Error creating/updating project form: ' + err.message);
        }
    },

    // Get project form by ID
    getProjectFormById: async (id) => {
       
        try {
            const result = await executeQuery("SELECT * FROM project_forms WHERE id = $1", [id]);
            
            if (result.length === 0) {
                return null; // No form found with the given ID
            }
            return result[0]; // Return the project form
        } catch (err) {
            console.error('❌ Error fetching project form by ID:', err);
            throw new Error('Error fetching project form: ' + err.message);
        }
    },

    // Get project form by TENANT_ID
    getProjectFormByTenantId: async (tenant_id) => {
       
        try {
            const result = await executeQuery("SELECT * FROM project_forms WHERE tenant_id = $1", [tenant_id]);
            
            if (result.length === 0) {
                return null; // No form found with the given ID
            }
            return result[0]; // Return the project form
        } catch (err) {
            console.error('❌ Error fetching project form by tenant_id:', err);
            throw new Error('Error fetching project form: ' + err.message);
        }
    },


    // Update project form by ID
    updateProjectForm: async (id, form_config) => {
        const query = 'UPDATE project_forms SET form_config = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
        
        try {
            const result = await executeQuery(query, [JSON.stringify(form_config), id]);

            if (result.length === 0) {
                throw new Error("Project form not found.");
            }

            return result[0]; // Return the updated project form
        } catch (err) {
            console.error('❌ Error updating project form:', err);
            throw new Error('Error updating project form: ' + err.message);
        }
    }
};
