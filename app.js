/*import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import projectRoutes from "./routes/project-routes.js";
import projectFormRoutes from "./routes/project-form-routes.js";
import requestLogger from "./middleware/request-logger-middleware.js";
import errorHandler from "./middleware/error-middleware.js";
import authMiddleware from "./middleware/auth-middleware.js";

dotenv.config();

const app = express();
//const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(requestLogger); // Log incoming requests

// Health check route (Public)
app.get("/health", (req, res) => {
    res.status(200).json({ success: true, message: "Service is up and running" });
});

// Secure Routes (Require Authentication)
app.use("/projects", authMiddleware, projectRoutes);
app.use("/forms", authMiddleware, projectFormRoutes);

// Error Handling Middleware (should be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Project Microservice is running on port ${PORT}`);
});

export default app; */


import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import projectRoutes from "./routes/project-routes.js";
import projectFormRoutes from "./routes/project-form-routes.js";
import taskRoutes from "./routes/tasks-routes.js";
import timesheetRoutes from "./routes/timesheet-routes.js";
//import requestLogger from "./middleware/request-logger-middleware.js";
//import errorHandler from "./middleware/error-middleware.js";
//import authMiddleware from "./middleware/auth-middleware.js";
import { requestLogger,responseLogger } from "./middleware/logger-middleware.js";
import  corsMiddleware  from "./middleware/cors-middleware.js";
import projectUsersRoutes from "./routes/project-users-routes.js";
import timesheetUsersRoutes from "./routes/timesheet_users_routes.js"



dotenv.config();

const app = express();
// ✅ Attach logging middleware
app.use(requestLogger);
app.use(responseLogger);

app.use(corsMiddleware);

// Middleware
app.use(bodyParser.json());
//app.use(requestLogger); // Log incoming requests
app.get('/', function (req, res) {
    res.send("Welcome to Project Microservice");
  });

// Secure Routes (Require Authentication)
app.use("/api/projects", projectRoutes);
app.use("/api/forms", projectFormRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/timesheet", timesheetRoutes);
app.use("/api/projectUsers", projectUsersRoutes);
app.use("/api/timesheetUsers", timesheetUsersRoutes);

// Error Handling Middleware (should be last)
//app.use(errorHandler);

export default app;