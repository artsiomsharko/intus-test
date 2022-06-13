import axios from "axios";

const baseURL = "https://reqres.in/api/";

export const apiClient = axios.create({ baseURL });
