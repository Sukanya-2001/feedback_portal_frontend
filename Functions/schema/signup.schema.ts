import * as yup from "yup";

export const SignUpSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, "Full name must be at least 2 charecters")
    .max(50, "Full name must be at most 50 charecters")
    .required("Fullname is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 charecters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export type SignUpType = yup.InferType<typeof SignUpSchema>;
