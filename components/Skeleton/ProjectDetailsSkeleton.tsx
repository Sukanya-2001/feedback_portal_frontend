import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Divider,
} from "@mui/material";

const ProjectDetailsSkeleton = () => {
  return (
    <Grid size={{ xs: 12, md: 7 }}>
      {/* Cover Image */}
      <Skeleton
        variant="rounded"
        sx={{
          width: "100%",
          height: { xs: 220, sm: 300 },
          borderRadius: 4,
          mb: 3.5,
        }}
      />

      {/* Project Title */}
      <Skeleton
        variant="text"
        width="70%"
        height={60}
        sx={{ mb: 2 }}
      />

      {/* Categories */}
      <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
        {[1, 2, 3].map((item) => (
          <Skeleton
            key={item}
            variant="rounded"
            width={90}
            height={32}
            sx={{ borderRadius: 10 }}
          />
        ))}
      </Box>

      {/* Description */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" height={28} />
        <Skeleton variant="text" height={28} />
        <Skeleton variant="text" width="90%" height={28} />
        <Skeleton variant="text" width="70%" height={28} />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Information Card */}
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Skeleton
          variant="text"
          width={220}
          height={32}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[1, 2, 3].map((item) => (
            <Box
              key={item}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="text" width="60%" height={24} />
            </Box>
          ))}
        </Box>
      </Paper>
    </Grid>
  );
};

export default ProjectDetailsSkeleton;