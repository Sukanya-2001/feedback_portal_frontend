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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RateReviewIcon from "@mui/icons-material/RateReview";

interface FeedbackFormProps {
  projectId: string;
}

export default function FeedbackForm({ projectId }: FeedbackFormProps) {
  const { addFeedback } = useMockDatabase();
  const [userName, setUserName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!comment.trim()) {
      setError("Please write some feedback before submitting.");
      return;
    }

    // Validate email if entered
    if (guestEmail.trim() && !guestEmail.includes("@")) {
      setError("Please enter a valid email address if you wish to receive a reply.");
      return;
    }

    addFeedback(
      projectId,
      userName || "Anonymous Guest",
      guestEmail.trim() || undefined,
      5, // Default rating under the hood
      comment
    );

    // Reset form states
    setUserName("");
    setGuestEmail("");
    setComment("");
    setSuccessOpen(true);
  };

  return (
    <Card variant="outlined" sx={{ mb: 4, border: "1px solid", borderColor: "divider" }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <RateReviewIcon color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Submit Feedback
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Share your experience with this project. Your thoughts and suggestions help the creators improve their work!
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Your Name (Optional)"
                  variant="outlined"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Anonymous Guest"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Your Email (Optional)"
                  type="email"
                  variant="outlined"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="yourname@domain.com"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />
              </Grid>
            </Grid>
            <FormHelperText sx={{ mt: -1.5 }}>
              Providing your email allows the project owner to reply directly to your feedback.
            </FormHelperText>

            <Box>
              <TextField
                fullWidth
                label="Feedback Comment"
                variant="outlined"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review, suggestions, or bugs here..."
                error={!!error && error.includes("feedback")}
                required
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
              {error && <FormHelperText error>{error}</FormHelperText>}
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<SendIcon />}
              sx={{ alignSelf: "flex-start", py: 1.2, px: 3, borderRadius: 2 }}
            >
              Submit Review
            </Button>
          </Box>
        </form>

        <Snackbar
          open={successOpen}
          autoHideDuration={4000}
          onClose={() => setSuccessOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setSuccessOpen(false)} severity="success" variant="filled" sx={{ width: "100%" }}>
            Feedback submitted successfully! Thank you for your review.
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}
