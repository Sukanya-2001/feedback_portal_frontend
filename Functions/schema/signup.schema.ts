import * as yup from "yup";

export const SignUpSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, "Full name must be at least 2 charecters")
    .required("Fullname is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 charecters")
    .required("Password is required"),
});

export type SignUpType = yup.InferType<typeof SignUpSchema>;
