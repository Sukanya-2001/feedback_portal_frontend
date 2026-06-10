import {
  changePassword,
  emailVerify,
  forgotPassword,
  login,
  otpVerify,
  profileDetails,
  profileUpdate,
  resetPassword,
  signUp,
} from "@/api/hooks/auth/auth.api";
import { allkeys } from "./allKeys";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLoginFunc = () => {
  return useMutation({
    mutationKey: [allkeys.USER_LOGIN],
    mutationFn: login,
  });
};

export const useSignUpFunc = () => {
  return useMutation({
    mutationKey: [allkeys.USER_SIGNUP],
    mutationFn: signUp,
  });
};

export const useEmailVerify = () => {
  return useMutation({
    mutationKey: [allkeys.EMAIL_VERIFY],
    mutationFn: emailVerify,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: [allkeys.FORGOT_PASSWORD],
    mutationFn: forgotPassword,
  });
};

export const useOtpVerify = () => {
  return useMutation({
    mutationKey: [allkeys.OTP_VERIFY],
    mutationFn: otpVerify,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationKey: [allkeys.RESET_PASSWORD],
    mutationFn: resetPassword,
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationKey: [allkeys.CHANGE_PASSWORD],
    mutationFn: changePassword,
  });
};

export const useProfileDetails = () => {
  return useQuery({
    queryKey: [allkeys.PROFILE_DETAILS],
    queryFn: profileDetails,
  });
};

export const useProfileUpdate = () => {
  return useMutation({
    mutationKey: [allkeys.PROFILE_UPDATE],
    mutationFn: profileUpdate,
  });
};
