import express from "express";
import { timesheetUsersController }  from "../controllers/timesheet_users_controllers.js";

const router = express.Router();

// Route to create a new timesheet user association
router.post("/", timesheetUsersController.saveTimesheetUser);

// Route to get all timesheet user associations for a given timesheet_id
router.get("/:timesheet_id", timesheetUsersController.getTimesheetUsersByTimesheetId);

export default router;
