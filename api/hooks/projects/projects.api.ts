import axiosInstance from "@/api/axiosInstance/axiosInstance";
import { BaseApiResponse } from "@/api/common/interface";
import { endpoints } from "@/api/endpoints";
import {
  ProjectDetailsResponse,
  ProjectListResponse,
} from "./projects.interface";

export const projectList = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const response = await axiosInstance.get<ProjectListResponse>(
    `${endpoints.projects.List}?page=${page}&limit=${limit}`,
  );
  const data = response.data.data;
  return data;
};

export const allProjectList = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const response = await axiosInstance.get<ProjectListResponse>(
    `${endpoints.projects.allProjectList}?page=${page}&limit=${limit}`,
  );
  const data = response.data.data;
  return data;
};

export const projectDetails = async (project_id: string) => {
  const response = await axiosInstance.get<ProjectDetailsResponse>(
    `${endpoints.projects.details}/${project_id}`,
  );
  return response.data.data;
};

export const projectCreate = async (payload: FormData) => {
  const response = await axiosInstance.post(endpoints.projects.create, payload);
  return response.data;
};

export const projectUpdate = async (project_id: string, payload: FormData) => {
  const response = await axiosInstance.patch(
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
