import { executeQuery } from "../utils/query-Executer.js";

export const projectEmployeeModel = {
  
  saveProjectEmployee: async (project_id, employee_id, tenant_id) => {
    const query = ` 
      INSERT INTO project_employee (project_id, employee_id, tenant_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [project_id, employee_id, tenant_id];

    try {
      const result = await executeQuery(query, values);
      return result[0]; // Return the newly inserted record
    } catch (error) {
      console.error("[DB ERROR] saveProjectEmployee:", error.message);
      throw new Error("Database error while saving project Employee");
    }
  },


  getProjectEmployees: async (project_id) => {
    const query = "SELECT * FROM project_employee WHERE project_id = $1";
    
    try {
      const result = await executeQuery(query, [project_id]);
      console.log("Fetched Employee:", result);
      return result; // Return all matching records
    } catch (error) {
      console.error("[DB ERROR] getProjectEmployee:", error.message);
      throw new Error("Database error while fetching project Employee");
    }
  },
};
