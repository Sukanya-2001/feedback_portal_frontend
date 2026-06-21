import { FeedbackData } from "@/api/hooks/feedbacks/feedback.interface";
import {
  useFeedbackList,
  useReplyonFeedback,
} from "@/Functions/react-queries/feedbacks.query";
import {
  Box,
  Button,
  Typography,
  Collapse,
  Paper,
  TextField,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { useState } from "react";

type ReplyProps = {
  feedback: FeedbackData;
  hasReply: boolean;
  refetch: ReturnType<typeof useFeedbackList>["refetch"];
};

export const DeveloperReply = ({ feedback, hasReply, refetch }: ReplyProps) => {
  // Reply state
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyError, setReplyError] = useState("");

  const { mutateAsync: reply, isPending } = useReplyonFeedback();
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
    const payload = {
      comment: replyText.trim(),
    };

    reply(
      { feedbackId, payload },
      {
        onSuccess: (res) => {
          if (res.status === 201) {
            setActiveReplyId(null);
            setReplyText("");
            refetch();
          }
        },
      },
    );
  };

  return (
    <Box sx={{ mt: 2, display: "flex", flexFlow: "column", gap: 2 }}>
      {!hasReply && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {feedback.guestEmail ? (
            activeReplyId !== feedback._id && (
              <Button
                size="small"
                variant="outlined"
                startIcon={<ReplyIcon />}
                onClick={() => handleOpenReplyForm(feedback._id)}
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

      <Collapse in={activeReplyId === feedback._id}>
        <Paper
          variant="outlined"
          sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 2 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            Replying by email to {feedback.guestEmail}:
          </Typography>
          <TextField
            fullWidth
            size="small"
            multiline
            rows={2}
            placeholder="Write your official response..."
            value={replyText}
            onChange={(e) => {
              setReplyText(e.target.value);
              if (replyError) setReplyError("");
            }}
            error={!!replyError}
            helperText={replyError}
            sx={{ mb: 2 }}
          />
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "flex-end",
            }}
          >
            <Button
              size="small"
              variant="text"
              disabled={isPending}
              onClick={handleCloseReplyForm}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              endIcon={<ArrowCircleUpIcon />}
              onClick={() => handleSubmitReply(feedback._id)}
              disabled={isPending}
            >
              Send Response
            </Button>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};
