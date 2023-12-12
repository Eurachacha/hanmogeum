import axios, { AxiosError } from "axios";
import { INSTANCE_TIMEOUT, AUTH_TOKEN_KEY } from "@/constants/api";

const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: INSTANCE_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: INSTANCE_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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

const getNewToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await axios.get<{ ok: number; accessToken: string }>(
      `${import.meta.env.VITE_API_BASE_URL}/users/refresh`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
        withCredentials: true,
      },
    );
    const { accessToken: newAccessToken } = response.data;
    return newAccessToken;
  } catch (error) {
    return console.error(error);
  }
};

// 에러를 처리하는 응답 인터셉터
privateInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<{ errorName: string; message: string; ok: number }>) => {
    if (error.response?.data.errorName === "TokenExpiredError") {
      const newAccessToken = await getNewToken();
      if (newAccessToken) {
        localStorage.setItem("token", newAccessToken);
        window.location.reload();
      }
    }
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
