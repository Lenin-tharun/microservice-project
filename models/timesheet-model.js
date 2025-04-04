import { executeQuery } from "../utils/query-Executer.js";

export const timesheetModel = {
  // CREATE TIMESHEET ENTRY: Start or resume a task
  startOrResumeTask: async (task_id, tenant_id) => {
    const query = `
      INSERT INTO timesheets (task_id, tenant_id, start_time)
      VALUES ($1, $2, NOW())
      RETURNING *;
    `;
    const values = [task_id, tenant_id];

    try {
      const result = await executeQuery(query, values);
      return result[0];
    } catch (error) {
      console.error("Error creating timesheet entry:", error.message);
      throw new Error("Database error while creating timesheet entry");
    }
  },

 
  // PAUSE OR STOP TASK: Update timesheet entry (only if end_time is still NULL)
  pauseOrStopTask: async (task_id) => {
    const query = `
      UPDATE timesheets
      SET end_time = NOW(),
       updated_at = NOW(),
       duration = NOW() -start_time
      WHERE task_id = $1 AND end_time IS NULL
      RETURNING *;
    `;
    const values = [task_id];

    try {
      const result = await executeQuery(query, values);
      return result;
    } catch (error) {
      console.error("Error updating timesheet entry:", error.message);
      throw new Error("Database error while updating timesheet entry");
    }
  },


  createLoginTime : async (task_id, start_time, end_time, tenant_id) => {
    try{
    const query = `
      INSERT INTO timesheets (task_id, start_time, end_time, tenant_id,)
      VALUES ($1, $2, $3, $4)
      RETURNING *, 
        EXTRACT(EPOCH FROM (COALESCE($4, NOW()) - $3)) AS duration;
    `;
    const values = [task_id, start_time, end_time, tenant_id];
      const result = await executeQuery(query, values);
      return result[0]; // Returning the first inserted row
    } catch (error) {
      console.error("Error inserting login time:", error.message);
      throw new Error("Database error while inserting login time");
    }
  },
  

  // GET ALL TIMESHEETS (No Pagination)
  getAllTimesheets: async () => {
    const query = "SELECT * FROM timesheets ORDER BY created_at DESC";
    try {
      const result = await executeQuery(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching timesheets:", error.message);
      throw new Error("Database error while fetching timesheets");
    }
  },

  // GET TIMESHEET BY ID
  getTimesheetById: async (timesheetId) => {
    const query = "SELECT * FROM timesheets WHERE id = $1";
    const values = [timesheetId];
    try {
      const result = await executeQuery(query, values);
      return result.rows.length ? result.rows[0] : null;
    } catch (error) {
      console.error("Error fetching timesheet by ID:", error.message);
      throw new Error("Database error while fetching timesheet");
    }
  },

  // GET TIMESHEET BY TENANT ID
  getTimesheetByTenantId: async (tenant_id) => {
    const query = `
      SELECT 
    p.id AS project_id,
    p.name AS project_name,
    p.customer_id,
    t.id AS task_id,
    t.task_name,
    TO_CHAR(
        INTERVAL '1 second' * COALESCE(SUM(EXTRACT(EPOCH FROM (COALESCE(ts.end_time, NOW()) - ts.start_time))), 0), 
        'HH24:MI'
    ) AS total_time_spent,
    CASE 
        WHEN COUNT(CASE WHEN ts.end_time IS NULL THEN 1 END) > 0 
        THEN 'Running' 
        ELSE 'Not Running' 
    END AS status
FROM projects p
JOIN tasks t ON p.id = t.project_id
LEFT JOIN timesheets ts ON t.id = ts.task_id
WHERE p.tenant_id = $1
GROUP BY p.id, p.name, p.customer_id, t.id, t.task_name;
    `;
    const values = [tenant_id];
    try {
      const result = await executeQuery(query, values);
      // Depending on your requirements, you can return all rows or just the first record.
      return result.rows; // Returns all aggregated rows
    } catch (error) {
      console.error("Error fetching timesheet by tenant ID:", error.message);
      throw new Error("Database error while fetching timesheet by tenant ID");
    }
  },

  // UPDATE TIMESHEET ENTRY
  updateTimesheet: async (timesheetId, updates) => {
    if (!timesheetId) throw new Error("Invalid timesheet ID");
    if (!updates || Object.keys(updates).length === 0)
      throw new Error("No updates provided");

    const fields = [];
    const values = [];
    let index = 1;

    Object.entries(updates).forEach(([key, value]) => {
      fields.push(`${key} = $${index}`);
      values.push(value);
      index++;
    });

    // If updating start_time or end_time, recalculate duration if both provided
    if (updates.start_time || updates.end_time) {
      const { start_time, end_time } = updates;
      let duration = null;
      if (start_time && end_time) {
        const startTimeObj = new Date(start_time);
        const endTimeObj = new Date(end_time);
        duration = Math.floor((endTimeObj - startTimeObj) / (1000 * 60)); // duration in minutes
      }
      fields.push(`duration = $${index}`);
      values.push(duration);
      index++;
    }

    values.push(timesheetId); // For the WHERE clause
    const query = `
      UPDATE timesheets 
      SET ${fields.join(", ")}, updated_at = NOW() 
      WHERE id = $${index} 
      RETURNING *;
    `;

    try {
      const result = await executeQuery(query, values);
      return result.rows.length ? result.rows[0] : null;
    } catch (error) {
      console.error("Error updating timesheet:", error.message);
      throw new Error("Database error while updating timesheet");
    }
  },

  // DELETE TIMESHEET ENTRY
  deleteTimesheet: async (timesheetId) => {
    if (!timesheetId) throw new Error("Invalid timesheet ID");

    const query = "DELETE FROM timesheets WHERE id = $1 RETURNING *";
    const values = [timesheetId];
    try {
      const result = await executeQuery(query, values);
      return result.rows.length ? result.rows[0] : null;
    } catch (error) {
      console.error("Error deleting timesheet:", error.message);
      throw new Error("Database error while deleting timesheet");
    }
  },
};
