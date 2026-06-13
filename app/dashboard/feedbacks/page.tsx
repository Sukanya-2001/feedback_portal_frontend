"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
  Button,
  Chip,
  IconButton,
  TextField,
  Collapse,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ForumIcon from "@mui/icons-material/Forum";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import { Project, Feedback, INITIAL_PROJECTS, INITIAL_FEEDBACKS } from "@/components/MockDatabase";

export default function FeedbacksPage() {
  const { isLoggedIn, userData } = useSelector((s: RootState) => s.user);

  // Local state for projects and feedbacks
  const [projectsList, setProjectsList] = useState<Project[]>(INITIAL_PROJECTS);
  const [feedbacksList, setFeedbacksList] = useState<Feedback[]>(INITIAL_FEEDBACKS);

  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Reply state
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyError, setReplyError] = useState("");

  if (!isLoggedIn || !userData) return null;

  // Filter owned projects. If user has no projects matching, show user-1 by default
  const userProjects = projectsList.filter(
    (p) => p.userId === "user-1" || p.userName.toLowerCase() === userData.fullname?.toLowerCase()
  );
  const userProjectIds = userProjects.map((p) => p.id);

  // Filter feedbacks belonging to owned projects
  const userFeedbacks = feedbacksList.filter((f) =>
    userProjectIds.includes(f.projectId)
  );

  // Filter feedbacks by project dropdown selection
  const filteredProjectIdFeedbacks = selectedProjectId === "all"
    ? userFeedbacks
    : userFeedbacks.filter((f) => f.projectId === selectedProjectId);

  // Sort feedbacks
  const filteredFeedbacks = [...filteredProjectIdFeedbacks].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  const handleOpenReplyForm = (feedbackId: string) => {
    setReplyError("");
    setReplyText("");
    setActiveReplyId(feedbackId);
  };

  const handleCloseReplyForm = () => {
    setActiveReplyId(null);
  };

  const handleSubmitReply = (feedbackId: string) => {
    if (!replyText.trim()) {
      setReplyError("Reply text cannot be empty.");
      return;
    }
    setFeedbacksList((prev) =>
      prev.map((f) =>
        f.id === feedbackId
          ? {
              ...f,
              reply: {
                comment: replyText,
                createdAt: new Date().toISOString(),
              },
            }
          : f
      )
    );
    setActiveReplyId(null);
    setReplyText("");
  };

  const toggleSaveFeedback = (feedbackId: string) => {
    setFeedbacksList((prev) =>
      prev.map((f) =>
        f.id === feedbackId ? { ...f, isSaved: !f.isSaved } : f
      )
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Title Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <ForumIcon color="primary" sx={{ fontSize: 36 }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Feedbacks Hub
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage, filter, and reply to reviews left on all your active
            products.
          </Typography>
        </Box>
      </Box>

      {/* Filters Toolbar */}
      <Paper variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
          <FilterListIcon fontSize="small" color="action" />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Filter & Sort Feedbacks
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="project-filter-label">Project</InputLabel>
              <Select
                labelId="project-filter-label"
                id="project-filter"
                value={selectedProjectId}
                label="Project"
                onChange={(e) => setSelectedProjectId(e.target.value)}
              >
                <MenuItem value="all">All Projects</MenuItem>
                {userProjects.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="sort-filter-label">Sort By</InputLabel>
              <Select
                labelId="sort-filter-label"
                id="sort-filter"
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Feedbacks Listing */}
      {filteredFeedbacks.length === 0 ? (
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
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            No feedbacks found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try resetting your filters or share your project link to solicit customer feedback.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {filteredFeedbacks.map((f) => {
            const hasReply = !!f.reply;

            return (
              <Paper key={f.id} variant="outlined" sx={{ p: 3, borderRadius: 3, position: "relative" }}>
                
                <Box sx={{ position: "absolute", top: 18, right: 18 }}>
                  <IconButton onClick={() => toggleSaveFeedback(f.id)} color={f.isSaved ? "warning" : "default"}>
                    {f.isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 1.5,
                    mb: 1.5,
                    pr: 5,
                  }}
                >
                  <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }} color="text.primary">
                      {f.userName}
                    </Typography>
                    {f.guestEmail && (
                      <Typography variant="caption" color="text.secondary">
                        ({f.guestEmail})
                      </Typography>
                    )}
                    <Chip
                      label={f.projectName}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(f.createdAt).toLocaleString()}
                  </Typography>
                </Box>

                <Typography variant="body1" color="text.primary" sx={{ mb: 2, whiteSpace: "pre-line" }}>
                  {f.comment}
                </Typography>

                {hasReply && (
                  <Box sx={{ mt: 3, pl: 3, borderLeft: "3px solid #0d9488" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <RateReviewIcon color="secondary" fontSize="small" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }} color="secondary.dark">
                        Developer Response
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: "auto" }}>
                        {new Date(f.reply!.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.primary" sx={{ whiteSpace: "pre-line" }}>
                      {f.reply!.comment}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ mt: 2, display: "flex", flexFlow: "column", gap: 2 }}>
                  {!hasReply && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {f.guestEmail ? (
                        activeReplyId !== f.id && (
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<ReplyIcon />}
                            onClick={() => handleOpenReplyForm(f.id)}
                            sx={{ borderRadius: 2 }}
                          >
                            Reply to Guest
                          </Button>
                        )
                      ) : (
                        <Typography variant="caption" color="text.disabled">
                          Cannot reply (guest did not provide email address)
                        </Typography>
                      )}
                    </Box>
                  )}

                  <Collapse in={activeReplyId === f.id}>
                    <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                        Replying by email to {f.guestEmail}:
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        multiline
                        rows={2}
                        placeholder="Write your official response..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        error={!!replyError}
                        helperText={replyError}
                        sx={{ mb: 2 }}
                      />
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                        <Button size="small" variant="text" onClick={handleCloseReplyForm}>
                          Cancel
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          endIcon={<ArrowCircleUpIcon />}
                          onClick={() => handleSubmitReply(f.id)}
                        >
                          Send Response
                        </Button>
                      </Box>
                    </Paper>
                  </Collapse>
                </Box>
              </Paper>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
