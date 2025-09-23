// services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // your JWT token saved at login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Users APIs
export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

//Products APIs
export const addProduct = async (data: any) => {
  const response = await API.post("/products/", data);
  return response.data;
};

export const getAllProducts = async (page:number =1,limit:number=10) => {
  const response = await API.get(`/products?page=${page}&limit=${limit}`);
  return response.data;
};

export const getProductById = async (id:any) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

export const updateProductById = async (id:any,data:any) => {
  const response = await API.put(`/products/${id}`,data);
  return response.data;
};

export const deleteProductById = async (id:any) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};