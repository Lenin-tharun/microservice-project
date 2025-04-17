import { taskModel } from "../models/task-model.js";

export const taskService = {
  createTask: async (taskData) => {
    try {
      const { task_name, description, due_date, project_id, tenant_id, created_by } = taskData;

      // Validate required fields
      if (!task_name || !project_id || !tenant_id || !created_by) {
        throw new Error("Missing required fields: task_name, project_id, tenant_id, created_by");
      }

      // Create task in DB
      const taskResult = await taskModel.createTask(
        task_name,
        description,
        due_date,
        project_id,
        tenant_id,
        created_by,
      );

      return taskResult; 
    } catch (error) {
      console.error(`[ERROR] createTask: ${error.message}`, { error });
      throw new Error("Error creating task");
    }
  },

 
  getAllTasks: async () => {
    try {
      return await taskModel.getAllTasks();
    } catch (error) {
      console.error(`[ERROR] getAllTasks: ${error.message}`, { error });
      throw new Error("Error fetching tasks");
    }
  },

 
  getTaskById: async (task_id) => {
    try {
      if (!task_id) throw new Error("Task ID is required");
      
      const task = await taskModel.getTaskById(task_id);
      if (!task) throw new Error("Task not found");

      return task;
    } catch (error) {
      console.error(`[ERROR] getTaskById: ${error.message}`, { error });
      throw new Error(error.message || "Error fetching task");
    }
  },


  getTaskByTenantId: async (tenant_id) => {
    try {
      if (!tenant_id) throw new Error("Tenant ID is required");

      return await taskModel.getTaskByTenantId(tenant_id);
    } catch (error) {
      console.error(`[ERROR] getTasksByTenantId: ${error.message}`, { error });
      throw new Error("Error fetching tasks by tenant ID");
    }
  },

 
  getTasksByProjectId: async (project_id) => {
    try {
      if (!project_id) throw new Error("Project ID is required");

      return await taskModel.getTasksByProjectId(project_id);
    } catch (error) {
      console.error(`[ERROR] getTasksByProjectId: ${error.message}`, { error });
      throw new Error("Error fetching tasks by project ID");
    }
  },

  
  updateTask: async (task_id, updateData) => {
    try {
      if (!task_id) throw new Error("Task ID is required");
      if (!Object.keys(updateData).length) throw new Error("No update data provided");

      const updatedTask = await taskModel.updateTask(task_id, updateData);
      if (!updatedTask) throw new Error("Task update failed");

      return updatedTask;
    } catch (error) {
      console.error(`[ERROR] updateTask: ${error.message}`, { error });
      throw new Error(error.message || "Error updating task");
    }
  },

  
  deleteTask: async (task_id) => {
    try {
      if (!task_id) throw new Error("Task ID is required");

      const deletedTask = await taskModel.deleteTask(task_id);
      if (!deletedTask) throw new Error("Task not found or already deleted");

      return deletedTask;
    } catch (error) {
      console.error(`[ERROR] deleteTask: ${error.message}`, { error });
      throw new Error(error.message || "Error deleting task");
    }
  },

  // Task Count by Status (Running / Not Running)

  getTaskStatusSummary: async (project_id) => {
    try {
      if (!project_id) throw new Error("Project ID is required");
      return await taskModel.getTaskStatusSummary(project_id);
    } catch (error) {
      console.error(`[ERROR] getTaskStatusSummary: ${error.message}`, { error });
      throw new Error("Error fetching task status summary");
    }
  },
  
//Task Duration Report
  getTaskDurationReport: async(project_id) => {
    try{
      if(!project_id) throw new Error("project id required");
      return await taskModel.getTaskDurationReport(project_id);
    } catch(error){
      console.error(`[ERROR] getTaskDurationReport: ${error.message}`, {error});
      throw new Error("Error fetching task Duration ")
    }
  },

  /*// Tasks Assigned to Employees (with Timesheets)
getEmployeeTaskReport: async(project_id) => {
  try{
    if(!project_id) throw new Error ("project id required");
    return await taskModel.getEmployeeTaskReport(project_id);
  } catch(error) {
    console.error(`[ERROR] getEmployeeTaskReport: ${error.message}`, {error});
    throw new Error (" Error Fetching Employee Task Report")
  }
},*/

//Overdue Tasks Report
getOverdueTasks: async (todayDate, project_id) => {
  try{
    if(!todayDate) throw new Error ("Today's date is required");
    if(!project_id) throw new Error ("project ID is required");

    return await taskModel.getOverdueTasks(todayDate, project_id);
  } catch (error) {
    console.error(`[ERROR] getOverdueTasks: ${error.message}`, {error});
    throw new Error ("Error Fetching OverdueTasks");
  }
},

//Monthly Task Creation Report
getMonthlyTaskStatus : async(tenant_id) => {
  try{
    if(!tenant_id) throw new Error ("Tenant_id is Required");
    return await taskModel.getMonthlyTaskStatus(tenant_id);
  } catch (error) {
    console.error(`[ERROR] getMonthlyTaskStatus: ${error.message}`, {error})
    throw new Error (" Error Fetching MonthlyTaskStatus")
  }
},


};
