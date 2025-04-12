import { executeQuery } from "../utils/query-Executer.js";

export const timesheetModel = {
  // CREATE TIMESHEET ENTRY: Start or resume a task
  startOrResumeTask: async (task_id, tenant_id, notes) => {
    const query = `
      INSERT INTO timesheets (task_id, tenant_id, start_time, date, notes)
      VALUES ($1, $2, NOW(), NOW(), $3)
      RETURNING *;
    `;
    const values = [task_id, tenant_id, notes];

    try {
      const result = await executeQuery(query, values);
      return result[0];
    } catch (error) {
      console.error("Error creating timesheet entry:", error.message);
      throw new Error("Database error while creating timesheet entry");
    }
  },

  // PAUSE OR STOP TASK: Update timesheet entry (only if end_time is still NULL)
  pauseOrStopTask: async (task_id, notes) => {
    const query = `
      UPDATE timesheets
      SET end_time = NOW(),
       updated_at = NOW(),
       duration = NOW() -start_time,
       notes = $2
      WHERE task_id = $1 AND end_time IS NULL
      RETURNING *;
    `;
    const values = [task_id, notes];

    try {
      const result = await executeQuery(query, values);
      return result;
    } catch (error) {
      console.error("Error updating timesheet entry:", error.message);
      throw new Error("Database error while updating timesheet entry");
    }
  },

  /*createLoginTimeSheet: async (task_id, start_time, end_time, tenant_id, date) => {
    try {
      const query = `
        INSERT INTO timesheets (
          task_id, start_time, end_time, tenant_id, created_at, updated_at, duration, date
        )
        VALUES (
           $1, $2, $3, $4, now(), now(), (COALESCE($3::timestamp, now()) - $2::timestamp),$5::date
        )
        RETURNING *, TO_CHAR(date, 'YYYY-MM-DD') AS date_string;
      `;
      const values = [task_id, start_time, end_time, tenant_id, date];
      const result = await executeQuery(query, values);
      return result[0]; // Return the inserted row
    } catch (error) {
      console.error("Error inserting timesheet:", error.message);
      throw new Error("Database error while inserting timesheet");
    }
  },*/

  createLoginTimeSheet: async (
    task_id,
    start_time,
    end_time,
    tenant_id,
    date,
    duration,
    notes
  ) => {
    try {
      let query;
      let values;

      if (duration) {
        // Duration is given directly (as string like '02:30:00')
        query = `
          INSERT INTO timesheets (
            task_id, start_time, end_time, tenant_id, created_at, updated_at, duration, date, notes
          )
          VALUES (
            $1, $2, now(), $3,now(),  now(), $4::interval, $5::date, $6
          )
          RETURNING *, TO_CHAR(date, 'YYYY-MM-DD') AS date_string;
        `;
        values = [task_id, start_time, tenant_id, duration, date, notes];
      } else {
        // Calculate duration from start & end time
        query = `
          INSERT INTO timesheets (
            task_id, start_time, end_time, tenant_id, created_at, updated_at, duration, date, notes
          )
          VALUES (
            $1, $2, $3, $4, now(), now(), (COALESCE($3::timestamp, now()) - $2::timestamp), $5::date, $6
          )
          RETURNING *, TO_CHAR(date, 'YYYY-MM-DD') AS date_string;
        `;
        values = [task_id, start_time, end_time, tenant_id, date, notes];
      }

      const result = await executeQuery(query, values);
      return result[0];
    } catch (error) {
      console.error("Error inserting timesheet:", error.message);
      throw new Error("Database error while inserting timesheet");
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
    /* const query = `
SELECT 
    ts.id AS id,
    ts.date AS timesheet_date,
    p.id AS project_id,
    p.name AS project_name,
    p.customer_id,
    t.id AS task_id,
    t.task_name,
    ARRAY_AGG(et.employee_id) AS employee_ids,
    TO_CHAR(
        INTERVAL '1 second' * 
        COALESCE(
            EXTRACT(EPOCH FROM ts.duration),
            EXTRACT(EPOCH FROM (COALESCE(ts.end_time, NOW()) - ts.start_time))
        ),
        'HH24:MI'
    ) AS total_time_spent,
    CASE 
        WHEN ts.end_time IS NULL THEN 'Running'
        ELSE 'Not Running'
    END AS status
FROM timesheets ts
JOIN tasks t ON ts.task_id = t.id
JOIN projects p ON t.project_id = p.id
JOIN employee_timesheets et ON ts.id = et.timesheet_id
WHERE p.tenant_id = $1
GROUP BY ts.id, ts.date, p.id, p.name, p.customer_id, t.id, t.task_name, ts.start_time, ts.end_time, ts.duration;

    `; */
    const query = `
    SELECT 
    ts.id AS id,
    ts.date AS timesheet_date,
    p.id AS project_id,
    p.name AS project_name,
    p.customer_id,
    t.id AS task_id,
    t.task_name,
    ARRAY_AGG(et.employee_id) FILTER (WHERE et.employee_id IS NOT NULL) AS employee_ids,
    TO_CHAR(
        INTERVAL '1 second' * 
        COALESCE(
            EXTRACT(EPOCH FROM ts.duration),
            EXTRACT(EPOCH FROM (COALESCE(ts.end_time, NOW()) - ts.start_time))
        ),
        'HH24:MI'
    ) AS total_time_spent,
    CASE 
        WHEN ts.end_time IS NULL THEN 'Running'
        ELSE 'Not Running'
    END AS status
FROM timesheets ts
LEFT JOIN tasks t ON ts.task_id = t.id
LEFT JOIN projects p ON t.project_id = p.id
LEFT JOIN employee_timesheets et ON ts.id = et.timesheet_id
WHERE ts.tenant_id = $1
GROUP BY ts.id, ts.date, p.id, p.name, p.customer_id, t.id, t.task_name, ts.start_time, ts.end_time, ts.duration;

    `
    //console.log(tenant_id)
    const values = [tenant_id];
    try {
      const result = await executeQuery(query, values);
      //console.log(result)
      // Depending on your requirements, you can return all rows or just the first record.
      return result; // Returns all aggregated rows
    } catch (error) {
      console.error("Error fetching timesheet by tenant ID:", error.message);
      throw new Error("Database error while fetching timesheet by tenant ID");
    }
  },

 /* getTimesheetByTenantIdGroupByTask: async (tenant_id) => {
    const query = `
      SELECT 
    p.id AS project_id,
    p.name AS project_name,
    p.customer_id,
    t.id AS task_id,
    t.task_name,
    TO_CHAR(
        INTERVAL '1 second' * COALESCE(SUM(
            COALESCE(
                EXTRACT(EPOCH FROM ts.duration),
                EXTRACT(EPOCH FROM (COALESCE(ts.end_time, NOW()) - ts.start_time))
            )
        ), 0),
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
      return result; // Returns all aggregated rows
    } catch (error) {
      console.error("Error fetching timesheet by tenant ID:", error.message);
      throw new Error("Database error while fetching timesheet by tenant ID");
    }
  },*/

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
