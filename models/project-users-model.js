import { executeQuery } from "../utils/query-Executer.js";

export const projectUsersModel = {
  
  saveProjectUsers: async (project_id, user_uuid, tenant_id) => {
    const query = ` 
      INSERT INTO project_users (project_id, user_uuid, tenant_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [project_id, user_uuid, tenant_id];

    try {
      const result = await executeQuery(query, values);
      return result[0]; // Return the newly inserted record
    } catch (error) {
      console.error("[DB ERROR] saveProjectUsers:", error.message);
      throw new Error("Database error while saving project user");
    }
  },


  getProjectUsers: async (project_id) => {
    const query = "SELECT * FROM project_users WHERE project_id = $1";
    
    try {
      const result = await executeQuery(query, [project_id]);
      console.log("Fetched Users:", result);
      return result; // Return all matching records
    } catch (error) {
      console.error("[DB ERROR] getProjectUsers:", error.message);
      throw new Error("Database error while fetching project users");
    }
  },
};
