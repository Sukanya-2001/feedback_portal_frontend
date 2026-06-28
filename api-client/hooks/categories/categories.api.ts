import axiosInstance from "@/api/axiosInstance/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { CategoryListResponse } from "./categories.interface";

export const categoryList = async () => {
  const res = await axiosInstance.get<CategoryListResponse>(
    endpoints.categories.list,
  );
  return res.data;
};
