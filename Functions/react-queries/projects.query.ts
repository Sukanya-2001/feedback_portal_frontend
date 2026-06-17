import {
  projectList,
  projectDetails,
  projectCreate,
  projectDelete,
  projectUpdate,
  allProjectList,
} from "@/api/hooks/projects/projects.api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { allkeys } from "./allKeys";

export const useProjectList = (page: number, limit: number) => {
  return useQuery({
    queryKey: [allkeys.PROJECT_LIST],
    queryFn: () => projectList({ page, limit }),
  });
};

export const useAllProjectList = (page: number, limit: number) => {
  return useQuery({
    queryKey: [allkeys.ALL_PROJECT_LIST],
    queryFn: () => allProjectList({ page, limit }),
  });
};

export const useProjectDetails = (projectId: string) => {
  return useQuery({
    queryKey: [allkeys.PROJECT_DETAILS, projectId],
    queryFn: () => projectDetails(projectId),
    enabled: !!projectId,
  });
};

export const useProjectCreate = () => {
  return useMutation({
    mutationKey: [allkeys.PROJECT_CREATE],
    mutationFn: projectCreate,
  });
};

export const useProjectUpdate = () => {
  return useMutation({
    mutationKey: [allkeys.PROJECT_UPDATE],

    mutationFn: ({
      projectId,
      payload,
    }: {
      projectId: string;
      payload: FormData;
    }) => projectUpdate(projectId, payload),
  });
};

export const useProjectDelete = () => {
  return useMutation({
    mutationKey: [allkeys.PROJECT_DELETE],
    mutationFn: projectDelete,
  });
};
