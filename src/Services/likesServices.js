import apiClient from "./apiClient";
export const likeProject = (projectId) =>apiClient.post(`/project/${projectId}/like`);
export const getProjectLikesCount = (projectId) =>apiClient.get(`/project/${projectId}/likes/count`);