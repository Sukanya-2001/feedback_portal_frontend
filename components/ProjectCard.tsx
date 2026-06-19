"use client";

import React from "react";
import Link from "next/link";
import { Project, Feedback, useMockDatabase } from "./MockDatabase";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  DeleteOutlineOutlined as DeleteOutlineIcon,
  OpenInNew as OpenInNewIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { ProjectDetails } from "@/api/hooks/projects/projects.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import { getImage } from "@/api/endpoints";
import { toast } from "sonner";

interface ProjectCardProps {
  project: ProjectDetails;
  feedbacks?: Feedback[];
  isOwner?: boolean;
  myProject?: boolean;
}

export default function ProjectCard({
  project,
  feedbacks,
  isOwner = false,
  myProject,
}: ProjectCardProps) {
  const { userData } = useSelector((s: RootState) => s.user);

  // Premium CSS gradients to fall back to if image fails or is missing
  const textSeed =
    project.projectName.charCodeAt(0) +
    (project.projectName.charCodeAt(1) || 0);
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
    "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(135deg, #13547a 0%, #80d0c7 100%)",
    "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
  ];
  const selectGradient = gradients[textSeed % gradients.length];

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/projects/${project._id}`;
    navigator.clipboard.writeText(url);
    toast.success("Project feedback link copied to clipboard!");
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Project Banner Image or dynamic CSS fallback */}
      {project.image ? (
        <CardMedia
          component="img"
          height="160"
          image={getImage(project.image)}
          alt={project.projectName}
          sx={{
            objectFit: "cover",
            backgroundColor: "#f1f5f9",
          }}
          onError={(e) => {
            // If the image fails to load, replace with gradient
            (e.target as HTMLElement).style.display = "none";
            const parent = (e.target as HTMLElement).parentElement;
            if (parent) {
              const fallback = document.createElement("div");
              fallback.style.height = "160px";
              fallback.style.background = selectGradient;
              fallback.style.display = "flex";
              fallback.style.alignItems = "center";
              fallback.style.justifyContent = "center";
              fallback.style.color = "white";
              fallback.style.fontWeight = "bold";
              fallback.style.fontSize = "2.5rem";
              fallback.innerText = project.projectName.charAt(0).toUpperCase();
              parent.insertBefore(fallback, parent.firstChild);
            }
          }}
        />
      ) : (
        <Box
          sx={{
            height: 160,
            background: selectGradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "2.5rem",
          }}
        >
          {project.projectName.charAt(0).toUpperCase()}
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1, pt: 2, pb: 1 }}>
        {/* Tags */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
          {project.categories.map((tag) => (
            <Chip
              key={tag?._id}
              label={tag?.name}
              size="small"
              color="primary"
              variant="outlined"
              sx={{
                fontSize: "0.72rem",
                fontWeight: 600,
                opacity: 0.85,
              }}
            />
          ))}
        </Box>

        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 700, lineHeight: 1.3 }}
        >
          {project.projectName}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            height: 60,
            mb: 2,
          }}
        >
          {project.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          {!myProject && (
            <Typography variant="caption" color="text.secondary">
              By: <strong>{project?.userName}</strong>
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            {project?.feedbackCount}{" "}
            {project?.feedbackCount > 1 ? "feedbacks" : "feedback"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          px: 2,
          pb: 2,
          pt: 0,
          flexDirection: "column",
          alignItems: "stretch",
          gap: 1.5,
        }}
      >
        {/* First row */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleShare}
            endIcon={<ShareIcon fontSize="small" />}
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              flex: 1,
            }}
          >
            Copy Link
          </Button>

          {(!userData || project.userId?._id !== userData?._id) && (
            <Button
              component={Link}
              href={`/projects/${project.slug}`}
              variant="outlined"
              color="primary"
              size="small"
              endIcon={<OpenInNewIcon fontSize="small" />}
              sx={{
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Give Feedback
            </Button>
          )}
        </Box>

        {/* Second row */}
        <Button
          component="a"
          href={project.websiteLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="primary"
          size="small"
          endIcon={<OpenInNewIcon fontSize="small" />}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            flex: 1,
          }}
        >
          View Website
        </Button>
      </CardActions>
    </Card>
  );
}
