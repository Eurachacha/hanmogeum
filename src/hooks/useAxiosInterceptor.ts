import axios, { AxiosError } from "axios";
import { useSetRecoilState } from "recoil";
import { privateInstance, publicInstance } from "@/apis/instance";
import { AUTH_TOKEN_KEY } from "@/constants/api";
import tokenExpireModalState from "@/recoil/atoms/tokenExpireModalState";

const useAxiosInterceptor = () => {
  const setIsTokenExpireModalOpen = useSetRecoilState(tokenExpireModalState);

  // privateInstance 요청 인터셉터(헤더에 토큰 전달)
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
      // alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
      setIsTokenExpireModalOpen(true);
      // window.location.assign("/login");
      return console.error(error);
    }
  };

  // privateInstance 응답 인터셉터
  privateInstance.interceptors.response.use(
    (response) => {
      if (response.config.url?.startsWith("/admin") || response.config.url?.startsWith("/seller")) {
        const data = response?.data?.item;
        if (data) {
          if (Array.isArray(data)) {
            const items = response?.data?.item.map((e: any) => {
              return { ...e, id: e._id };
            });
            response.data.item = items;
          } else response.data.item = { ...data, id: data._id };
        } else {
          response.data.item = { ...response.data.updated, id: response.data.updated?._id } || {
              ...response.data.message,
            } || { ...response.data.ok };
        }
      }
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

  // publicInstance 응답 인터셉터
  publicInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

export default useAxiosInterceptor;
