"use client";

import React from "react";
import { Box, Typography, Avatar, Paper, Divider } from "@mui/material";
import { ChatBubbleOutlineOutlined as ChatBubbleOutlineIcon } from "@mui/icons-material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { FeedbackData } from "@/api/hooks/feedbacks/feedback.interface";
import FeedbackListSkeleton from "./Skeleton/FeedbackListSkeleton";

interface FeedbackListProps {
  feedbacks: { feedbacks: FeedbackData[]; total: number } | undefined;
  isLoading?: boolean;
}

export default function FeedbackList({
  feedbacks,
  isLoading,
}: FeedbackListProps) {
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  return isLoading ? (
    <FeedbackListSkeleton />
  ) : (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        Reviews & Feedbacks ({feedbacks?.total})
      </Typography>

      {!!feedbacks?.feedbacks && feedbacks.feedbacks?.length > 0 ? (
        feedbacks.feedbacks.map((item) => (
          <Paper
            key={item._id}
            variant="outlined"
            sx={{
              p: 2.5,
              borderRadius: 3,
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Avatar
                sx={{
                  bgcolor: "secondary.light",
                  color: "secondary.dark",
                  fontWeight: 700,
                  width: 44,
                  height: 44,
                }}
              >
                {item?.guestName?.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700 }}
                    color="text.primary"
                  >
                    {item?.guestName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(item.createdAt)}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ whiteSpace: "pre-line", mb: item.reply ? 2.5 : 0 }}
                >
                  {item.feedback}
                </Typography>

                {/* Developer response rendering if exists */}
                {item.reply && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      bgcolor: "#f8fafc",
                      borderRadius: 2,
                      borderLeft: "3px solid",
                      borderColor: "secondary.main",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <RateReviewIcon color="secondary" sx={{ fontSize: 16 }} />
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700 }}
                        color="secondary.dark"
                      >
                        Developer Response
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: "auto" }}
                      >
                        {formatDate(item.reply.created_at)}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ whiteSpace: "pre-line" }}
                    >
                      {item.reply.comment}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        ))
      ) : (
        <Paper
          variant="outlined"
          sx={{
            py: 6,
            px: 2,
            textAlign: "center",
            backgroundColor: "background.paper",
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <ChatBubbleOutlineIcon
            sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            No feedbacks yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Be the first to share your thoughts by filling out the feedback form
            above!
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
