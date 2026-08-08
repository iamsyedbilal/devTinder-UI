import { api } from "./axios";

export const loginUser = async (data) => {
  const response = await api.post("/signin", data);
  console.log(response);
  return response;
};
