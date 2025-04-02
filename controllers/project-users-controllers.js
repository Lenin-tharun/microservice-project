import { projectuserService }  from "../services/project-users-service.js";

export const projectUserController = {
  // Assign a user to a project
  saveProjectUsers: async (req, res) => {
    try {
      const { project_id, user_uuid, tenant_id } = req.body;

      // Validate required fields
      if (!project_id || !user_uuid || !tenant_id) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required fields: project_id, user_uuid, tenant_id" 
        });
      }

      // Call the service to save the project-user association
      const result = await projectuserService.saveProjectUsers(project_id, user_uuid, tenant_id);

      return res.status(201).json({
        success: true,
        message: "User assigned to project successfully",
        data: result,
      });
    } catch (error) {
      console.error(`[ERROR] saveProjectUsers: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  },

  // Retrieve users associated with a specific project
  getProjectUsers: async (req, res) => {
    try {
      const { project_id } = req.params;

      // Validate that project_id is provided
      if (!project_id) {
        return res.status(400).json({
          success: false,
          message: "Project ID is required",
        });
      }

      // Call the service to get project users
      const users = await projectuserService.getProjectUsers(project_id);

      return res.status(200).json({
        success: true,
        message: "Project users retrieved successfully",
        data: users,
      });
    } catch (error) {
      console.error(`[ERROR] getProjectUsers: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  },
};
