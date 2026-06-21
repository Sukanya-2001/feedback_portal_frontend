import axiosInstance from "@/api/axiosInstance/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { CountResponse, FeedsResponse, GraphResponse } from "./dashboard.interface";

export const dashboardCount = async () => {
  const countData = await axiosInstance.get<CountResponse>(endpoints.dashboard.count);
  return countData.data.data;
};

export const dashboardGraph = async () => {
  const graphData = await axiosInstance.get<GraphResponse>(endpoints.dashboard.graph);
  return graphData.data;
};

export const dashboardFeedbacks = async () => {
  const feedbacks = await axiosInstance.get<FeedsResponse>(endpoints.dashboard.recentFeedback);
  return feedbacks.data;
};
