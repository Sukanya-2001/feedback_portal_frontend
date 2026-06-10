import * as yup from "yup";

export const ProfileSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),

  image: yup
    .mixed<File | string>()
    .test("required", "Profile image is required", (value) => {
      return value instanceof File || typeof value === "string";
    }),
});

export type ProfileType = yup.InferType<typeof ProfileSchema>;
