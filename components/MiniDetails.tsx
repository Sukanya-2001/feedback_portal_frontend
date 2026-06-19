import { ProjectDetails } from "@/api/hooks/projects/projects.interface";
import { Box, Typography, Button, Paper, Stack, Chip } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const MiniDetails = ({
  project,
}: {
  project: ProjectDetails | undefined;
}) => {
  return (
    <>
      {/* Title Header with Back button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
            {project?.projectName} Feedbacks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage, filter, and reply to reviews left by users for{" "}
            {project?.projectName}.
          </Typography>
        </Box>
        <Button
          component={Link}
          href="/dashboard/feedbacks"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{ borderRadius: 2 }}
        >
          Back to Hub
        </Button>
      </Box>

      {/* Project mini details header */}
      <Paper
        variant="outlined"
        sx={{ p: 2.5, mb: 4, borderRadius: 3, bgcolor: "action.hover" }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
          Description
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {project?.description}
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {project?.categories?.map((tag) => (
            <Chip
              key={tag?._id}
              label={tag?.name}
              size="small"
              variant="filled"
              color="default"
              sx={{ fontSize: "0.72rem" }}
            />
          ))}
          {project?.websiteLink && (
            <Button
              component="a"
              href={project?.websiteLink}
              target="_blank"
              size="small"
              sx={{ py: 0, px: 1, fontSize: "0.75rem", textTransform: "none" }}
            >
              View Website
            </Button>
          )}
        </Stack>
      </Paper>
    </>
  );
};
