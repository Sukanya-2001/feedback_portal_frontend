import {
  Paper,
  Box,
  Typography,
  Button,
  List,
  Divider,
  ListItem,
  IconButton,
  ListItemText,
  Chip,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useFeedbacksData } from "@/Functions/react-queries/dashboard.query";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import FeedbackSkeleton from "../Skeleton/FeedbackSkeleton";

export const RecentFeedbacks = () => {
  const { data: last10Feedbacks, isLoading } = useFeedbacksData();

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        p: 3,
        marginTop: "30px",
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

        {!!last10Feedbacks && last10Feedbacks?.data?.length > 0 && (
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

      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 0,
        }}
      >
        {isLoading ? (
          <FeedbackSkeleton />
        ) : !!last10Feedbacks && last10Feedbacks?.data?.length < 1 ? (
          <Box
            sx={{
              py: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            <FeedbackOutlinedIcon
              sx={{
                fontSize: 48,
                mb: 1,
                opacity: 0.6,
              }}
            />

            <Typography variant="body2">No feedbacks available</Typography>
          </Box>
        ) : (
          last10Feedbacks?.data?.map((feedback, index) => (
            <React.Fragment key={feedback._id}>
              {index > 0 && <Divider />}

              <ListItem sx={{ px: 0, py: 1 }}>
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
                        {feedback?.guestName}
                      </Typography>

                      <Chip
                        label={feedback?.projectName}
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
                        {feedback?.feedback}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        {new Date(feedback?.createdAt ?? "").toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))
        )}
      </List>
    </Paper>
  );
};
