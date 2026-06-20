import axiosInstance from "@/api/axiosInstance/axiosInstance";
import { BaseApiResponse } from "@/api/common/interface";
import { endpoints } from "@/api/endpoints";
import {
  FeedbackDetailsResponse,
  FeedbackListResponse,
  SavedFeedbackResponse,
} from "./feedback.interface";

export const feedbackCreate = async (payload: {
  projectId: string;
  feedback: string;
  userName?: string;
  guestEmail?: string;
}) => {
  const response = await axiosInstance.post<FeedbackDetailsResponse>(
    endpoints.feedback.create,
    payload,
  );
  return response.data;
};

export const feedbackList = async ({
  page,
  limit,
  projectId,
  saved,
}: {
  page: number;
  limit: number;
  projectId: string;
  saved?: boolean;
}) => {
  let response;
  if (saved) {
    response = await axiosInstance.get<FeedbackListResponse>(
      `${endpoints.feedback.list}/${projectId}?page=${page}&limit=${limit}&saved=true`,
    );
  } else {
    response = await axiosInstance.get<FeedbackListResponse>(
      `${endpoints.feedback.list}/${projectId}?page=${page}&limit=${limit}`,
    );
  }
  return response.data.data;
};

export const feedbackUpdate = async (
  feedbackId: string,
  payload: { feedback: string },
) => {
  const response = await axiosInstance.put<FeedbackDetailsResponse>(
    `${endpoints.feedback.update}/${feedbackId}`,
    payload,
  );
  return response.data;
};

export const feedbackDelete = async (feedbackId: string) => {
  const response = await axiosInstance.delete<BaseApiResponse>(
    `${endpoints.feedback.delete}/${feedbackId}`,
  );
  return response.data;
};

export const feedbackReply = async (
  feedbackId: string,
  payload: { comment: string },
) => {
  const response = await axiosInstance.patch<BaseApiResponse>(
    `${endpoints.feedback.reply}/${feedbackId}`,
    payload,
  );
  return response.data;
};

export const markAsSave = async (feedbackId: string) => {
  const response = await axiosInstance.patch(
    `${endpoints.feedback.feedbackSave}/${feedbackId}`,
  );
  return response.data;
};

export const savedFeedbacks = async () => {
  const response = await axiosInstance.get<SavedFeedbackResponse>(
    endpoints.feedback.allSavedFeedback,
  );
  return response.data;
};
