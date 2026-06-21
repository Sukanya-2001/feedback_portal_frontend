import { Grid, Paper, Box, Typography, Skeleton } from "@mui/material";
import WebIcon from "@mui/icons-material/Web";
import ForumIcon from "@mui/icons-material/Forum";
import { useCountData } from "@/Functions/react-queries/dashboard.query";

export const Metrics = () => {
  const { data, isLoading } = useCountData();

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Paper
          variant="outlined"
          sx={{
            p: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 2.5,
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              p: 1.2,
              borderRadius: 2,
              bgcolor: "rgba(79,70,229,0.08)",
              color: "primary.main",
            }}
          >
            <WebIcon />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {isLoading ? (
                <Skeleton variant="text" width={80} height={32} />
              ) : (
                (data?.totalProjects ?? 0)
              )}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Total Projects
            </Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <Paper
          variant="outlined"
          sx={{
            p: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 2.5,
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              p: 1.2,
              borderRadius: 2,
              bgcolor: "rgba(13,148,136,0.08)",
              color: "secondary.main",
            }}
          >
            <ForumIcon />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {isLoading ? (
                <Skeleton variant="text" width={80} height={32} />
              ) : (
                (data?.totalFeedbacks ?? 0)
              )}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Total Feedbacks Received
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
