import * as yup from "yup";

export const feedbackSchema = yup.object({
  guestName: yup.string().trim(),
  guestEmail: yup.string().trim(),
  feedback: yup
    .string()
    .trim()
    .min(5, "Feedback must be al least 5 charecters")
    .max(250, "Feedback must be at most 250 charecters")
    .required("Feedback is required"),
});

export type feedbackType = yup.InferType<typeof feedbackSchema>;

export type FeedbackType = {
  guestName?: string;
  guestEmail?: string;
  feedback: string;
}
