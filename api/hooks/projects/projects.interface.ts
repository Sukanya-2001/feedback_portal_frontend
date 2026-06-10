import { BaseApiResponse } from "@/api/common/interface";

export interface ProjectListResponse extends BaseApiResponse {
  data: ProjectDetails[];
}

export interface ProjectDetailsResponse extends BaseApiResponse {
  data: ProjectDetails;
}

export interface ProjectDetails {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: {
    _id: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
  website_link: string;
  userId: string;
}
