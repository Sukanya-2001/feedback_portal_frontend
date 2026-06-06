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

interface ProjectCardProps {
  project: Project;
  feedbacks: Feedback[];
  isOwner?: boolean;
}

export default function ProjectCard({ project, feedbacks, isOwner = false }: ProjectCardProps) {
  const { deleteProject } = useMockDatabase();

  // Calculate project feedbacks
  const projectFeedbacks = feedbacks.filter((f) => f.projectId === project.id);
  const totalFeedbacks = projectFeedbacks.length;

  // Premium CSS gradients to fall back to if image fails or is missing
  const textSeed = project.name.charCodeAt(0) + (project.name.charCodeAt(1) || 0);
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
    "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(135deg, #13547a 0%, #80d0c7 100%)",
    "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
  ];
  const selectGradient = gradients[textSeed % gradients.length];

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm(`Are you sure you want to delete "${project.name}"? This will also remove all its feedbacks.`)) {
      deleteProject(project.id);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/projects/${project.id}`;
    navigator.clipboard.writeText(url);
    alert("Project feedback link copied to clipboard!");
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
      {project.image && project.image.startsWith("http") ? (
        <CardMedia
          component="img"
          height="160"
          image={project.image}
          alt={project.name}
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
              fallback.innerText = project.name.charAt(0).toUpperCase();
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
          {project.name.charAt(0).toUpperCase()}
        </Box>
      )}



      <CardContent sx={{ flexGrow: 1, pt: 2, pb: 1 }}>
        {/* Tags */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                fontSize: "0.72rem",
                fontWeight: 600,
                bgcolor: "primary.light",
                color: "primary.dark",
                opacity: 0.85,
              }}
            />
          ))}
        </Box>

        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          {project.name}
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

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            By: <strong>{project.userName}</strong>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {totalFeedbacks} feedback{totalFeedbacks !== 1 && "s"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title="Copy project feedback link">
            <IconButton size="small" onClick={handleShare}>
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {isOwner && (
            <Tooltip title="Delete Project">
              <IconButton size="small" onClick={handleDelete} color="error">
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Button
          component={Link}
          href={`/projects/${project.id}`}
          variant="outlined"
          color="primary"
          size="small"
          endIcon={<OpenInNewIcon fontSize="small" />}
          sx={{ fontWeight: 600, borderRadius: 2 }}
        >
          Give Feedback
        </Button>
      </CardActions>
    </Card>
  );
}
