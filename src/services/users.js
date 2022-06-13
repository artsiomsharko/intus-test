import axios from "axios";

const instance = axios.create({
  baseURL: "https://reqres.in/api/",
});

export const getUsers = async () => {
  const response = await instance.get("users?per_page=5");
  return response.data;
};

export const createUser = async (user) => {
  const encodedUser = JSON.stringify(user);
  const response = await instance.post("users", encodedUser, {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
