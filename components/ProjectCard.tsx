"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import {
  OpenInNew as OpenInNewIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { ProjectDetails } from "@/api/hooks/projects/projects.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import { toast } from "sonner";
import CommonModal from "./Common/CommonModal";
import { formatDateTime } from "@/util/common";

interface ProjectCardProps {
  project: ProjectDetails;
  myProject?: boolean;
}

export default function ProjectCard({ project, myProject }: ProjectCardProps) {
  const { userData } = useSelector((s: RootState) => s.user);
  const [readMoreModal, setReadMoreModal] = useState<boolean>(false);

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
    const url = `${window.location.origin}/projects/${project.slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Project feedback link copied to clipboard!");
  };

  const handleReadMore = () => {
    setReadMoreModal(!readMoreModal);
  };

  const plainText =
    typeof window !== "undefined"
      ? new DOMParser().parseFromString(project?.description || "", "text/html")
          .body.textContent || ""
      : "";

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
          image={project.image}
          alt={project.projectName}
          sx={{
            height: 220,
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
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
          variant="body1"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 700, lineHeight: 1.3 }}
        >
          {project?.projectName}
        </Typography>

        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {plainText.length > 140
              ? `${plainText.slice(0, 140)}...`
              : plainText}

            {plainText.length > 140 && (
              <Typography
                component="span"
                color="primary"
                sx={{
                  cursor: "pointer",
                  fontWeight: 500,
                  ml: 0.5,
                }}
                onClick={handleReadMore}
              >
                Read more
              </Typography>
            )}
          </Typography>
        </Box>

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
            <strong>
              {project?.feedbackCount}{" "}
              {project?.feedbackCount > 1 ? "feedbacks" : "feedback"}
            </strong>
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Added on: <strong>{formatDateTime(project?.createdAt)}</strong>
        </Typography>
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
      <CommonModal
        open={readMoreModal}
        description={project?.description}
        title={project?.projectName}
        onCancel={handleReadMore}
        noCancelBtn
        htmlText
      />
    </Card>
  );
}
