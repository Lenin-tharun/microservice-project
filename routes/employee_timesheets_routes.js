import express from "express";
import { employeeTimesheetsController }  from "../controllers/employee_timesheets_controllers.js";

const router = express.Router();

// Route to create a new timesheet user association
router.post("/", employeeTimesheetsController.saveEmployeeTimesheets);

// Route to get all timesheet user associations for a given timesheet_id
router.get("/:timesheet_id", employeeTimesheetsController.getEmployeeTimesheetsByTimesheetId);

export default router;
