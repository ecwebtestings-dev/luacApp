import apiClient from "./apiClient";

export const createComment = (projectId, data) =>apiClient.post(`/project/${projectId}/comment`, data);
export const getProjectComments = (projectId) =>apiClient.get(`/project/${projectId}/comments`);
export const updateComment = (commentId, data) =>apiClient.patch(`/comment/${commentId}/update`, data);
export const deleteComment = (commentId) =>apiClient.delete(`/comment/${commentId}/delete`);