import { BaseApiResponse } from "@/api/common/interface";

export interface ProjectListResponse extends BaseApiResponse {
  data: {
    projects: ProjectDetails[];
    page: number;
    total: number;
    limit: number;
    totalPages: number;  
  };
}

export interface ProjectDetailsResponse extends BaseApiResponse {
  data: ProjectDetails;
}

export interface ProjectDetails {
  _id: string;
  slug: string;
  projectName: string;
  description: string;
  feedbackCount: number;
  image: string;
  categories: {
    _id: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
  websiteLink: string;
  userName: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
  }
}
