"use client";

import React, { useState } from "react";
import { useMockDatabase } from "./MockDatabase";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  FormHelperText,
  Grid,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  feedbackSchema,
  FeedbackType,
  feedbackType,
} from "@/Functions/schema/feedback.schema";
import { useFeedbackCreate } from "@/Functions/react-queries/feedbacks.query";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { allkeys } from "@/Functions/react-queries/allKeys";

interface FeedbackFormProps {
  projectId: string;
}

export default function FeedbackForm({ projectId }: FeedbackFormProps) {
  const queryClient = useQueryClient();
  const { userData } = useSelector((s: RootState) => s?.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      guestName: userData?.fullName || "",
      guestEmail: userData?.email || "",
      feedback: "",
    },
  });
  const { mutateAsync, isPending } = useFeedbackCreate();

  const onSubmit = (data: FeedbackType) => {
    const payload = {
      projectId: projectId,
      guestName: data.guestName || "Anonymous Guest",
      guestEmail: data.guestEmail || undefined,
      feedback: data.feedback,
    };
    mutateAsync(payload, {
      onSuccess: (res) => {
        if (res.status === 201) {
          reset();
          toast.success(
            "Feedback submitted successfully! Thank you for your review.",
          );
          queryClient.refetchQueries({ queryKey: [allkeys.FEEDBACK_LIST] });
        }
      },
    });
  };

  return (
    <Card
      variant="outlined"
      sx={{ mb: 4, border: "1px solid", borderColor: "divider" }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <RateReviewIcon color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Submit Feedback
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Share your experience with this project. Your thoughts and suggestions
          help the creators improve their work!
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  {...register("guestName")}
                  fullWidth
                  label="Your Name (Optional)"
                  variant="outlined"
                  placeholder="Enter your Name..."
                  error={!!errors.guestName}
                  helperText={errors.guestName?.message}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  {...register("guestEmail")}
                  fullWidth
                  label="Your Email (Optional)"
                  type="email"
                  variant="outlined"
                  placeholder="Enter your email..."
                  error={!!errors.guestEmail}
                  helperText={errors.guestEmail?.message}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                />
              </Grid>
            </Grid>
            <FormHelperText sx={{ mt: -1.5 }}>
              Providing your email allows the project owner to reply directly to
              your feedback.
            </FormHelperText>

            <Box>
              <TextField
                {...register("feedback")}
                fullWidth
                label="Feedback Comment"
                variant="outlined"
                multiline
                rows={4}
                placeholder="Write your review, suggestions, or bugs here..."
                error={!!errors.feedback}
                helperText={errors.feedback?.message}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<SendIcon />}
              disabled={isPending}
              sx={{ alignSelf: "flex-start", py: 1.2, px: 3, borderRadius: 2 }}
            >
              {isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit Review"
              )}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
