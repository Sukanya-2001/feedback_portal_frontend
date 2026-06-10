import * as yup from "yup";

export const OtpSchema = yup.object({
  otp: yup.string().trim().required("Otp is required"),
});

export type OtpType = yup.InferType<typeof OtpSchema>