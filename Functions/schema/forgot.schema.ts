import * as yup from "yup";

export const ForgotSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),
});

export type ForgotType = yup.InferType<typeof ForgotSchema>;
