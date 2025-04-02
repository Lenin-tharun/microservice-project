import {executeQuery} from "../utils/query-Executer.js";

export const timesheetUsersModel = {
  // Save a new timesheet user association
  saveTimesheetUser: async (timesheet_id, user_id, tenant_id) => {
    const query = `
      INSERT INTO public.timesheet_users (timesheet_id, user_id, tenant_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [timesheet_id, user_id, tenant_id];

    try {
      const result = await executeQuery(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("[DB ERROR] saveTimesheetUser:", error.message);
      throw new Error("Database error while saving timesheet user");
    }
  },

  // Retrieve all timesheet user associations for a given timesheet_id
  getTimesheetUsersByTimesheetId: async (timesheet_id) => {
    const query = `
      SELECT * FROM public.timesheet_users
      WHERE timesheet_id = $1;
    `;
    const values = [timesheet_id];

    try {
      const result = await executeQuery(query, values);
      return result.rows;
    } catch (error) {
      console.error("[DB ERROR] getTimesheetUsersByTimesheetId:", error.message);
      throw new Error("Database error while fetching timesheet users");
    }
  },
};
