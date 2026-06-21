"use client";

import React, { use } from "react";
import Link from "next/link";
import { Typography, Box, Paper, Button, Breadcrumbs } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import { useProjectDetails } from "@/Functions/react-queries/projects.query";
import { MiniDetails } from "@/components/MiniDetails";
import { FeedbackDetails } from "@/components/FeedbackDetails";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default function ProjectFeedbacksPage({ params }: PageProps) {
  const { projectId } = use(params);
  const { isLoggedIn, userData } = useSelector((s: RootState) => s.user);

  const {
    data: project,
    isError,
  } = useProjectDetails(projectId);

  if (!isLoggedIn || !userData) return null;

  if (isError && !project) {
    return (
      <Box sx={{ width: "100%", py: 4 }}>
        <Button
          component={Link}
          href="/dashboard/feedbacks"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Back to Hub
        </Button>
        <Paper
          variant="outlined"
          sx={{ p: 4, text: "center", borderRadius: 3 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            Project Not Found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The project you are looking for does not exist or has been deleted.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Link
          href="/dashboard/feedbacks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            Feedbacks Hub
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ fontWeight: 600 }}
        >
          {project?.projectName}
        </Typography>
      </Breadcrumbs>

      <MiniDetails project={project} />

      <FeedbackDetails projectId={projectId} />
    </Box>
  );
}
