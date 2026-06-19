import { BaseApiResponse } from "@/api/common/interface";

export interface FeedbackDetailsResponse extends BaseApiResponse {
  data: FeedbackData;
}

export interface FeedbackData {
  _id: string;
  projectId: string;
  feedback: string;
  guestName?: string;
  guestEmail?: string;

  reply?: {
    comment: string;
    created_at: string;
  };

  isSaved: boolean;

  createdAt: string;
  updatedAt: string;
}

export type FeedbackListResponse = BaseApiResponse & {
  data: {
    feedbacks: FeedbackData[];
    page: number;
    total: number;
    limit: number;
    totalPages: number;
  };
};
