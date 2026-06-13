"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project, Feedback, INITIAL_PROJECTS, INITIAL_FEEDBACKS } from "@/components/MockDatabase";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import {
  Typography,
  Box,
  Paper,
  Divider,
  Button,
  Grid,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import WebIcon from "@mui/icons-material/Web";
import RateReviewIcon from "@mui/icons-material/RateReview";

export default function SavedFeedbacksPage() {
  const { isLoggedIn, userData } = useSelector((s: RootState) => s.user);

  // Local state for projects and feedbacks
  const [projectsList, setProjectsList] = useState<Project[]>(INITIAL_PROJECTS);
  const [feedbacksList, setFeedbacksList] = useState<Feedback[]>(INITIAL_FEEDBACKS);

  if (!isLoggedIn || !userData) return null;

  // Filter owned projects. If user has no projects matching, show user-1 by default
  const userProjects = projectsList.filter(
    (p) => p.userId === "user-1" || p.userName.toLowerCase() === userData.fullname?.toLowerCase()
  );
  const userProjectIds = userProjects.map((p) => p.id);

  // Get saved feedbacks belonging to owned projects
  const savedFeedbacks = feedbacksList.filter(
    (f) => userProjectIds.includes(f.projectId) && f.isSaved
  );

  const toggleSaveFeedback = (feedbackId: string) => {
    setFeedbacksList((prev) =>
      prev.map((f) => (f.id === feedbackId ? { ...f, isSaved: !f.isSaved } : f))
    );
  };

  // Group feedbacks by project
  const feedbacksByProject: { [projectId: string]: Feedback[] } = {};
  savedFeedbacks.forEach((f) => {
    if (!feedbacksByProject[f.projectId]) {
      feedbacksByProject[f.projectId] = [];
    }
    feedbacksByProject[f.projectId].push(f);
  });

  return (
    <Box sx={{ width: "100%" }}>
      {/* Title Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <BookmarkIcon color="primary" sx={{ fontSize: 36 }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Saved Feedbacks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Keep track of reviews, feature suggestions, or bugs you bookmarked for later.
          </Typography>
        </Box>
      </Box>

      {savedFeedbacks.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            py: 8,
            px: 2,
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "background.paper",
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: "divider",
          }}
        >
          <BookmarkBorderIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            No saved feedbacks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You can bookmark specific reviews on your feedbacks feed to keep them tracked here.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {userProjects
            .filter((p) => feedbacksByProject[p.id] && feedbacksByProject[p.id].length > 0)
            .map((project) => {
              const projectSavedList = feedbacksByProject[project.id];

              return (
                <Paper key={project.id} variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                  {/* Project Header */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
                    <WebIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {project.name}
                    </Typography>
                    <Chip
                      label={`${projectSavedList.length} bookmarked`}
                      size="small"
                      color="secondary"
                      sx={{ fontWeight: 600, fontSize: "0.75rem", ml: 1 }}
                    />
                  </Box>

                  <Divider sx={{ mb: 2.5 }} />

                  {/* List of saved feedbacks under this project */}
                  <Grid container spacing={2}>
                    {projectSavedList.map((f) => (
                      <Grid size={12} key={f.id}>
                        <Paper
                          variant="outlined"
                          sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 2, position: "relative" }}
                        >
                          <Box sx={{ position: "absolute", top: 12, right: 12 }}>
                            <Tooltip title="Remove bookmark">
                              <IconButton onClick={() => toggleSaveFeedback(f.id)} color="warning" size="small">
                                <BookmarkIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>

                          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mb: 1, pr: 4 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                              {f.userName}
                            </Typography>
                            {f.guestEmail && (
                              <Typography variant="caption" color="text.secondary">
                                ({f.guestEmail})
                              </Typography>
                            )}
                          </Box>



                          <Typography variant="body2" color="text.primary" sx={{ mb: 1.5, whiteSpace: "pre-line" }}>
                            {f.comment}
                          </Typography>

                          {/* Show developer response if any */}
                          {f.reply && (
                            <Box sx={{ mt: 1.5, pl: 2, borderLeft: "2px solid #0d9488" }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                                <RateReviewIcon color="secondary" sx={{ fontSize: 14 }} />
                                <Typography variant="caption" sx={{ fontWeight: 700 }} color="secondary.dark">
                                  Your reply:
                                </Typography>
                              </Box>
                              <Typography variant="caption" color="text.primary" sx={{ display: "block" }}>
                                {f.reply.comment}
                              </Typography>
                            </Box>
                          )}
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              );
            })}
        </Box>
      )}
    </Box>
  );
}
