import { apiClient } from "@/services/apiClient";

export const getUsers = async () => {
  const response = await apiClient.get("users?per_page=5");
  return response.data;
};

export const createUser = async (user) => {
  const encodedUser = JSON.stringify(user);
  const response = await apiClient.post("users", encodedUser, {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
