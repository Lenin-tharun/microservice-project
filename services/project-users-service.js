import  {projectUsersModel}  from "../models/project-users-model.js";

export const projectuserService = {
  // Save a new project-user association
  saveProjectUsers: async (project_id, user_uuid, tenant_id) => {
    try {
      return await projectUsersModel.saveProjectUsers(project_id, user_uuid, tenant_id);
    } catch (error) {
      console.error(`[ERROR] saveProjectUsers: ${error.message}`, { error });
      throw new Error(error.message || "Error saving project users");
    }
  },

  // Get all users associated with a specific project
  getProjectUsers: async (project_id) => {
    try {
      return await projectUsersModel.getProjectUsers(project_id);
    } catch (error) {
      console.error(`[ERROR] getProjectUsers: ${error.message}`, { error });
      throw new Error(error.message || "Error getting project users");
    }
  },
};
