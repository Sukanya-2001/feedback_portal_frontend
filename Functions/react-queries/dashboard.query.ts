import { useQuery } from "@tanstack/react-query";
import { allkeys } from "./allKeys";
import {
  dashboardCount,
  dashboardFeedbacks,
  dashboardGraph,
} from "@/api/hooks/dashboard/dashboard.api";

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

export const useFeedbacksData = () => {
  return useQuery({
    queryKey: [allkeys.DASHBOARD_FEEDBACKS],
    queryFn: dashboardFeedbacks,
  });
};
