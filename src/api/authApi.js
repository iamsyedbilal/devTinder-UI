import { api } from "./axios";

export const signupUser = async (data) => {
  const response = await api.post("/signup", data);
  return response;
};

export const loginUser = async (data) => {
  const response = await api.post("/signin", data);
  return response;
};

export const logoutUser = async () => {
  const response = await api.post("/signout");
  return response;
};

export const getUserProfile = async () => {
  const response = await api.get("/profile");
  return response;
};

export const updatePassword = async (data) => {
  const response = await api.patch("/profile/updatePassword", data);
  return response;
};
