import {
  feedbackCreate,
  feedbackList,
  feedbackUpdate,
  feedbackDelete,
  feedbackReply,
  markAsSave,
  savedFeedbacks,
} from "@/api/hooks/feedbacks/feedback.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { allkeys } from "./allKeys";

export const useFeedbackCreate = () => {
  return useMutation({
    mutationKey: [allkeys.FEEDBACK_CREATE],
    mutationFn: feedbackCreate,
  });
};

export const useFeedbackList = (
  page: number,
  limit: number,
  projectId: string,
  saved?: boolean,
) => {
  return useQuery({
    queryKey: [allkeys.FEEDBACK_LIST, projectId, page, limit, saved],
    queryFn: () => feedbackList({ page, limit, projectId, saved }),
    enabled: !!projectId,
  });
};

export const useFeedbackUpdate = () => {
  return useMutation({
    mutationKey: [allkeys.FEEDBACK_UPDATE],
    mutationFn: ({
      feedbackId,
      payload,
    }: {
      feedbackId: string;
      payload: { feedback: string };
    }) => feedbackUpdate(feedbackId, payload),
  });
};

export const useFeedbackDelete = () => {
  return useMutation({
    mutationKey: [allkeys.FEEDBACK_DELETE],
    mutationFn: feedbackDelete,
  });
};

export const useReplyonFeedback = () => {
  return useMutation({
    mutationKey: [allkeys.FEEDBACK_REPLY],
    mutationFn: ({
      feedbackId,
      payload,
    }: {
      feedbackId: string;
      payload: { comment: string };
    }) => feedbackReply(feedbackId, payload),
  });
};

export const useMarkAsSave = () => {
  return useMutation({
    mutationKey: [allkeys.FEEDBACK_MARK_AS_SAVE],
    mutationFn: (feedbackId: string) => markAsSave(feedbackId),
  });
};

export const useAllSavedFeedbacks = () => {
  return useQuery({
    queryKey: [allkeys.ALL_SAVED_FEEDBACKS],
    queryFn: savedFeedbacks,
    select: (data) => data?.data,
  });
};
