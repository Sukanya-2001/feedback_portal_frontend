import {
  useFeedbackList,
  useMarkAsSave,
} from "@/Functions/react-queries/feedbacks.query";
import SearchIcon from "@mui/icons-material/Search";
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
  TextField,
  InputAdornment,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { DeveloperReply } from "./DeveloperReply";
import { toast } from "sonner";
import FeedbackSkeleton from "./Skeleton/FeedbackSkeleton";
import { useDebounce } from "@/util/useDebounce";
import { formatDateTime } from "@/util/common";
import { FeedbackData } from "@/api/hooks/feedbacks/feedback.interface";

export const FeedbackDetails = ({
  projectId,
  saved,
}: {
  projectId: string;
  saved?: boolean;
}) => {
  const LIMIT = 20;

  const [page, setPage] = useState(1);
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("newest");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, isLoading, isFetching, refetch } = useFeedbackList(
    page,
    LIMIT,
    projectId,
    saved,
    sortBy,
    debouncedSearch,
  );

  const { mutateAsync, isPending } = useMarkAsSave();

  const toggleSaveFeedback = (feedbackId: string) => {
    mutateAsync(feedbackId, {
      onSuccess: (res) => {
        if (res.status === 200) {
          toast.success("Feedback saved successfully");

          setFeedbacks((prev) =>
            prev.map((item) =>
              item._id === feedbackId
                ? {
                    ...item,
                    isSaved: !item.isSaved,
                  }
                : item,
            ),
          );
        }
      },
    });
  };

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
      setFeedbacks(data.feedbacks);
    } else {
      setFeedbacks((prev) => [...prev, ...data.feedbacks]);
    }

    setHasMore(page < data.totalPages);
  }, [data, page]);

  useEffect(() => {
    setPage(1);
    setFeedbacks([]);
    setHasMore(true);
  }, [projectId, debouncedSearch, sortBy]);

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
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search your feedbacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl
              size="small"
              sx={{
                width: "100%",
              }}
            >
              <InputLabel id="sort-by-label">Sort By</InputLabel>

              <Select
                labelId="sort-by-label"
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
      {isLoading && page === 1 ? (
        <FeedbackSkeleton />
      ) : !!data?.feedbacks && data?.feedbacks?.length === 0 ? (
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
            {saved
              ? "You haven't bookmarked any feedbacks for this project yet."
              : "No users have left feedback for this project yet."}
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {feedbacks?.map((f, index) => {
            const hasReply = !!f.reply;

            return (
              <Paper
                key={f._id}
                ref={
                  index === feedbacks.length - 1 ? lastProjectRef : undefined
                }
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
                    {formatDateTime(f.createdAt)}
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
                        {formatDateTime(f.reply!.created_at)}
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
      {isFetching && page > 1 && <FeedbackSkeleton />}
    </>
  );
};
