import { executeQuery } from "../utils/query-Executer.js";
import { validate as isUuid } from "uuid";

export const projectModel = {
  // ✅ Create Project
  createProject: async (project_code, name, customer_id, description, due_date, status, tenant_id, created_by) => {
    try {

     
      const query = `
        INSERT INTO projects (project_code, name, customer_id, description, due_date, status, created_at, updated_at, tenant_id, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), $7, $8) 
        RETURNING *`;
      const values = [project_code, name, customer_id, description, due_date, status, tenant_id, created_by];

      const result = await executeQuery(query, values);
      return result[0];
    } catch (error) {
      console.error("[ERROR] createProject:", error.message);
      throw new Error("Failed to create project: " + error.message);
    }
  },

  // ✅ Get All Projects 
  getAllProjects: async () => {
    try {
      const query = `SELECT * FROM projects`;
      return await executeQuery(query);
    } catch (error) {
      console.error("[ERROR] getAllProjects:", error.message);
      throw new Error("Failed to fetch projects: " + error.message);
    }
  },

  // ✅ Get Project by ID
  getProjectById: async (id) => {
    try {
      
      const query = `SELECT * FROM projects WHERE id = $1;`;
      const result = await executeQuery(query, [id]);
      return result[0] || null;
    } catch (error) {
      console.error("[ERROR] getProjectById:", error.message);
      throw new Error("Failed to fetch project by ID: " + error.message);
    }
  },

  // ✅ Get Projects by Tenant ID
  getProjectsByTenantId: async (tenant_id) => {
    try {
      if (!isUuid(tenant_id)) {
        throw new Error("Invalid UUID format for tenant_id");
      }

      const query = `SELECT * FROM projects WHERE tenant_id = $1;`;
      return await executeQuery(query, [tenant_id]);
    } catch (error) {
      console.error("[ERROR] getProjectsByTenantId:", error.message);
      throw new Error("Failed to fetch projects by tenant ID: " + error.message);
    }
  },

  // ✅ Get Projects by Status and Tenant ID
  getProjectByStatusAndTenantId: async (status, tenantId) => {
    try {
      if (!isUuid(tenantId)) {
        throw new Error("Invalid UUID format for tenant_id");
      }

      const query = `SELECT id as project_id, name FROM projects WHERE status = $1 AND tenant_id = $2;`;
      return await executeQuery(query, [status, tenantId]);
    } catch (error) {
      console.error("[ERROR] getProjectByStatusAndTenantId:", error.message);
      throw new Error("Failed to fetch projects by status and TenantId: " + error.message);
    }
  },

  // ✅ Update Project
  updateProject: async (id, data) => {
    try {
      if (!isUuid(id)) {
        throw new Error("Invalid UUID format for project ID");
      }
      if (!isUuid(data.customerId) || !isUuid(data.tenantId)) {
        throw new Error("Invalid UUID format for customer_id or tenant_id");
      }

      const query = `
        UPDATE projects 
        SET project_code = $1, name = $2, customer_id = $3, description = $4, due_date = $5, status = $6, tenant_id = $7, updated_at = NOW()
        WHERE id = $8 
        RETURNING *;
      `;
      const values = [data.projectCode, data.name, data.customerId, data.description, data.dueDate, data.status, data.tenantId, id];

      const result = await executeQuery(query, values);
      return result[0];
    } catch (error) {
      console.error("[ERROR] updateProject:", error.message);
      throw new Error("Failed to update project: " + error.message);
    }
  },

  // ✅ Delete Project
  deleteProject: async (id) => {
    try {
      if (!isUuid(id)) {
        throw new Error("Invalid UUID format for project ID");
      }

      const query = `DELETE FROM projects WHERE id = $1 RETURNING *;`;
      const result = await executeQuery(query, [id]);
      return result[0];
    } catch (error) {
      console.error("[ERROR] deleteProject:", error.message);
      throw new Error("Failed to delete project: " + error.message);
    }
  },
};
