import apiClient from "./apiClient";

export const createProject = (data) =>apiClient.post("/project/create", data);
export const updateProject = (projectId, data) =>apiClient.patch(`/project/${projectId}/update`, data);
export const getAllProjects = () =>apiClient.get("/projects");
export const deleteProject = (projectId) =>apiClient.delete(`/project/${projectId}/delete`);