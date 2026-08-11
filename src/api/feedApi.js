import { api } from "./axios";

export const feedUsers = async () => {
  const response = await api.get("/feed");
  return response;
};

export const getRequests = async () => {
  const response = await api.get("/user/requests/received");
  return response;
};

export const getConnections = async () => {
  const response = await api.get("/user/connections");
  return response;
};
