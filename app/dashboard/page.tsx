"use client";

import React from "react";
import Link from "next/link";
import { useMockDatabase, Feedback } from "@/components/MockDatabase";
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

export default function DashboardPage() {
  const { currentUser, projects, feedbacks, toggleSaveFeedback } = useMockDatabase();

  if (!currentUser) return null;

  // Filter owned items
  const userProjects = projects.filter((p) => p.userId === currentUser.id);
  const userProjectIds = userProjects.map((p) => p.id);
  const userFeedbacks = feedbacks.filter((f) => userProjectIds.includes(f.projectId));

  // Sort feedbacks by date descending
  const sortedFeedbacks = [...userFeedbacks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Take last 10 feedbacks
  const last10Feedbacks = sortedFeedbacks.slice(0, 10);

  // Stats calculation
  const totalProjects = userProjects.length;
  const totalFeedbacks = userFeedbacks.length;

  // Calculate project-wise reviews count for SVG Bar Chart
  const chartData = userProjects.map((p) => {
    const count = userFeedbacks.filter((f) => f.projectId === p.id).length;
    return { name: p.name.length > 15 ? p.name.substring(0, 12) + "..." : p.name, count };
  });

  // SVG Chart Dimensions
  const chartWidth = 400;
  const chartHeight = 200;
  const maxCount = Math.max(...chartData.map((d) => d.count), 5); // default min height

  return (
    <Box sx={{ width: "100%" }}>
      {/* Welcome Card */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
          Hello, {currentUser.name}!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Here is the active feedback overview for your projects.
        </Typography>
      </Box>

      {/* Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper variant="outlined" sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2.5, borderRadius: 3 }}>
            <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: "rgba(79, 70, 229, 0.08)", color: "primary.main" }}>
              <WebIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {totalProjects}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                Active Projects
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper variant="outlined" sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2.5, borderRadius: 3 }}>
            <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: "rgba(13, 148, 136, 0.08)", color: "secondary.main" }}>
              <ForumIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {totalFeedbacks}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                Feedbacks Received
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Analytics Graph */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* SVG Bar Chart */}
        <Grid size={12}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <TrendingUpIcon color="primary" fontSize="small" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Feedbacks per Project
              </Typography>
            </Box>

            {chartData.length === 0 ? (
              <Box sx={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="body2" color="text.secondary">No project data available.</Typography>
              </Box>
            ) : (
              <Box sx={{ width: "100%", overflowX: "auto", pt: 2 }}>
                {/* SVG Visual */}
                <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ minWidth: 320 }}>
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((r) => {
                    const y = 30 + r * 130;
                    const val = Math.round(maxCount * (1 - r));
                    return (
                      <g key={r}>
                        <line x1="45" y1={y} x2="380" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                        <text x="35" y={y + 4} fontSize="10" fill="#94a3b8" textAnchor="end">{val}</text>
                      </g>
                    );
                  })}

                  {/* Bars */}
                  {chartData.map((d, i) => {
                    const barCount = chartData.length;
                    const spacing = 320 / barCount;
                    const barWidth = Math.min(30, spacing * 0.5);
                    const x = 60 + i * spacing;
                    const barHeight = (d.count / maxCount) * 130;
                    const y = 160 - barHeight;

                    return (
                      <g key={i}>
                        {/* Bar with gradient gradient */}
                        <rect
                           x={x}
                           y={y}
                           width={barWidth}
                           height={Math.max(barHeight, 4)} // minimum height of 4px
                           rx="4"
                           fill="#6366f1"
                        />
                        {/* Label */}
                        <text
                          x={x + barWidth / 2}
                          y="180"
                          fontSize="9"
                          fontWeight="600"
                          fill="#64748b"
                          textAnchor="middle"
                        >
                          {d.name}
                        </text>
                        {/* Count Tooltip Text */}
                        <text
                          x={x + barWidth / 2}
                          y={y - 8}
                          fontSize="10"
                          fontWeight="700"
                          fill="#4f46e5"
                          textAnchor="middle"
                        >
                          {d.count}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Feedbacks Grid Section */}
      <Grid container spacing={3}>
        {/* Last 10 Feedbacks list */}
        <Grid size={12}>
          <Paper variant="outlined" sx={{ borderRadius: 3, p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Recent Feedbacks (Last 10)
              </Typography>
              {userFeedbacks.length > 10 && (
                <Button
                  component={Link}
                  href="/dashboard/feedbacks"
                  variant="text"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ fontWeight: 700 }}
                >
                  View All
                </Button>
              )}
            </Box>

            {last10Feedbacks.length === 0 ? (
              <Box sx={{ py: 6, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  No feedbacks received yet. Share your project link to start receiving user feedback!
                </Typography>
              </Box>
            ) : (
              <List sx={{ display: "flex", flexDirection: "column", gap: 2, p: 0 }}>
                {last10Feedbacks.map((f, index) => (
                  <React.Fragment key={f.id}>
                    {index > 0 && <Divider />}
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="bookmark"
                          onClick={() => toggleSaveFeedback(f.id)}
                          color={f.isSaved ? "warning" : "default"}
                        >
                          {f.isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </IconButton>
                      }
                      sx={{ px: 0, py: 1 }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1, flexWrap: "wrap" }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                              {f.userName}
                            </Typography>
                            <Chip
                              label={f.projectName}
                              size="small"
                              variant="outlined"
                              sx={{ fontWeight: 600, fontSize: "0.75rem", py: 0 }}
                            />
                            {/* Rating removed */}
                          </Box>
                        }
                        secondary={
                          <Box sx={{ pr: 4 }}>
                            <Typography variant="body2" color="text.primary" sx={{ mb: 1, whiteSpace: "pre-line" }}>
                              {f.comment}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Received: {new Date(f.createdAt).toLocaleString()}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
