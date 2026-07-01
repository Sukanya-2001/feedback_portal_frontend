"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Button,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import WebIcon from "@mui/icons-material/Web";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import { useProjectList } from "@/Functions/react-queries/projects.query";
import { ProjectDetails } from "@/api/hooks/projects/projects.interface";
import ProjectListSkeleton from "@/components/Skeleton/ProjectListSkeleton";

export default function FeedbacksPage() {
  const LIMIT = 12;

  const [page, setPage] = useState(1);
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, isLoading, isFetching } = useProjectList(page, LIMIT);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastProjectRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching || !hasMore) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isFetching, hasMore],
  );

  useEffect(() => {
    if (!data) return;

    if (page === 1) {
      setProjects(data.projects);
    } else {
      setProjects((prev) => [...prev, ...data.projects]);
    }

    setHasMore(page < data.totalPages);
  }, [data, page]);

  useEffect(() => {
    setPage(1);
    setProjects([]);
    setHasMore(true);
  }, []);

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
            Select a project below to manage reviews, filter feedback, and send
            replies.
          </Typography>
        </Box>
      </Box>

      {/* Projects Grid */}
      {isLoading && page === 1 ? (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
              <ProjectListSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : data?.projects?.length === 0 ? (
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
          <WebIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            No projects registered
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            You need to register a project first before you can manage its
            feedbacks.
          </Typography>
          <Button
            component={Link}
            href="/dashboard/projects"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2 }}
          >
            Create Your First Project
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {projects?.map((p, index) => {
            // Premium CSS gradient logic for card highlight top border
            const textSeed =
              p?.projectName?.charCodeAt(0) +
              (p?.projectName?.charCodeAt(1) || 0);
            const gradients = [
              "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              "linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%)",
              "linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)",
              "linear-gradient(90deg, #f6d365 0%, #fda085 100%)",
              "linear-gradient(90deg, #13547a 0%, #80d0c7 100%)",
              "linear-gradient(90deg, #ff0844 0%, #ffb199 100%)",
            ];
            const cardGradient = gradients[textSeed % gradients.length];

            return (
              <Grid
                size={{ xs: 12, sm: 6, md: 6, lg: 4 }}
                key={p._id}
                ref={index === projects.length - 1 ? lastProjectRef : undefined}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.08)",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  {/* Decorative Top Gradient bar */}
                  <Box sx={{ height: 4, background: cardGradient }} />

                  <CardActionArea
                    component={Link}
                    href={`/dashboard/feedbacks/${p.slug}`}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                      height: "100%",
                      justifyContent: "flex-start",
                      p: 2.5,
                    }}
                  >
                    <CardContent sx={{ p: 0, flexGrow: 1 }}>
                      {/* Name & Tags */}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
                      >
                        {p?.projectName}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          mb: 2,
                        }}
                      >
                        {p?.categories?.map((tag) => (
                          <Chip
                            key={tag?._id}
                            label={tag?.name}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              height: 20,
                            }}
                          />
                        ))}
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          lineHeight: 1.5,
                          height: 63, // Ensures aligned text
                          mb: 2.5,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: p?.description ?? "",
                        }}
                      />
                    </CardContent>

                    {/* Bottom Status bar */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: "auto",
                        pt: 1.5,
                        borderTop: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Chip
                        label={
                          p?.feedbackCount === 1
                            ? "1 feedback"
                            : `${p?.feedbackCount} feedbacks`
                        }
                        color={p?.feedbackCount > 0 ? "primary" : "default"}
                        variant={p?.feedbackCount > 0 ? "filled" : "outlined"}
                        size="small"
                        sx={{ fontWeight: 700, px: 0.5 }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "primary.main",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          gap: 0.5,
                        }}
                      >
                        Manage
                        <ArrowForwardIcon sx={{ fontSize: 16 }} />
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
      {isFetching && page > 1 && (
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectListSkeleton />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
