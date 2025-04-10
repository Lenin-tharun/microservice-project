import {executeQuery} from "../utils/query-Executer.js";

export const employeeTimesheetsModel = {
  // Save a new timesheet user association
  saveEmployeeTimesheets: async (timesheet_id, employee_id, tenant_id) => {
    const query = `
      INSERT INTO public.employee_timesheets (timesheet_id, employee_id, tenant_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [timesheet_id, employee_id, tenant_id];

    try {
      const result = await executeQuery(query, values);
      return result[0];
    } catch (error) {
      console.error("[DB ERROR] saveEmployeeTimesheets:", error.message);
      throw new Error("Database error while saving Employee Timesheets");
    }
  },

  // Retrieve all timesheet user associations for a given timesheet_id
  getEmployeeTimesheetsByTimesheetId: async (timesheet_id) => {
    const query = `
      SELECT * FROM public.employee_timesheets
      WHERE timesheet_id = $1;
    `;
    const values = [timesheet_id];

    try {
      const result = await executeQuery(query, values);
      return result.rows;
    } catch (error) {
      console.error("[DB ERROR] getEmployeeTimesheetsByTimesheetId:", error.message);
      throw new Error("Database error while fetching Employee Timesheets");
    }
  },
};
