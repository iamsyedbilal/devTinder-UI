import { api } from "./axios";

export const feedUsers = async () => {
  const response = await api.get("/feed");
  return response;
};
