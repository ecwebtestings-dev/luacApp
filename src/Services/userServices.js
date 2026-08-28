import apiClient from "./ApiClient";

export const getUser = (userId)=>apiClient.get(`/user/${userId}/`)
export const updateUserInfo = (userId,data)=>apiClient.post(`/users/update/${userId}`,data);
export const getAllUsers =()=>apiClient.get('/users');
export const suspendUser =(userId)=>apiClient.post(`/users/delete/${userId}`);
export const makeAdmin =(userId) =>apiClient.post(`/users/create_admin/${userId}`);
export const demoteAdmin =(userId) =>apiClient.post(`/users/demote_admin/${userId}`);
export const getAllSuspendedUsers = () =>apiClient.get('/users/suspended');
export const UnsuspendUser =(userId) =>apiClient.post(`/user/unsuspend/${userId}`);
