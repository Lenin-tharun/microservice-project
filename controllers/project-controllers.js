import { validate as isUUID } from "uuid";
import { projectService } from "../services/project-service.js";

export const projectController = {
  createProject: async (req, res) => {
    try {
      const data = req.body;

      const projects = await projectService.createProject(data);
      res
        .status(201)
        .json({
          success: true,
          data: projects,
          message: "Project created successfully",
        });
    } catch (error) {
      console.error("[ERROR] createProject:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getAllProjects: async (req, res) => {
    try {
      const { id } = req.params;
      const Projects = await projectService.getAllProjects(id);
      if (!Projects)
        return res
          .status(404)
          .json({ success: false, message: "Projects not found" });

      res
        .status(200)
        .json({
          success: true,
          data: Projects,
          message: "Project retrieved succesfully",
        });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getProjectById: async (req, res) => {
    try {
      const { id } = req.params;

      const project = await projectService.getProjectById(id);

      if (!project)
        return res
          .status(404)
          .json({ success: false, message: "Project not found" });

      res
        .status(200)
        .json({
          success: true,
          data: project,
          message: "Project retrieved successfully",
        });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  getProjectByTenantId: async (req, res) => {
    try {
      const { tenantId } = req.params;

      const project = await projectService.getProjectsByTenantId(tenantId);

      if (project.length === 0) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Project not found for this tenant",
          });
      }

      res
        .status(200)
        .json({
          success: true,
          data: project,
          message: "Project retrieved successfully",
        });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getProjectByStatusAndTenantId: async (req, res) => {
    try {
      const { status } = req.params;
      const { tenantId } = req.query;

      if (!tenantId) {
        return res
          .status(400)
          .json({ error: "Missing tenantId in query params" });
      }

      const project = await projectService.getProjectByStatusAndTenantId(
        status,
        tenantId
      );

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res
        .status(200)
        .json({
          success: true,
          data: project,
          message: "User retrieved successfully",
        });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updateProject = await projectService.updateProject(id, data);
      res
        .status(200)
        .json({
          success: true,
          data: updateProject,
          message: "Project updated successfully",
        });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteProject = await projectService.deleteProject(id);
      res
        .status(200)
        .json({
          success: true,
          data: deleteProject,
          message: "Project deleted successfully",
        });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
