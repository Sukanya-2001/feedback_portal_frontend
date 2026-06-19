import {
  useFeedbackList,
  useMarkAsSave,
  useReplyonFeedback,
} from "@/Functions/react-queries/feedbacks.query";
import {
  Paper,
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
  Collapse,
  TextField,
} from "@mui/material";
import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { DeveloperReply } from "./DeveloperReply";
import { toast } from "sonner";

export const FeedbackDetails = ({ projectId }: { projectId: string }) => {
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filterSaved, setFilterSaved] = useState<string>("all");

  const {
    data: feedbacks,
    isLoading,
    refetch,
  } = useFeedbackList(1, 10, projectId);

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
    <>
      {/* Filters Toolbar */}
      <Paper variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
          <FilterListIcon fontSize="small" color="action" />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Filter & Sort Reviews
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="bookmark-filter-label">
                Filter Bookmarked
              </InputLabel>
              <Select
                labelId="bookmark-filter-label"
                id="bookmark-filter"
                value={filterSaved}
                label="Filter Bookmarked"
                onChange={(e) => setFilterSaved(e.target.value)}
              >
                <MenuItem value="all">Show All Feedbacks</MenuItem>
                <MenuItem value="saved">Show Bookmarked Only</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="sort-filter-label">Sort By</InputLabel>
              <Select
                labelId="sort-filter-label"
                id="sort-filter"
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Feedbacks Listing */}
      {!!feedbacks && feedbacks?.feedbacks?.length === 0 ? (
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
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            No feedbacks found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filterSaved === "saved"
              ? "You haven't bookmarked any feedbacks for this project yet."
              : "No users have left feedback for this project yet."}
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {feedbacks?.feedbacks?.map((f) => {
            const hasReply = !!f.reply;

            return (
              <Paper
                key={f._id}
                variant="outlined"
                sx={{ p: 3, borderRadius: 3, position: "relative" }}
              >
                <Box sx={{ position: "absolute", top: 18, right: 18 }}>
                  <IconButton
                    onClick={() => toggleSaveFeedback(f._id)}
                    disabled={isPending}
                    color={f.isSaved ? "warning" : "default"}
                  >
                    {f.isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 1.5,
                    mb: 1.5,
                    pr: 5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700 }}
                      color="text.primary"
                    >
                      {f?.guestName}
                    </Typography>
                    {f.guestEmail && (
                      <Typography variant="caption" color="text.secondary">
                        ({f.guestEmail})
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(f.createdAt).toLocaleString()}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ mb: 2, whiteSpace: "pre-line" }}
                >
                  {f?.feedback}
                </Typography>

                {hasReply && (
                  <Box sx={{ mt: 3, pl: 3, borderLeft: "3px solid #0d9488" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <RateReviewIcon color="secondary" fontSize="small" />
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
                        {new Date(f.reply!.created_at).toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ whiteSpace: "pre-line" }}
                    >
                      {f.reply!.comment}
                    </Typography>
                  </Box>
                )}

                <DeveloperReply
                  feedback={f}
                  hasReply={hasReply}
                  refetch={refetch}
                />
              </Paper>
            );
          })}
        </Box>
      )}
    </>
  );
};
