import apiClient from "./apiClient";

export const getAllLogs =()=>apiClient.get('/logs');
export const deleteLog =(logId)=>apiClient.delete(`/log/${logId}/delete`);
export const deleteOldLogs =()=>apiClient.delete('/logs/delete');