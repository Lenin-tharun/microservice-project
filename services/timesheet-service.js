import { timesheetModel } from "../models/timesheet-model.js";

export const timesheetService = {
  // CREATE TIMESHEET ENTRY: Start or resume a task
  startOrResumeTask: async ( task_id, tenant_id, notes ) => {
    try {
      if (!task_id || !tenant_id ) {
        throw new Error("Missing required fields: task_id,  and tenant_id");
      }
      // Business logic can be added here if needed
      return await timesheetModel.startOrResumeTask(task_id, tenant_id, notes);
    } catch (error) {
      console.error("Error creating timesheet entry:", error.message);
      throw new Error(error.message || "Error creating timesheet entry");
    }
  },


  // PAUSE OR STOP TASK: Update the timesheet entry (set end_time)
  pauseOrStopTask: async ( task_id,  notes ) => {
    try {
      if (!task_id ) {
        throw new Error("Missing required field: task_id");
      }
      return await timesheetModel.pauseOrStopTask(task_id, notes);
    } catch (error) {
      console.error("Error pausing/stopping timesheet entry:", error.message);
      throw new Error(error.message || "Error pausing/stopping timesheet entry");
    }
  },

  createLoginTimeSheet: async ( task_id, start_time, end_time, tenant_id, date, duration, notes ) => {
    try {
      if (!task_id  || !tenant_id ) {
        throw new Error("Missing required fields: task_id and tenant_id");
      }
      // Business logic can be added here if needed
      const result = await timesheetModel.createLoginTimeSheet(task_id, start_time, end_time, tenant_id, date, duration, notes);
      return result;
    } catch (error) {
      console.error("Error creating Login_time entry:", error.message);
      throw new Error(error.message || "Error creating Login_time entry");
    }
  },


  // GET ALL TIMESHEET ENTRIES (No pagination)
  getAllTimesheets: async () => {
    try {
      return await timesheetModel.getAllTimesheets();
    } catch (error) {
      console.error("Error fetching timesheet entries:", error.message);
      throw new Error(error.message || "Error fetching timesheet entries");
    }
  },

  // GET TIMESHEET ENTRY BY ID
  getTimesheetById: async (id) => {
    try {
      if (!id) throw new Error("Invalid timesheet ID");
      const timesheet = await timesheetModel.getTimesheetById(id);
      if (!timesheet) throw new Error("Timesheet entry not found");
      return timesheet;
    } catch (error) {
      console.error("Error fetching timesheet by ID:", error.message);
      throw new Error(error.message || "Error fetching timesheet");
    }
  },

  // GET TIMESHEET ENTRIES BY TENANT ID
  getTimesheetByTenantId: async (tenant_id) => {
    try {
      if (!tenant_id) throw new Error("Invalid tenant ID");
      const timesheets = await timesheetModel.getTimesheetByTenantId(tenant_id);
      if (!timesheets || timesheets.length === 0)
        throw new Error("No timesheet entries found for tenant");
      return timesheets;
    } catch (error) {
      console.error("Error fetching timesheet by tenant ID:", error.message);
      throw new Error(error.message || "Error fetching timesheet by tenant ID");
    }
  },

  // UPDATE TIMESHEET ENTRY
  updateTimesheet: async (id, updateData) => {
    try {
      if (!id) throw new Error("Invalid timesheet ID");
      if (!updateData || Object.keys(updateData).length === 0)
        throw new Error("No update data provided");

      // Business logic: if both startTime and endTime are provided, recalc duration (in minutes)
      if (updateData.startTime && updateData.endTime) {
        const startTime = new Date(updateData.startTime);
        const endTime = new Date(updateData.endTime);
        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
          throw new Error("Invalid date format for startTime or endTime");
        }
        updateData.duration = Math.floor((endTime - startTime) / (1000 * 60));
      }

      const updatedTimesheet = await timesheetModel.updateTimesheet(id, updateData);
      if (!updatedTimesheet)
        throw new Error("Timesheet entry not found or update failed");
      return updatedTimesheet;
    } catch (error) {
      console.error("Error updating timesheet entry:", error.message);
      throw new Error(error.message || "Error updating timesheet entry");
    }
  },

  // DELETE TIMESHEET ENTRY
  deleteTimesheet: async (id) => {
    try {
      if (!id) throw new Error("Invalid timesheet ID");
      const deletedTimesheet = await timesheetModel.deleteTimesheet(id);
      if (!deletedTimesheet)
        throw new Error("Timesheet entry not found");
      return { message: "Timesheet entry deleted successfully" };
    } catch (error) {
      console.error("Error deleting timesheet entry:", error.message);
      throw new Error(error.message || "Error deleting timesheet entry");
    }
  },
};
