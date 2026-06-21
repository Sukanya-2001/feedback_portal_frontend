"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

export default function Home() {
  return (
    <Box sx={{ width: "100%" }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 10 },
          borderBottom: "1px solid",
          borderColor: "divider",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Soft background glow decoration */}
        <Box
          sx={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(255,255,255,0) 70%)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -200,
            left: -200,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(13,148,136,0.06) 0%, rgba(255,255,255,0) 70%)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box>
                <ChipLabel />
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.15,
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                    color: "text.primary",
                  }}
                >
                  Gather Feedback. <br />
                  <span style={{ color: "#4f46e5" }}>
                    Build Better Products.
                  </span>
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    mb: 4,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: "540px",
                  }}
                >
                  An open feedback hub where developers can showcase their
                  products, and users can leave constructive, unauthenticated
                  reviews in seconds.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    component={Link}
                    href="/projects"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SearchIcon />}
                    sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
                  >
                    Browse Projects
                  </Button>
                  <Button
                    component={Link}
                    href="/auth/signup"
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={<AppRegistrationIcon />}
                    sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
                  >
                    Register Your Project
                  </Button>
                </Stack>
              </Box>
            </Grid>

            {/* Visual Feature/Metric Highlight Side */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  p: 4,
                  bgcolor: "#f8fafc",
                  borderRadius: 4,
                  border: "1px solid #e2e8f0",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700 }}
                  color="text.primary"
                >
                  Live Hub Metrics
                </Typography>

                <Box sx={{ display: "flex", gap: 3 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 800 }}
                      color="primary.main"
                    >
                      10
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      Registered Projects
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 800 }}
                      color="secondary.main"
                    >
                      10
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      Total Feedbacks Left
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <ShowChartIcon sx={{ color: "success.main", fontSize: 28 }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>100% open-access</strong>. Anyone can browse
                    products and submit suggestions without logging in.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Steps/Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 800, mb: 6 }}
        >
          How It Works
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%", p: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: "rgba(79, 70, 229, 0.1)",
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <AppRegistrationIcon fontSize="medium" />
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ fontWeight: 700 }}
                  gutterBottom
                >
                  1. Showcase Project
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create a developer account, add your project details, website,
                  tags, and set up your public profile page.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%", p: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: "rgba(13, 148, 136, 0.1)",
                    color: "secondary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <RateReviewIcon fontSize="medium" />
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ fontWeight: 700 }}
                  gutterBottom
                >
                  2. Share Public Link
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Any guest user or client can visit your project details page,
                  review features, and submit comments and reviews without
                  logging in.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%", p: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: "rgba(22, 163, 74, 0.1)",
                    color: "success.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <EmojiObjectsIcon fontSize="medium" />
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ fontWeight: 700 }}
                  gutterBottom
                >
                  3. Analyze & Grow
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View aggregated feedback metrics on your dashboard. Filter
                  feedbacks by project to identify bottlenecks and new features.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function ChipLabel() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        px: 1.5,
        py: 0.5,
        borderRadius: 20,
        bgcolor: "rgba(79, 70, 229, 0.08)",
        color: "primary.main",
        mb: 2.5,
        border: "1px solid rgba(79, 70, 229, 0.2)",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        ✨ The Open Feedback Portal
      </Typography>
    </Box>
  );
}
