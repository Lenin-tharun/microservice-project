import  { projectEmployeeModel }  from "../models/project-employee-model.js";

export const projectEmployeeService = {
  // Save a new project-user association
  saveProjectEmployee: async (project_id, employee_id, tenant_id) => {
    try {
      return await projectEmployeeModel.saveProjectEmployee(project_id, employee_id, tenant_id);
    } catch (error) {
      console.error(`[ERROR] saveProjectEmployee: ${error.message}`, { error });
      throw new Error(error.message || "Error saving project Employee");
    }
  },

  // Get all users associated with a specific project
  getProjectEmployees: async (project_id) => {
    try {
      return await projectEmployeeModel.getProjectEmployees(project_id);
    } catch (error) {
      console.error(`[ERROR] getProjectEmployee: ${error.message}`, { error });
      throw new Error(error.message || "Error getting project Employee");
    }
  },
  
};
