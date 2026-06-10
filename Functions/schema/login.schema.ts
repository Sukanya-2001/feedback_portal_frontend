import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),
  password: yup.string().trim().required("Password is required"),
});

export type LoginType = yup.InferType<typeof LoginSchema>;
