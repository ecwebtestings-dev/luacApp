import apiClient from "./apiClient";
export const register =(userData)=>apiClient.post('/register',userData);
export const login =(credentials)=>apiClient.post('/login',credentials);
export const logout =()=>apiClient.post('/logout');