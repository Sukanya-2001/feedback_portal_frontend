import {
  Box,
  Paper,
  Skeleton,
} from "@mui/material";

export default function FeedbackSkeleton() {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 3,
        position: "relative",
      }}
    >
      {/* Bookmark Icon */}
      <Skeleton
        variant="rounded"
        width={40}
        height={40}
        sx={{ position: "absolute", top: 18, right: 18 }}
      />

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          pr: 5,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton variant="text" width={120} height={32} />
          <Skeleton variant="text" width={150} height={24} />
        </Box>

        <Skeleton variant="text" width={120} height={20} />
      </Box>

      {/* Feedback Content */}
      <Skeleton variant="text" height={24} />
      <Skeleton variant="text" height={24} />
      <Skeleton variant="text" width="80%" height={24} />

      {/* Developer Reply */}
      <Box sx={{ mt: 3, pl: 3 }}>
        <Skeleton variant="text" width={160} height={24} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" width="70%" height={20} />
      </Box>
    </Paper>
  );
}