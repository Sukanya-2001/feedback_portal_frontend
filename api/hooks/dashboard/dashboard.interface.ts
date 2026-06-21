import { BaseApiResponse } from "@/api/common/interface";

export interface CountResponse extends BaseApiResponse {
  data: {
    totalProjects: number;
    totalFeedbacks: number;
  };
}

export interface GraphResponse extends BaseApiResponse {
  data: {
    _id: string;
    projectName: string;
    feedbackCount: number;
  }[];
}

export interface FeedsResponse extends BaseApiResponse {
  data: {
    _id: string;
    guestName: string;
    guestEmail: string;
    feedback: string;
    isSaved: boolean;
    projectName: string;
    createdAt: string;
  }[];
}
