import { employeeTimesheetsService } from "../services/employee_timesheets_services.js";

export const employeeTimesheetsController = {
  // Create a new timesheet user association
  saveEmployeeTimesheets: async (req, res) => {
    try {
      const { timesheet_id, employee_id, tenant_id } = req.body;
      if (!timesheet_id || !employee_id || !tenant_id) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: timesheet_id, employee_id, tenant_id",
        });
      }
      const result = await employeeTimesheetsService.saveEmployeeTimesheets(timesheet_id, employee_id, tenant_id);
      return res.status(201).json({
        success: true,
        data: result,
        message: "EmployeeTimesheets saved successfully",
      });
    } catch (error) {
      console.error("[CONTROLLER ERROR] saveEmployeeTimesheets:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Retrieve timesheet user associations by timesheet_id
  getEmployeeTimesheetsByTimesheetId: async (req, res) => {
    try {
      const { timesheet_id } = req.params;
      if (!timesheet_id) {
        return res.status(400).json({
          success: false,
          message: "Timesheet ID is required",
        });
      }
      const result = await employeeTimesheetsController.getEmployeeTimesheetsByTimesheetId(timesheet_id);
      return res.status(200).json({
        success: true,
        data: result,
        message: "EmployeeTimesheets retrieved successfully",
      });
    } catch (error) {
      console.error("[CONTROLLER ERROR] getEmployeeTimesheetsByTimesheetId:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },
};
