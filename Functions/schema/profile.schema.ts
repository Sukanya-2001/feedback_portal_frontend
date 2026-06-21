import * as yup from "yup";

export const ProfileSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),

  image: yup
  .mixed<File | string>()
  .required("Profile image is required")
  .test(
    "file-or-url",
    "Profile image is required",
    (value) => !!value && (value instanceof File || typeof value === "string")
  ),
});

export type ProfileType = {
  fullName: string;
  image: string | File;
};
