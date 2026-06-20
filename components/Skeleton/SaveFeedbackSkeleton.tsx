import { Box, Paper, Skeleton, Divider, Grid } from "@mui/material";

export const SavedFeedbackSkeleton = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {[1, 2, 3].map((project) => (
        <Paper key={project} variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          {/* Project Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 2.5,
            }}
          >
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width={220} height={40} />
            <Skeleton
              variant="rounded"
              width={90}
              height={28}
              sx={{ borderRadius: 10 }}
            />
          </Box>

          <Divider sx={{ mb: 2.5 }} />

          <Grid container spacing={2}>
            {[1, 2].map((feedback) => (
              <Grid size={12} key={feedback}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Skeleton width={180} height={24} />
                    <Skeleton variant="circular" width={28} height={28} />
                  </Box>

                  <Skeleton width="60%" height={20} sx={{ mb: 1 }} />

                  <Skeleton height={18} />
                  <Skeleton height={18} />
                  <Skeleton width="80%" height={18} />

                  <Box
                    sx={{
                      mt: 2,
                      pl: 2,
                      borderLeft: "2px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Skeleton width={120} height={16} />
                    <Skeleton width="90%" height={16} />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};
