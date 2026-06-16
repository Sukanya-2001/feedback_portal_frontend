import * as yup from "yup";

export const ResetSchema = yup.object({
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

export type ResetType = yup.InferType<typeof ResetSchema>;
