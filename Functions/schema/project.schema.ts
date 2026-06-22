import * as yup from "yup";

export const ProjectSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Project name must be at least 2 charecters")
    .max(50, "Project name must be at most 50 charecters")
    .required("Project name is required"),
  description: yup
    .string()
    .trim()
    .transform((value) => (value ? value.replace(/\r\n/g, "\n").trim() : value))
    .min(20, "Description must be at least 20 charecters")
    .max(10000, "Description must be at most 10000 charecters")
    .required("Description is required"),
  websiteLink: yup
    .string()
    .trim()
    .required("Website link is required")
    .url("Please enter a valid website URL"),
  image: yup
    .mixed<File | string>()
    .required("Profile image is required")
    .test("required", "Profile image is required", (value) => {
      return value instanceof File || typeof value === "string";
    }),
  categories: yup
    .array()
    .of(
      yup.object({
        _id: yup.string().required(),
        name: yup.string().required(),
      }),
    )
    .min(1, "Please select at least one category")
    .max(5, "You can select at most 5 categories")
    .required("Category is required"),
});

export type ProjectType = yup.Asserts<typeof ProjectSchema>;
