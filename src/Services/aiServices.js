import apiClient from "./apiClient";


export const aiAgent = (message, history = []) =>apiClient.post("/ai/chat", { message, history });