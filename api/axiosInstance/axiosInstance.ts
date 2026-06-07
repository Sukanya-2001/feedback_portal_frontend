import axios, { InternalAxiosRequestConfig } from "axios";
import { baseUrlApi } from "../endpoints";
import { parseCookies } from 'nookies';

const axiosInstance = axios.create({
    baseURL: baseUrlApi,
})

let oauthAppAccessToken: string | null = null;

export const setOAuthAppAccessToken = (_accessToken: typeof oauthAppAccessToken) => {
    oauthAppAccessToken = _accessToken
}

export const getOAuthAppAccessToken = () => oauthAppAccessToken;

export const refreshToken = async () => {
    return 'access-token';
}

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const cookies = parseCookies();
  let _token = cookies[process.env.NEXT_PUBLIC_TOKEN_NAME!];
  const AuthToken = getOAuthAppAccessToken();

  if (AuthToken) {
    _token = AuthToken;
  }

  if (_token && config.headers) {
    config.headers['Authorization'] = `Bearer ${_token}`;
  }
  if (config.data && typeof config.data === 'object') {
    config.data ;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    return Promise.reject(error); // ❗ NO retry
  },
);

export default axiosInstance;