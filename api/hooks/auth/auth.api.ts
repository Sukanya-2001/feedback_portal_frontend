import axiosInstance from "@/api/axiosInstance/axiosInstance";
import { endpoints } from "@/api/endpoints";
import {
  LoginResponse,
  SignUpResponse,
  ProfileDetailsResponse,
} from "./auth.interface";
import { BaseApiResponse } from "@/api/common/interface";
import { getCookieValue } from "@/util/cookies";
import { ChangePssType } from "@/Functions/schema/changePassword.schema";

export const login = async (payload: { email: string; password: string }) => {
  const response = await axiosInstance.post<LoginResponse>(
    endpoints.auth.login,
    payload,
  );
  return response.data;
};

export const signUp = async (payload: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post<SignUpResponse>(
    endpoints.auth.signUp,
    payload,
  );
  return response.data;
};

export const emailVerify = async (payload: { email: string; otp: string }) => {
  const response = await axiosInstance.post<BaseApiResponse>(
    endpoints.auth.emailVerify,
    payload,
  );
  return response.data;
};

export const forgotPassword = async (payload: { email: string }) => {
  const response = await axiosInstance.post<BaseApiResponse>(
    endpoints.auth.forgotPassword,
    payload,
  );
  return response.data;
};

export const otpVerify = async (payload: { email: string; otp: string }) => {
  const response = await axiosInstance.post<BaseApiResponse>(
    endpoints.auth.otpVerify,
    payload,
  );
  return response.data;
};

export const resetPassword = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post<BaseApiResponse>(
    endpoints.auth.resetPassword,
    payload,
  );
  return response.data;
};

export const changePassword = async (payload: ChangePssType) => {
  const response = await axiosInstance.post<BaseApiResponse>(
    endpoints.auth.changePassword,
    payload,
  );
  return response.data;
};

export const profileDetails = async () => {
  const accessToken = await getCookieValue(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN!,
  );
  if (!!accessToken) {
    const response = await axiosInstance.get<ProfileDetailsResponse>(
      endpoints.auth.profileDetails,
    );
    return response.data;
  }
};

export const profileUpdate = async (payload: FormData) => {
  const response = await axiosInstance.patch<ProfileDetailsResponse>(
    endpoints.auth.profileUpdate,
    payload,
  );
  return response.data;
};
