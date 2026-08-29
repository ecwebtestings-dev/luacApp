import apiClient from "./apiClient";

export const getAllNotifications =()=>apiClient.get('/notifications');
export const markNotificationsRead =()=>apiClient.post('/notifications/markAsRead');
export const deleteNotification =(noticeId)=>apiClient.delete(`/notification/delete/${noticeId}
`)