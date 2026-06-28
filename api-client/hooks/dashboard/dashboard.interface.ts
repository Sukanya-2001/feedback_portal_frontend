import { BaseApiResponse } from "@/api/common/interface";

export interface CountResponse extends BaseApiResponse {
  data: {
    totalProjects: number;
    totalFeedbacks: number;
    savedFeedbacks: number;
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

export type Range = "monthly" | "yearly";

export interface ProjectByCatRes extends BaseApiResponse {
  data: {
    _id: string;
    name: string;
    projectCount: string;
  }[];
}

export interface growthGraph extends BaseApiResponse {
  data: {
    label: string;
    count: number;
  }[];
}
