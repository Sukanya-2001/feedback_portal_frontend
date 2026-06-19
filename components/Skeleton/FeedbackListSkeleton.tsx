import { Box, Paper, Skeleton } from "@mui/material";

const FeedbackListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Skeleton variant="text" width={220} height={40} />

      {Array.from({ length: count }).map((_, index) => (
        <Paper
          key={index}
          variant="outlined"
          sx={{
            p: 2.5,
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Skeleton variant="circular" width={44} height={44} />

            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Skeleton variant="text" width={140} height={28} />
                <Skeleton variant="text" width={80} height={20} />
              </Box>

              <Skeleton
                variant="text"
                width="100%"
                height={22}
                sx={{ mb: 0.5 }}
              />
              <Skeleton
                variant="text"
                width="90%"
                height={22}
                sx={{ mb: 0.5 }}
              />
              <Skeleton variant="text" width="70%" height={22} />
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default FeedbackListSkeleton;
