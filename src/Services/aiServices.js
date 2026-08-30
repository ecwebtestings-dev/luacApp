import apiClient from "./apiClient";

export const aiAgent =()=>apiClient.post('/ai/chat');