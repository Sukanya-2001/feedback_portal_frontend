import * as yup from "yup";

export const ProjectSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Project name must be at least 2 charecters")
    .required("Project name is required"),
  description: yup
    .string()
    .trim()
    .min(10, "Description must be at least 10 charecters")
    .required("Description is required"),
  websiteLink: yup.string().trim().required("Website link is required"),
  image: yup
    .mixed<File | string>()
    .test("required", "Profile image is required", (value) => {
      return value instanceof File || typeof value === "string";
    }),
});
