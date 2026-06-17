import { Box, Tooltip, IconButton } from "@mui/material";
import ProjectCard from "./ProjectCard";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Web as WebIcon,
  Edit as EditIcon,
  DeleteOutlineOutlined as DeleteOutlineIcon,
  Share as ShareIcon,
  LibraryAdd as LibraryAddIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { ProjectDetails } from "@/api/hooks/projects/projects.interface";
import { ProjectAddEditModal } from "./ProjectAddEditModal";
import { toast } from "sonner";
import CommonModal from "./Common/CommonModal";
import { useProjectDelete } from "@/Functions/react-queries/projects.query";
import { allkeys } from "@/Functions/react-queries/allKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";

export const ProjectList = ({
  projects,
  myProject,
}: {
  projects: ProjectDetails;
  myProject?: Boolean;
}) => {
  const queryClient = useQueryClient();
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const { mutateAsync, isPending } = useProjectDelete();
  const handleDelete = () => {
    mutateAsync(projects._id, {
      onSuccess: (res) => {
        if (res.status === 200) {
          toast.success(`${projects.projectName} project deleted successfully`);
          queryClient.refetchQueries({ queryKey: [allkeys.PROJECT_LIST] });
          handleDeleteModal();
        }
      },
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/projects/${projects._id}`;
    navigator.clipboard.writeText(url);
    toast.success("Project feedback link copied to clipboard!");
  };

  const handleCloseModal = () => {
    setAddEditModalOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Management Toolbar overlays at top left */}
      {myProject && (
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 2,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(4px)",
            borderRadius: 2,
            p: 0.5,
            display: "flex",
            gap: 0.5,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
          }}
        >
          <Tooltip title="Edit project">
            <IconButton
              size="small"
              onClick={() => setAddEditModalOpen(true)}
              color="primary"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete project">
            <IconButton
              size="small"
              onClick={() => setDeleteModalOpen(true)}
              color="error"
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share project feedback link">
            <IconButton size="small" onClick={handleShare}>
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <ProjectCard
        project={projects}
        // feedbacks={feedbacksList}
        isOwner={false}
      />
      <ProjectAddEditModal
        addEditModal={addEditModalOpen}
        handleCloseModal={handleCloseModal}
        projects={projects}
      />
      <CommonModal
        open={deleteModalOpen}
        onCancel={handleDeleteModal}
        title="Delete Project"
        description={`Are you sure you want to delete ${projects.projectName} project? This will permanently erase all feedbacks received.`}
        onAction={handleDelete}
        actionButtonText="Yes, Delete"
      />
    </Box>
  );
};
