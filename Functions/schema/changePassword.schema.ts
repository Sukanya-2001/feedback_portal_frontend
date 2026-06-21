import * as yup from "yup";

export const ChangePasswordSchema = yup.object({
  old_password: yup.string().required("Old Password is required"),
  new_password: yup
    .string()
    .min(8, "Password must be minimum 8 charecters")
    .required("New Password is required"),
  confirm_password: yup
    .string()
    .trim()
    .oneOf([yup.ref("new_password")], "Passwords must match")
    .required("Confirm password is required"),
});

export type ChangePssType = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};
