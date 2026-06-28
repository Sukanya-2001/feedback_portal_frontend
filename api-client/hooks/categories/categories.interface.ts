import { BaseApiResponse } from "@/api/common/interface";

export interface CategoryListResponse extends BaseApiResponse {
  data: {
    _id: string;
    name: string;
  }[];
}
