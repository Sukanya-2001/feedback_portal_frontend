"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Project,
  Feedback,
  INITIAL_PROJECTS,
  INITIAL_FEEDBACKS,
} from "@/components/MockDatabase";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
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
import {
  useAllSavedFeedbacks,
  useMarkAsSave,
} from "@/Functions/react-queries/feedbacks.query";
import { toast } from "sonner";
import { SavedFeedbackSkeleton } from "@/components/Skeleton/SaveFeedbackSkeleton";

export default function SavedFeedbacksPage() {
  const { data: savedFeedbacks, isLoading, refetch } = useAllSavedFeedbacks();
  const { mutateAsync, isPending } = useMarkAsSave();

  const toggleSaveFeedback = (feedbackId: string) => {
    mutateAsync(feedbackId, {
      onSuccess: (res) => {
        if (res.status === 200) {
          toast.success("Feedback saved successfully");
          refetch();
        }
      },
    });
  };

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
            Keep track of reviews, feature suggestions, or bugs you bookmarked
            for later.
          </Typography>
        </Box>
      </Box>

      {isLoading ? (
        <SavedFeedbackSkeleton />
      ) : !!savedFeedbacks && savedFeedbacks.length === 0 ? (
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
          <BookmarkBorderIcon
            sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            No saved feedbacks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You can bookmark specific reviews on your feedbacks feed to keep
            them tracked here.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {savedFeedbacks?.map((feedback, index) => {
            const previewFeedbacks = feedback.feedbacks.slice(0, 5);

            return (
              <Accordion
                key={feedback._id}
                defaultExpanded={index === 0}
                disableGutters
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  "&:before": {
                    display: "none",
                  },
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    px: 3,
                    bgcolor: "background.paper",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", sm: "center" },
                      gap: 2,
                      width: "100%",
                      pr: 2,
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <WebIcon color="primary" />

                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {feedback.project.projectName}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 0.5,
                          ml: { xs: 0, sm: 4.5 }, // aligns below project name
                        }}
                      >
                        {feedback.feedbackCount} bookmarked feedback
                        {feedback.feedbackCount > 1 ? "s" : ""}
                      </Typography>
                    </Box>

                    {feedback.feedbackCount > 5 && (
                      <Button
                        component={Link}
                        href={`saved-feedbacks/${feedback.project.slug}`}
                        variant="outlined"
                        size="small"
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          flexShrink: 0,
                        }}
                      >
                        View All
                      </Button>
                    )}
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ px: 3 }}>
                  <Grid container spacing={2}>
                    {previewFeedbacks.map((f) => (
                      <Grid size={12} key={f._id}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 2,
                            bgcolor: "#f8fafc",
                            borderRadius: 2,
                            position: "relative",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                            }}
                          >
                            <Tooltip title="Remove bookmark">
                              <IconButton
                                onClick={() => toggleSaveFeedback(f._id)}
                                disabled={isPending}
                                color="warning"
                                size="small"
                              >
                                <BookmarkIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                              pr: 4,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 700 }}
                            >
                              {f.guestName}
                            </Typography>

                            {f.guestEmail && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                ({f.guestEmail})
                              </Typography>
                            )}
                          </Box>

                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{
                              mb: 1.5,
                              whiteSpace: "pre-line",
                            }}
                          >
                            {f.feedback}
                          </Typography>

                          {f.reply && (
                            <Box
                              sx={{
                                mt: 1.5,
                                pl: 2,
                                borderLeft: "2px solid #0d9488",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                  mb: 0.5,
                                }}
                              >
                                <RateReviewIcon
                                  color="secondary"
                                  sx={{ fontSize: 14 }}
                                />

                                <Typography
                                  variant="caption"
                                  sx={{ fontWeight: 700 }}
                                  color="secondary.dark"
                                >
                                  Your reply:
                                </Typography>
                              </Box>

                              <Typography
                                variant="caption"
                                color="text.primary"
                                sx={{ display: "block" }}
                              >
                                {f.reply.comment}
                              </Typography>
                            </Box>
                          )}
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
