import { taskService } from "../services/tasks-service.js";

export const taskController = {
  createTask: async (req, res) => {
    try {
      const taskData = req.body;
      const task = await taskService.createTask(taskData);
      res.status(201).json({
        success: true,
        data: task,
        message: "Task created successfully"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const tasks = await taskService.getAllTasks();
      if (!tasks || tasks.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No tasks found"
        });
      }
      res.status(200).json({
        success: true,
        data: tasks,
        message: "Tasks retrieved successfully"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const { task_id } = req.params;
      const task = await taskService.getTaskById(task_id);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found"
        });
      }
      res.status(200).json({
        success: true,
        data: task,
        message: "Task retrieved successfully"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getTaskByTenantId: async (req, res) => {
    try {
      const { tenant_id } = req.params;
      const tasks = await taskService.getTaskByTenantId(tenant_id);
      if (!tasks || tasks.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Tasks not found"
        });
      }
      res.status(200).json({
        success: true,
        data: tasks,
        message: "Tasks retrieved successfully"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getTasksByProjectId: async (req, res) => {
    try {
      const { project_id } = req.params;
      const tasks = await taskService.getTasksByProjectId(project_id);
      if (!tasks || tasks.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Tasks not found"
        });
      }
      res.status(200).json({
        success: true,
        data: tasks,
        message: "Tasks retrieved successfully"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateTask: async (req, res) => {
    try {
      const { task_id } = req.params;
      const updateData = req.body;
      const updatedTask = await taskService.updateTask(task_id, updateData);
      if (!updatedTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found or update failed"
        });
      }
      res.status(200).json({
        success: true,
        data: updatedTask,
        message: "Task updated successfully"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const { task_id } = req.params;
      const deletedTask = await taskService.deleteTask(task_id);
      if (!deletedTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found or already deleted"
        });
      }
      res.status(200).json({
        success: true,
        data: deletedTask,
        message: "Task deleted successfully"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
