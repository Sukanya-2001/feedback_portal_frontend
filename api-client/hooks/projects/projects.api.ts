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
  category,
  search,
}: {
  page: number;
  limit: number;
  category?: string;
  search?: string;
}) => {
  const queryParams: Record<string, string | number> = {
    page,
    limit,
  };

  if (category && category !== "all") {
    queryParams.category = category;
  }

  if (search?.trim()) {
    queryParams.search = search.trim();
  }

  const response = await axiosInstance.get<ProjectListResponse>(
    endpoints.projects.List,
    {
      params: queryParams,
    },
  );

  return response.data.data;
};

export const allProjectList = async ({
  page,
  limit,
  category,
  search,
  sortBy,
}: {
  page: number;
  limit: number;
  category?: string;
  search?: string;
  sortBy?: string;
}) => {
  const queryParams: Record<string, string | number> = {
    page,
    limit,
  };

  if (category && category !== "all") {
    queryParams.category = category;
  }

  if (search?.trim()) {
    queryParams.search = search.trim();
  }

  if (sortBy?.trim()) {
    queryParams.sortBy = sortBy.trim();
  }
  const response = await axiosInstance.get<ProjectListResponse>(
    endpoints.projects.allProjectList,
    {
      params: queryParams,
    },
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
