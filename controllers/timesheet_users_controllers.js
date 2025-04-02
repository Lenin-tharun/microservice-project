import { timesheetUsersService } from "../services/timesheet_users_services.js";

export const timesheetUsersController = {
  // Create a new timesheet user association
  saveTimesheetUser: async (req, res) => {
    try {
      const { timesheet_id, user_id, tenant_id } = req.body;
      if (!timesheet_id || !user_id || !tenant_id) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: timesheet_id, user_id, tenant_id",
        });
      }
      const result = await timesheetUsersService.saveTimesheetUser(timesheet_id, user_id, tenant_id);
      return res.status(201).json({
        success: true,
        data: result,
        message: "Timesheet user saved successfully",
      });
    } catch (error) {
      console.error("[CONTROLLER ERROR] saveTimesheetUser:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Retrieve timesheet user associations by timesheet_id
  getTimesheetUsersByTimesheetId: async (req, res) => {
    try {
      const { timesheet_id } = req.params;
      if (!timesheet_id) {
        return res.status(400).json({
          success: false,
          message: "Timesheet ID is required",
        });
      }
      const result = await timesheetUsersService.getTimesheetUsersByTimesheetId(timesheet_id);
      return res.status(200).json({
        success: true,
        data: result,
        message: "Timesheet users retrieved successfully",
      });
    } catch (error) {
      console.error("[CONTROLLER ERROR] getTimesheetUsersByTimesheetId:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },
};
