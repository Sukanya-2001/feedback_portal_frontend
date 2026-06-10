import {
  projectList,
  projectDetails,
  projectCreate,
  projectDelete,
  projectUpdate,
} from "@/api/hooks/projects/projects.api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { allkeys } from "./allKeys";

export const useProjectList = () => {
  return useQuery({
    queryKey: [allkeys.PROJECT_LIST],
    queryFn: projectList,
  });
};

export const useProjectDetails = (projectId: string) => {
  return useQuery({
    queryKey: [allkeys.PROJECT_DETAILS, projectId],
    queryFn: () => projectDetails(projectId),
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
      payload: {
        name?: string;
        description?: string;
      };
    }) => projectUpdate(projectId, payload),
  });
};

export const useProjectDelete = () => {
  return useMutation({
    mutationKey: [allkeys.PROJECT_DELETE],
    mutationFn: projectDelete,
  });
};
