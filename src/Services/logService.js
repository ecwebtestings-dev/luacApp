import apiClient from "./apiClient";

export const getAllLogs = (page = 1) => apiClient.get(`/logs?page=${page}`);
export const deleteLog = (logId) => apiClient.delete(`/log/${logId}/delete`);
export const deleteOldLogs = () => apiClient.delete('/logs/delete');