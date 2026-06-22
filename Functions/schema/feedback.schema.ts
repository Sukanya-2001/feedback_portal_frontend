import * as yup from "yup";

export const feedbackSchema = yup.object({
  guestName: yup.string().trim().max(50, "Name cannot exceed 50 characters"),

  guestEmail: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),

  feedback: yup
    .string()
    .trim()
    .min(10, "Feedback must be at least 10 characters")
    .max(500, "Feedback cannot exceed 500 characters")
    .required("Feedback is required"),
});

export type feedbackType = yup.InferType<typeof feedbackSchema>;

export type FeedbackType = {
  guestName?: string;
  guestEmail?: string;
  feedback: string;
};
