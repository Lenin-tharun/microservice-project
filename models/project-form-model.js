import pool from "../config/db-config.js"


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
            const { rows } = await pool.query(query, [JSON.stringify(form_config), tenant_id]);

            if (rows.length > 0) {
                return rows[0]; // Return the created or updated form
            }
            throw new Error("Failed to create or update project form.");
        } catch (err) {
            console.error('❌ Error creating/updating project form:', err);
            throw new Error('Error creating/updating project form: ' + err.message);
        }
    },

    // Get project form by ID
    getProjectFormById: async (id) => {
        if (!id) {
            throw new Error('Project form ID is required.');
        }

        try {
            const { rows } = await pool.query("SELECT * FROM project_forms WHERE id = $1", [id]);
            
            if (rows.length === 0) {
                return null; // No form found with the given ID
            }
            return rows[0]; // Return the project form
        } catch (err) {
            console.error('❌ Error fetching project form by ID:', err);
            throw new Error('Error fetching project form: ' + err.message);
        }
    },

    // Get project form by TENANT_ID
    getProjectFormByTenantId: async (tenant_id) => {
        if (!tenant_id) {
            throw new Error('Project form tenant_id is required.');
        }

        try {
            const { rows } = await pool.query("SELECT * FROM project_forms WHERE tenant_id = $1", [tenant_id]);
            
            if (rows.length === 0) {
                return null; // No form found with the given ID
            }
            return rows[0]; // Return the project form
        } catch (err) {
            console.error('❌ Error fetching project form by tenant_id:', err);
            throw new Error('Error fetching project form: ' + err.message);
        }
    },


    // Update project form by ID
    updateProjectForm: async (id, form_config) => {
        if (!id || !form_config) {
            throw new Error('Project form ID and form configuration are required.');
        }

        const query = 'UPDATE project_forms SET form_config = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
        
        try {
            const { rows } = await pool.query(query, [JSON.stringify(form_config), id]);

            if (rows.length === 0) {
                throw new Error("Project form not found.");
            }

            return rows[0]; // Return the updated project form
        } catch (err) {
            console.error('❌ Error updating project form:', err);
            throw new Error('Error updating project form: ' + err.message);
        }
    }
};
