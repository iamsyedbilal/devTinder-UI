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

export const sendConnectionRequest = async (status, toUserId) => {
  const response = await api.post(`/request/send/${status}/${toUserId}`);
  return response;
};

export const acceptOrRejectRequest = async (status, requestId) => {
  const response = await api.post(`/request/review/${status}/${requestId}`);
  return response;
};
