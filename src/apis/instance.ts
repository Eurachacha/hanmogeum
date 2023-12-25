import axios from "axios";

export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // timeout: INSTANCE_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // timeout: INSTANCE_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const fileUploadInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // timeout: INSTANCE_TIMEOUT,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});
