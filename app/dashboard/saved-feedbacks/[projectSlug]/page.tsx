"use client";

import { use } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Divider,
  Pagination,
  Button,
  Chip,
  Stack,
  InputAdornment,
  Breadcrumbs,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";
import RateReviewIcon from "@mui/icons-material/RateReview";
import WebIcon from "@mui/icons-material/Web";
import { useFeedbackList } from "@/Functions/react-queries/feedbacks.query";
import { FeedbackDetails } from "@/components/FeedbackDetails";
import { useProjectDetails } from "@/Functions/react-queries/projects.query";

interface PageProps {
  params: Promise<{
    projectSlug: string;
  }>;
}

export default function ProjectFeedbacksPage({ params }: PageProps) {
  const { projectSlug } = use(params);
  const {
    data: project,
    isLoading: projectLoading,
    isError,
  } = useProjectDetails(projectSlug);

  if (isError && !project) {
    return (
      <Box sx={{ width: "100%", py: 4 }}>
        <Button
          component={Link}
          href="/dashboard/saved-feedbacks"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Back to Others
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
          href="/dashboard/saved-feedbacks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            Saved Feedback
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

      {/* Title Header with Back button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 4,
        }}
      >
        <Stack direction="row" spacing={2}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
              {project?.projectName} Feedbacks
            </Typography>

            <Typography variant="body2" color="text.secondary">
              All bookmarked feedbacks for this project
            </Typography>
          </Box>

          <Chip
            label="Saved Feedbacks"
            color="secondary"
            sx={{
              ml: "auto",
              fontWeight: 700,
            }}
          />
        </Stack>
        <Button
          component={Link}
          href="/dashboard/saved-feedbacks"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{ borderRadius: 2 }}
        >
          Back to Others
        </Button>
      </Box>

      <FeedbackDetails projectId={projectSlug} saved />
    </Box>
  );
}
