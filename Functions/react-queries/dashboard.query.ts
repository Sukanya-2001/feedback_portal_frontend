import { useQuery } from "@tanstack/react-query";
import { allkeys } from "./allKeys";
import {
  dashboardCount,
  dashboardFeedbacks,
  dashboardGraph,
  feedbackGraph,
  projectCategoryGraph,
  projectGraph,
} from "@/api/hooks/dashboard/dashboard.api";
import { Range } from "@/api/hooks/dashboard/dashboard.interface";

export const useCountData = () => {
  return useQuery({
    queryKey: [allkeys.DASHBOARD_COUNT],
    queryFn: dashboardCount,
  });
};

export const useGraphData = () => {
  return useQuery({
    queryKey: [allkeys.DASHBOARD_GRAPH],
    queryFn: dashboardGraph,
  });
};

export const useProjectByCategoryData = () => {
  return useQuery({
    queryKey: [allkeys.PROJECT_BY_CATEGORY_GRAPH],
    queryFn: projectCategoryGraph,
  });
};

export const useFeedbackGraphData = (range: Range) => {
  return useQuery({
    queryKey: [allkeys.FEEDBACKS_GRAPH, range],
    queryFn: () => feedbackGraph(range),
  });
};

export const useProjectGraphData = (range: Range) => {
  return useQuery({
    queryKey: [allkeys.PROJECTS_GRAPH, range],
    queryFn: () => projectGraph(range),
  });
};

export const useFeedbacksData = () => {
  return useQuery({
    queryKey: [allkeys.DASHBOARD_FEEDBACKS],
    queryFn: dashboardFeedbacks,
  });
};
