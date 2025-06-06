import { timesheetService } from "../services/timesheet-service.js";

export const timesheetController = {
  // Create a timesheet entry (start or resume a task)
  startOrResumeTask: async (req, res) => {
    try {
      const { task_id, tenant_id, notes,employees } = req.body;
      if (!task_id || !tenant_id) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: task_id  and tenant_id",
        });
      }
      const timesheet = await timesheetService.startOrResumeTask(
        task_id,
        tenant_id,
        notes,
        employees
      );
      return res.status(201).json({
        success: true,
        data: timesheet,
        message: "Timesheet entry created successfully",
      });
    } catch (error) {
      console.error("Error in startOrResumeTask:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Pause or stop a task (update the timesheet entry by setting end_time)
  pauseOrStopTask: async (req, res) => {
    try {
      const { id } = req.params;
      const { notes } = req.query;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Missing required field: task_id",
        });
      }
      const timesheet = await timesheetService.pauseOrStopTask(id, notes);
      return res.status(200).json({
        success: true,
        data: timesheet,
        message: "Timesheet entry updated successfully",
      });
    } catch (error) {
      console.error("Error in pauseOrStopTask:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  createLoginTimeSheet: async (req, res) => {
    try {
      let { task_id, start_time, end_time, duration, tenant_id, date, notes } =
        req.body;
      // Convert empty strings to null
      start_time = start_time || null;
      end_time = end_time || null;

      if (duration && duration.length === 5) {
        duration = duration + ":00";
      }

      const loginTime = await timesheetService.createLoginTimeSheet(
        task_id,
        start_time,
        end_time,
        tenant_id,
        date,
        duration,
        notes
      );
      res.status(201).json({
        success: true,
        data: loginTime,
        message: "loginTimeSheet created successfully",
      });
    } catch (error) {
      console.error("[ERROR] createLoginTimeSheet:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get all timesheet entries
  getAllTimesheets: async (req, res) => {
    try {
      const timesheets = await timesheetService.getAllTimesheets();
      return res.status(200).json({
        success: true,
        data: timesheets,
        message: "Timesheet entries retrieved successfully",
      });
    } catch (error) {
      console.error("Error in getAllTimesheets:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Get a single timesheet entry by its ID
  getTimesheetById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Invalid timesheet ID",
        });
      }
      const timesheet = await timesheetService.getTimesheetById(id);
      if (!timesheet) {
        return res.status(404).json({
          success: false,
          message: "Timesheet entry not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: timesheet,
        message: "Timesheet entry retrieved successfully",
      });
    } catch (error) {
      console.error("Error in getTimesheetById:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Get timesheet entries for a tenant by tenant_id
  getTimesheetByTenantId: async (req, res) => {
    try {
      const { tenant_id } = req.params;
      if (!tenant_id) {
        return res.status(400).json({
          success: false,
          message: "Invalid tenant ID",
        });
      }
      const timesheets = await timesheetService.getTimesheetByTenantId(
        tenant_id
      );
      if (timesheets.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No timesheet entries found for this tenant",
        });
      }
      return res.status(200).json({
        success: true,
        data: timesheets,
        message: "Timesheet entries retrieved successfully",
      });
    } catch (error) {
      console.error("Error in getTimesheetByTenantId:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Update a timesheet entry by ID
  updateTimesheet: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Invalid timesheet ID",
        });
      }
      if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          message: "No update data provided",
        });
      }
      const updatedTimesheet = await timesheetService.updateTimesheet(
        id,
        updateData
      );
      if (!updatedTimesheet) {
        return res.status(404).json({
          success: false,
          message: "Timesheet entry not found or update failed",
        });
      }
      return res.status(200).json({
        success: true,
        data: updatedTimesheet,
        message: "Timesheet entry updated successfully",
      });
    } catch (error) {
      console.error("Error in updateTimesheet:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Delete a timesheet entry by ID
  deleteTimesheet: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Invalid timesheet ID",
        });
      }
      const result = await timesheetService.deleteTimesheet(id);
      return res.status(200).json({
        success: true,
        data: result,
        message: "Timesheet entry deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteTimesheet:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },


// Get total time spent on tasks grouped by task 
 getTotalTimeSpentByTask : async (req, res) => {
  try {
    const tenant_id = req.params.tenant_id;
    const result = await timesheetService.getTotalTimeSpentByTask(tenant_id);
    return res.status(200).json({
      success: true,
      data: result,
      message: "Total time spent by task retrieved successfully",
    });
  } catch (error) {
    console.error("Error in getTotalTimeSpentByTask:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
},

// Get total time spent on tasks grouped by project
getTotalTimeSpentByProject : async (req, res) => {
  try {
    const tenant_id = req.params.tenant_id;
    const result = await timesheetService.getTotalTimeSpentByProject(tenant_id);
    return res.status(200).json({
      success: true,
      data: result,
      message: "Total time spent by project retrieved successfully",
    });
  } catch (error) {
    console.error("Error in getTotalTimeSpentByProject:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
},


// Get timesheet status report (Running vs Not Running)
getTimesheetStatusReport : async (req, res) => {
  try {
    const tenant_id = req.params.tenant_id;  // Assuming tenant_id is passed in the URL
    const result = await timesheetService.getTimesheetStatusReport(tenant_id);
    return res.status(200).json({ success: true,
      data: result,
      message: "Timesheet status Report retrieved successfully", });
  } catch (error) {
    console.error("Error in controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
},

// Get timesheet duration breakdown by day
 getTimesheetDurationByDay : async (req, res) => {
  try {
    const tenant_id = req.params.tenant_id;  // Assuming tenant_id is passed in the URL
    const result = await timesheetService.getTimesheetDurationByDay(tenant_id);
    return res.status(200).json({ success: true,
      data: result,
      message: "Timesheet Duration By Day retrieved successfully", });
  } catch (error) {
    console.error("Error in controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
},

};
