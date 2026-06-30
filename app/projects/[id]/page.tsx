"use client";

import { use } from "react";
import Link from "next/link";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useProjectDetails } from "@/Functions/react-queries/projects.query";
import { useFeedbackList } from "@/Functions/react-queries/feedbacks.query";
import ProjectDetailsSkeleton from "@/components/Skeleton/ProjectDetailsSkeleton";
import { formatDateTime } from "@/util/common";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  const {
    data: project,
    isLoading: projectLoading,
    isError,
  } = useProjectDetails(projectId);
  const { data: feedbacks, isLoading } = useFeedbackList(1, 10, projectId);

  if (isError && !project) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          Project Not Found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          The project you are looking for does not exist or has been deleted.
        </Typography>
        <Button component={Link} href="/projects" variant="contained">
          Back to Browse Projects
        </Button>
      </Container>
    );
  }

  if (projectLoading) {
    return <Container sx={{ py: 10, textAlign: "center" }}>Loading</Container>;
  }

  // Cover image gradient fallback
  const projectName = project?.projectName ?? "";

  const textSeed = projectName.charCodeAt(0) + (projectName.charCodeAt(1) || 0);
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
    "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(135deg, #13547a 0%, #80d0c7 100%)",
    "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
  ];
  const selectGradient = gradients[textSeed % gradients.length];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Back Button */}
      <Button
        component={Link}
        href="/projects"
        variant="text"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 4, fontWeight: 700 }}
      >
        Back to All Projects
      </Button>

      {/* Main Grid */}
      <Grid container spacing={4}>
        {/* Project info card (Left Column) */}
        {projectLoading ? (
          <ProjectDetailsSkeleton />
        ) : (
          <Grid size={{ xs: 12, md: 7 }}>
            {/* Cover Image Banner */}
            {project?.image ? (
              <Box
                component="img"
                src={project.image}
                alt={project.projectName}
                sx={{
                  width: "100%",
                  height: { xs: 220, sm: 300 },
                  objectFit: "cover",
                  borderRadius: 4,
                  mb: 3.5,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  border: "1px solid #e2e8f0",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 220, sm: 300 },
                  background: selectGradient,
                  borderRadius: 4,
                  mb: 3.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3.5rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                {project?.projectName.charAt(0).toUpperCase()}
              </Box>
            )}

            {/* Project Header details */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 800, lineHeight: 1.2 }}
            >
              {project?.projectName}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {project?.categories.map((tag) => (
                <Chip
                  key={tag?._id}
                  label={tag?.name}
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              ))}
            </Box>

            <Box
              sx={{
                width: "100%",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                overflow: "hidden",

                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                },

                "& *": {
                  maxWidth: "100%",
                },
              }}
              dangerouslySetInnerHTML={{
                __html: project?.description ?? "",
              }}
            />

            <Divider sx={{ my: 4 }} />

            {/* Metadata Grid */}
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 4 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                Project Information & Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <AccountCircleIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Registered by: <strong>{project?.userName}</strong>
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CalendarTodayIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Added on: {formatDateTime(project?.createdAt ?? '')}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <LanguageIcon color="primary" />
                  <Link
                    href={project?.websiteLink || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#4f46e5",
                      fontWeight: 600,
                    }}
                  >
                    Visit Website / Repository
                  </Link>
                </Box>
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Feedback sidebar (Right Column) */}
        <Grid size={{ xs: 12, md: 5 }}>
          {/* Feedbacks count summary */}
          <Paper
            variant="outlined"
            sx={{
              p: 2.5,
              mb: 4,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700 }}
              color="text.secondary"
            >
              Total Feedbacks & Comments
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mt: 1, color: "primary.main" }}
            >
              {feedbacks?.total ?? 0}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Submitted by guest users and clients
            </Typography>
          </Paper>

          {/* Feedback Form */}
          <FeedbackForm projectId={project?._id || ""} />
        </Grid>
      </Grid>
      {/* List of existing feedbacks */}
      <FeedbackList feedbacks={feedbacks} isLoading={isLoading} />
    </Container>
  );
}
