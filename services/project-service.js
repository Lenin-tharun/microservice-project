import { projectModel } from "../models/project-model.js";
import { projectEmployeeService } from "./project-employee-service.js";
import { taskService } from "./tasks-service.js";
import { validate as isUuid } from "uuid";

export const projectService = {
  // ✅ CREATE PROJECT
  createProject: async (data) => {
    try {
      const { project_code, name, customer_id, description, due_date, status, tenant_id, assignedEmployees, tasks, created_by, estimated_duration } = data;
      if (!isUuid(customer_id)) {
        throw new Error("Invalid UUID format for project ID");
      }
      // Creating Project details
      const projectResult = await projectModel.createProject(
        project_code,
        name,
        customer_id,
        description,
        due_date,
        status,
        tenant_id,
        created_by,
        estimated_duration
      );

      // Save Project Users
      const saveProjectEmployee = await Promise.all(
        //assignedEmployees.map(async (emp) => {
          (assignedEmployees || []) .map(async (emp) => { 
          return projectEmployeeService.saveProjectEmployee(
            projectResult.id,
            emp,
            tenant_id
          );
        })
      );
      // Save Project Tasks
      const projectTask = await Promise.all(
        //tasks.map(async (task) => {
          (tasks || []) .map(async (task) =>{
          const currentTask = {
            task_name: task.taskName,           // Assuming the API expects 'name'
            description: task.description,
            status: "",                    // Add appropriate status key if needed
            project_id: projectResult.id,
            tenant_id: tenant_id,
            due_date:due_date,
            created_by
          };
          return taskService.createTask(currentTask);
        })
      );
      

      return "Prjoect Successfully Saved";
    } catch (error) {
      console.error(`[ERROR] createProject: ${error.message}`, { error });
      throw new Error(error.message || "Error creating project");
    }
  },

  // ✅ GET ALL PROJECTS
  getAllProjects: async () => {
    try {
      return await projectModel.getAllProjects();
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw new Error("Error fetching projects");
    }
  },

  // ✅ GET PROJECT BY ID
  getProjectById: async (id) => {
    try {
      const project = await projectModel.getProjectById(id);
      return project || null;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw new Error ("failed to fetch project by ID");
  }
},

  // ✅ GET PROJECT BY TENANT_ID
  getProjectsByTenantId: async (tenant_id) => {
    try {
      // Check for null,
      if (tenant_id === null || tenant_id === undefined) {
        throw new Error("tenant_id cannot be null or undefined");
      }
      // Check if it is a valid UUID
      if (!isUuid(tenant_id)) {
        throw new Error("Invalid UUID format for tenant_id");
      }
      const projects = await projectModel.getProjectsByTenantId(tenant_id);
      return projects;
    } catch (error) {
      console.error("Error fetching project by Tenant_ID:", error);
    throw new Error ("failed to fetch project by Tenant_ID");
    }
  },


  getProjectByStatusAndTenantId: async (status, tenantId) => {
    try {
      const projects = await projectModel.getProjectByStatusAndTenantId(status, tenantId);
      return projects.length ? projects : null;
    } catch (error) {
      console.error(`[ERROR] getProjectByStatusAndTenantId: ${error.message}`, { error });
      throw new Error("Failed to fetch projects by status and Tenant_ID");
    }
  },

  // ✅ UPDATE PROJECT
  updateProject: async (id, data) => {
    try {
      return await projectModel.updateProject(id, data);
    }catch (error) {
      console.error("Error updating project:", error);
      throw new Error("Failed to update project");
    }
  },

  // ✅ DELETE PROJECT
  deleteProject: async (id) => {
    try {
      return await projectModel.deleteProject(id);
    } catch (error) {
      console.error("Error deleting project:", error);
      throw new Error ("Failed to delete project");
    }
  }
      
};
