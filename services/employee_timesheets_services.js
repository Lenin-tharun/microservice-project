import { employeeTimesheetsModel } from "../models/employee_timesheets_models.js";

export const employeeTimesheetsService = {
  // Save a timesheet user association
  saveEmployeeTimesheets: async (timesheet_id, employee_id, tenant_id) => {
    try {
      return await employeeTimesheetsModel.saveEmployeeTimesheets(timesheet_id, employee_id, tenant_id);
    } catch (error) {
      console.error("[SERVICE ERROR] saveEmployeeTimesheets:", error.message);
      throw new Error(error.message || "Error saving Employee Timesheets");
    }
  },

  // Retrieve timesheet user associations by timesheet_id
  getEmployeeTimesheetsByTimesheetId: async (timesheet_id) => {
    try {
      return await employeeTimesheetsModel.getEmployeeTimesheetsByTimesheetId(timesheet_id);
    } catch (error) {
      console.error("[SERVICE ERROR] getEmployeeTimesheetsByTimesheetId:", error.message);
      throw new Error(error.message || "Error fetching Employee users");
    }
  },
};
