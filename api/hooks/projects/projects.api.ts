import axiosInstance from "@/api/axiosInstance/axiosInstance";
import { BaseApiResponse } from "@/api/common/interface";
import { endpoints } from "@/api/endpoints";
import {
  ProjectDetails,
  ProjectDetailsResponse,
  ProjectListResponse,
} from "./projects.interface";

// const mapBackendToFrontend = (item: any): ProjectDetails => {
//   const categoriesList = [
//     { _id: "1", name: "Productivity" },
//     { _id: "2", name: "SaaS" },
//     { _id: "3", name: "Health" },
//     { _id: "4", name: "Education" },
//     { _id: "5", name: "Collab" },
//     { _id: "6", name: "Tech" },
//     { _id: "7", name: "Finance" },
//   ];

//   return {
//     _id: item._id,
//     name: item.projectName || item.name || "",
//     description: item.description || "",
//     image: item.image || "",
//     website_link: item.websiteLink || item.website_link || "",
//     category: Array.isArray(item.categories)
//       ? item.categories.map((catId: string) => {
//           const found = categoriesList.find((c) => c._id === catId);
//           return found || { _id: catId, name: catId };
//         })
//       : Array.isArray(item.category)
//         ? item.category
//         : [],
//     userId: item.userId || "",
//     createdAt: item.createdAt || "",
//     updatedAt: item.updatedAt || "",
//   };
// };

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
