import { projectEmployeeService }  from "../services/project-employee-service.js";

export const projectEmployeeController = {
  // Assign a user to a project
  saveProjectEmployee: async (req, res) => {
    try {
      const { project_id, employee_id, tenant_id } = req.body;

      // Validate required fields
      if (!project_id || !employee_id || !tenant_id) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required fields: project_id, employee_id, tenant_id" 
        });
      }

      // Call the service to save the project-user association
      const result = await projectEmployeeService.saveProjectEmployee(project_id, employee_id, tenant_id);

      return res.status(201).json({
        success: true,
        message: "Employee assigned to project successfully",
        data: result,
      });
    } catch (error) {
      console.error(`[ERROR] saveProjectEmployee: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  },

  // Retrieve users associated with a specific project
  getProjectEmployees: async (req, res) => {
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
      const employee = await projectEmployeeService.getProjectEmployees(project_id);

      return res.status(200).json({
        success: true,
        message: "Project Employees retrieved successfully",
        data: employee,
      });
    } catch (error) {
      console.error(`[ERROR] getProjectEmployees: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  },
};
