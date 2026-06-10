import axiosInstance from "@/api/axiosInstance/axiosInstance";
import { BaseApiResponse } from "@/api/common/interface";
import { endpoints } from "@/api/endpoints";
import {
  ProjectListResponse,
  ProjectDetailsResponse,
} from "./projects.interface";

export const projectList = async () => {
  const response = await axiosInstance.get<ProjectListResponse>(
    endpoints.projects.List,
  );
  return response.data;
};

export const projectDetails = async (project_id: string) => {
  const response = await axiosInstance.get<ProjectDetailsResponse>(
    `${endpoints.projects.details}/${project_id}`,
  );
  return response.data;
};

export const projectCreate = async (payload: {
  name: string;
  description: string;
  image: string;
  category: string[];
  website_link: string;
  userId: string;
}) => {
  const response = await axiosInstance.post<ProjectDetailsResponse>(
    endpoints.projects.create,
    payload,
  );
  return response.data;
};

export const projectUpdate = async (
  project_id: string,
  payload: { name?: string; description?: string },
) => {
  const response = await axiosInstance.put<ProjectDetailsResponse>(
    `${endpoints.projects.update}/${project_id}`,
    payload,
  );
  return response.data;
};

export const projectDelete = async (project_id: string) => {
  const response = await axiosInstance.delete<BaseApiResponse>(
    `${endpoints.projects.delete}/${project_id}`,
  );
  return response.data;
};
