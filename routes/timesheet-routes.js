import express from "express";
import  { timesheetController } from "../controllers/timesheet-controllers.js";

const router = express.Router();

// Create a timesheet entry (start or resume a task)
router.post("/", timesheetController.startOrResumeTask);

router.post("/log-time/", timesheetController.createLoginTimeSheet);

// Pause or stop a task (update timesheet entry)
router.put("/:id", timesheetController.pauseOrStopTask);

// Get all timesheet entries
router.get("/", timesheetController.getAllTimesheets);

// Get a single timesheet entry by its ID
router.get("/:id", timesheetController.getTimesheetById);

// Get timesheet entries by tenant ID
router.get("/tenant/:tenant_id", timesheetController.getTimesheetByTenantId);

// Update a timesheet entry by ID
router.put("/:id", timesheetController.updateTimesheet);

// Delete a timesheet entry by ID
router.delete("/:id", timesheetController.deleteTimesheet);

//getTotalTimeSpentByTask
router.get("/toto-time/task/:tenant_id", timesheetController.getTotalTimeSpentByTask);
//getTotalTimeSpentByproject
router.get("/total_time/project/:tenant_id", timesheetController.getTotalTimeSpentByProject);
//getTimesheetStatusReport
router.get("/status/:tenant_id", timesheetController.getTimesheetStatusReport);
//getTimesheetDurationByDay
router.get("/duration/:tenant_id", timesheetController.getTimesheetDurationByDay);


export default router;
