import { BaseApiResponse } from "@/api/common/interface";

export interface FeedbackDetailsResponse extends BaseApiResponse {
  data: FeedbackData;
}

export interface FeedbackData {
  _id: string;
  projectId: string;
  feedback: string;
  userName?: string;
  guestEmail?: string;

  reply?: {
    comment: string;
    createdAt: string;
  };

  isSaved: boolean;

  createdAt: string;
  updatedAt: string;
}

export type FeedbackListResponse = BaseApiResponse & {
  data: FeedbackData[];
};
