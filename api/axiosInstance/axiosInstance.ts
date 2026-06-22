import axios, { InternalAxiosRequestConfig } from "axios";
import { baseUrlApi } from "../endpoints";
import { parseCookies } from "nookies";
import { toast } from "sonner";
import { deleteCookieValue } from "@/util/cookies";

const axiosInstance = axios.create({
  baseURL: baseUrlApi,
});

let oauthAppAccessToken: string | null = null;

export const setOAuthAppAccessToken = (
  _accessToken: typeof oauthAppAccessToken,
) => {
  oauthAppAccessToken = _accessToken;
};

export const getOAuthAppAccessToken = () => oauthAppAccessToken;

export const refreshToken = async () => {
  return "access-token";
};

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const cookies = parseCookies();
  let _token = cookies[process.env.NEXT_PUBLIC_ACCESS_TOKEN!];
  const AuthToken = getOAuthAppAccessToken();

  if (AuthToken) {
    _token = AuthToken;
  }

  if (_token && config.headers) {
    config.headers["Authorization"] = `Bearer ${_token}`;
  }
  if (config.data && typeof config.data === "object") {
    config.data;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorData = error.response?.data;

    let message =
      errorData?.message || "Something went wrong. Please try again later";

    if (errorData?.errors) {
      const firstError = Object.values(errorData.errors)[0];

      if (Array.isArray(firstError)) {
        message = firstError[0];
      }
    }

    toast.error(message);
    if (error.response?.status === 401) {
      deleteCookieValue(process.env.NEXT_PUBLIC_ACCESS_TOKEN!);
      deleteCookieValue(process.env.NEXT_PUBLIC_REFRESH_TOKEN!);

      window.location.replace("/auth/login");

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
