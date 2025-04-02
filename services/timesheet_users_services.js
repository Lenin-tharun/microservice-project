import { timesheetUsersModel } from "../models/timesheet_users_models.js";

export const timesheetUsersService = {
  // Save a timesheet user association
  saveTimesheetUser: async (timesheet_id, user_id, tenant_id) => {
    try {
      return await timesheetUsersModel.saveTimesheetUser(timesheet_id, user_id, tenant_id);
    } catch (error) {
      console.error("[SERVICE ERROR] saveTimesheetUser:", error.message);
      throw new Error(error.message || "Error saving timesheet user");
    }
  },

  // Retrieve timesheet user associations by timesheet_id
  getTimesheetUsersByTimesheetId: async (timesheet_id) => {
    try {
      return await timesheetUsersModel.getTimesheetUsersByTimesheetId(timesheet_id);
    } catch (error) {
      console.error("[SERVICE ERROR] getTimesheetUsersByTimesheetId:", error.message);
      throw new Error(error.message || "Error fetching timesheet users");
    }
  },
};
