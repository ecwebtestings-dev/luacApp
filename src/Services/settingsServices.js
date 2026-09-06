import apiClient from "./apiClient";
export const updatePassword = (data) =>apiClient.patch("/password/update", data);
export const updateUsername = (data) =>apiClient.post("/username/update", data);
export const deleteAccount = () =>apiClient.post("/deleteAccount");