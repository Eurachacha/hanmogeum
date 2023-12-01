import axios from "axios";
import { INSTANCE_TIMEOUT, AUTH_TOKEN_KEY } from "@/constants/api";

const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: INSTANCE_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: INSTANCE_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// 헤더에 토큰을 전달하는 요청 인터셉터
privateInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const newConfig = { ...config };
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 에러를 처리하는 응답 인터셉터
privateInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 에러를 처리하는 응답 인터셉터
publicInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { publicInstance, privateInstance };
