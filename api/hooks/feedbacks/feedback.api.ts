import axiosInstance from "@/api/axiosInstance/axiosInstance";
import { BaseApiResponse } from "@/api/common/interface";
import { endpoints } from "@/api/endpoints";
import {
  FeedbackDetailsResponse,
  FeedbackListResponse,
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

export const feedbackList = async (projectId: string) => {
  const response = await axiosInstance.get<FeedbackListResponse>(
    `${endpoints.feedback.list}/${projectId}`,
  );
  return response.data;
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
