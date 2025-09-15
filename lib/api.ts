// services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};
