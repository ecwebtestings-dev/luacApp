import apiClient from "./apiClient";

//PROFILE UPDATES
export const upDateUserProfile =(data)=>apiClient.post('/profile/update',data);
export const viewUserProfle =(userId)=>apiClient.get(`/user/${userId}/profile`);


export const getUser = (userId) => apiClient.get(`/user/${userId}`);
export const updateUserInfo = (userId, data) => apiClient.post(`/users/update/${userId}`, data);
export const getAllUsers = (page = 1) => apiClient.get('/users', { params: { page } });
export const suspendUser = (userId) => apiClient.patch(`/users/suspend/${userId}`);
export const makeAdmin = (userId) => apiClient.patch(`/users/create_admin/${userId}`);
export const demoteAdmin = (userId) => apiClient.patch(`/users/demote_admin/${userId}`);
export const getAllSuspendedUsers = () => apiClient.get('/users/suspended');
export const UnsuspendUser = (userId) => apiClient.patch(`/users/unsuspend/${userId}`);