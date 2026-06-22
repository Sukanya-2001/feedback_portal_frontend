import axiosInstance from "@/api/axiosInstance/axiosInstance";
import { endpoints } from "@/api/endpoints";
import {
  CountResponse,
  FeedsResponse,
  GraphResponse,
  growthGraph,
  ProjectByCatRes,
  Range,
} from "./dashboard.interface";

export const dashboardCount = async () => {
  const countData = await axiosInstance.get<CountResponse>(
    endpoints.dashboard.count,
  );
  return countData.data.data;
};

export const dashboardGraph = async () => {
  const graphData = await axiosInstance.get<GraphResponse>(
    endpoints.dashboard.graph,
  );
  return graphData.data;
};

export const projectCategoryGraph = async () => {
  const graphData = await axiosInstance.get<ProjectByCatRes>(
    endpoints.dashboard.projectByCategory,
  );
  return graphData.data.data;
};

export const feedbackGraph = async (range: Range) => {
  const graphData = await axiosInstance.get<growthGraph>(
    endpoints.dashboard.feedbackGrowth,
    {
      params: { range },
    },
  );
  return graphData.data.data;
};

export const projectGraph = async (range: Range) => {
  const graphData = await axiosInstance.get<growthGraph>(
    endpoints.dashboard.projectGrowth,
    {
      params: { range },
    },
  );
  return graphData.data.data;
};

export const dashboardFeedbacks = async () => {
  const feedbacks = await axiosInstance.get<FeedsResponse>(
    endpoints.dashboard.recentFeedback,
  );
  return feedbacks.data;
};
