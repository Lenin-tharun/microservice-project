import { executeQuery } from "../utils/query-Executer.js";

export const taskModel = {
  createTask: async (taskName, description, dueDate, projectId, tenantId,  createdBy, estimated_duration,) => {
    try {
      const query = `
        INSERT INTO tasks (task_name, description, due_date, project_id, tenant_id, created_by, estimated_duration, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, now(), now())
        RETURNING *;
      `;
      const values = [taskName, description, dueDate, projectId, tenantId,  createdBy, estimated_duration];
      const result = await executeQuery(query, values);
      return result[0];
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  getAllTasks: async () => {
    try {
      const query = "SELECT * FROM tasks ORDER BY created_at DESC";
      return await executeQuery(query);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  getTaskById: async (task_id) => {
    try {
      const query = "SELECT * FROM tasks WHERE id = $1";
      const values = [task_id];
      const result = await executeQuery(query, values);
      return result.length ? result[0] : null;
    } catch (error) {
      console.error("Error fetching task:", error);
      throw error;
    }
  },

  getTaskByTenantId: async (tenant_id) => {
    try {
      const query = "SELECT * FROM tasks WHERE tenant_id = $1 ORDER BY created_at DESC";
      const values = [tenant_id];
      return await executeQuery(query, values);
    } catch (error) {
      console.error("Error fetching tasks by tenant_id:", error);
      throw error;
    }
  },

  getTasksByProjectId: async (project_id) => {
    try {
  /*     const query = `
      SELECT 
    t.id AS task_id,
    t.task_name,
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM timesheets ts 
            WHERE ts.task_id = t.id 
              AND ts.end_time IS NULL
        ) 
        THEN 'Running' 
        ELSE 'Not Running' 
    END AS status,
    ts.notes
FROM tasks t
LEFT JOIN timesheets ts 
    ON ts.task_id = t.id AND ts.end_time IS NULL
WHERE t.project_id = $1
ORDER BY t.id;
`; */
      const query = `
      SELECT 
    t.id AS task_id,
    t.task_name,
    t.estimated_duration,
    CASE 
        WHEN ts.id IS NOT NULL THEN 'Running'
        ELSE 'Not Running'
    END AS status,
    ts.notes,
    ARRAY_AGG(DISTINCT et.employee_id) FILTER (WHERE ts.id IS NOT NULL) AS employee_ids
FROM tasks t
LEFT JOIN timesheets ts 
    ON ts.task_id = t.id AND ts.end_time IS NULL
LEFT JOIN employee_timesheets et 
    ON ts.id = et.timesheet_id
WHERE t.project_id = $1
GROUP BY t.id, t.task_name, ts.id, estimated_duration, ts.notes
ORDER BY t.id;

      `
      const values = [project_id];
      return await executeQuery(query, values);
    } catch (error) {
      console.error("Error fetching tasks by project ID:", error);
      throw error;
    }
  },

  updateTask: async (task_id, updateData) => {
    try {
      let fields = [];
      let values = [];
      let index = 1;

      for (const key in updateData) {
        if (updateData[key] !== undefined) {
          fields.push(`${key} = $${index}`);
          values.push(updateData[key]);
          index++;
        }
      }

      if (fields.length === 0) {
        throw new Error("No fields to update");
      }

      values.push(task_id);
      const query = `UPDATE tasks SET ${fields.join(", ")}, updated_at = now() WHERE id = $${index} RETURNING *;`;

      const result = await executeQuery(query, values);
      return result[0];
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  deleteTask: async (task_id) => {
    try {
      const query = "DELETE FROM tasks WHERE id = $1 RETURNING *";
      const values = [task_id];
      const result = await executeQuery(query, values);
      return result[0];
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
};
