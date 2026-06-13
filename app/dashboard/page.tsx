"use client";

import React, { useState } from "react";
import { Project, Feedback, INITIAL_PROJECTS, INITIAL_FEEDBACKS } from "@/components/MockDatabase";
import Link from "next/link";
import {
  Typography,
  Grid,
  Button,
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WebIcon from "@mui/icons-material/Web";
import ForumIcon from "@mui/icons-material/Forum";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";

export default function DashboardPage() {
  const { isLoggedIn, userData } = useSelector((s: RootState) => s.user);

  // Local state for projects and feedbacks
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(INITIAL_FEEDBACKS);

  if (!isLoggedIn || !userData) return null;

  // Filter owned items. If user has no projects matching, we show user-1 projects by default so the dashboard displays mock statistics.
  const userProjects = projects.filter((p) => p.userId === "user-1" || p.userName.toLowerCase() === userData.fullname?.toLowerCase());
  const userProjectIds = userProjects.map((p) => p.id);
  const userFeedbacks = feedbacks.filter((f) =>
    userProjectIds.includes(f.projectId),
  );

  const toggleSaveFeedback = (feedbackId: string) => {
    setFeedbacks(prev =>
      prev.map(f => f.id === feedbackId ? { ...f, isSaved: !f.isSaved } : f)
    );
  };

  const totalProjects = userProjects.length;
  const totalFeedbacks = userFeedbacks.length;

  const chartData = userProjects.map(p => ({
    name: p.name,
    count: feedbacks.filter(f => f.projectId === p.id).length
  }));

  const last10Feedbacks = [...userFeedbacks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

  const chartWidth = 400;
  const chartHeight = 200;
  const maxCount = Math.max(...chartData.map((d) => d.count), 5);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Welcome Card */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
          Hello, {userData.fullname}!
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Here is the active feedback overview for your projects.
        </Typography>
      </Box>

      {/* Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 2.5,
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                p: 1.2,
                borderRadius: 2,
                bgcolor: "rgba(79,70,229,0.08)",
                color: "primary.main",
              }}
            >
              <WebIcon />
            </Box>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {totalProjects}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                Active Projects
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 2.5,
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                p: 1.2,
                borderRadius: 2,
                bgcolor: "rgba(13,148,136,0.08)",
                color: "secondary.main",
              }}
            >
              <ForumIcon />
            </Box>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {totalFeedbacks}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                Feedbacks Received
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Chart */}
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <TrendingUpIcon color="primary" />

          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Feedbacks per Project
          </Typography>
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          <svg
            width="100%"
            height={chartHeight}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            {chartData.map((d, i) => {
              const spacing = 320 / chartData.length;
              const barWidth = 30;
              const x = 60 + i * spacing;
              const barHeight = (d.count / maxCount) * 130;
              const y = 160 - barHeight;

              return (
                <g key={d.name}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="4"
                    fill="#6366f1"
                  />

                  <text
                    x={x + barWidth / 2}
                    y={y - 8}
                    textAnchor="middle"
                    fontSize="10"
                  >
                    {d.count}
                  </text>

                  <text
                    x={x + barWidth / 2}
                    y="180"
                    textAnchor="middle"
                    fontSize="9"
                  >
                    {d.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </Box>
      </Paper>

      {/* Feedback List */}
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Recent Feedbacks
          </Typography>

          <Button
            component={Link}
            href="/dashboard/feedbacks"
            variant="text"
            endIcon={<ArrowForwardIcon />}
            sx={{ fontWeight: 700 }}
          >
            View All
          </Button>
        </Box>

        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 0,
          }}
        >
          {last10Feedbacks.map((feedback, index) => (
            <React.Fragment key={feedback.id}>
              {index > 0 && <Divider />}

              <ListItem
                sx={{ px: 0, py: 1 }}
                secondaryAction={
                  <IconButton>
                    {feedback.isSaved ? (
                      <BookmarkIcon />
                    ) : (
                      <BookmarkBorderIcon />
                    )}
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {feedback.userName}
                      </Typography>

                      <Chip
                        label={feedback.projectName}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box sx={{ pr: 4 }}>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ mb: 1 }}
                      >
                        {feedback.comment}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        {new Date(feedback.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
