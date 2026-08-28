import apiClient from "./ApiClient";

export const createEvent = (data) => apiClient.post("/event/create", data);
export const updateEvent = (eventId, data) =>apiClient.patch(`/event/${eventId}/update`, data);
export const deleteEvent = (eventId) =>apiClient.delete(`/event/${eventId}/delete`);
export const viewEvents = () =>apiClient.get("/events");