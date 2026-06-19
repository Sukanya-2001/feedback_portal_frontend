import {
  feedbackCreate,
  feedbackList,
  feedbackUpdate,
  feedbackDelete,
  feedbackReply,
  markAsSave,
} from "@/api/hooks/feedbacks/feedback.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
) => {
  return useQuery({
    queryKey: [allkeys.FEEDBACK_LIST, projectId, page, limit],
    queryFn: () => feedbackList({ page, limit, projectId }),
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [allkeys.FEEDBACK_MARK_AS_SAVE],
    mutationFn: (feedbackId: string) => markAsSave(feedbackId),
  });
};
