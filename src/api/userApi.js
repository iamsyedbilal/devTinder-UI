import { api } from "./axios";

export const editProfile = async (data) => {
  const response = await api.patch("/profile/edit", data);
  return response;
};
