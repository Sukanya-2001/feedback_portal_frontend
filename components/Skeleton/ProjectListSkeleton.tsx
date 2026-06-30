import { Box, Card, CardContent, Skeleton } from "@mui/material";

const ProjectListSkeleton = () => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Project Image */}
      <Skeleton variant="rectangular" height={180} animation="wave" />

      <CardContent>
        {/* Project Title */}
        <Skeleton variant="text" width="65%" height={35} animation="wave" />

        {/* Description */}
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" width="90%" animation="wave" />
        <Skeleton variant="text" width="70%" animation="wave" />

        {/* Categories */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 2,
            flexWrap: "wrap",
          }}
        >
          <Skeleton variant="rounded" width={70} height={28} animation="wave" />
          <Skeleton variant="rounded" width={60} height={28} animation="wave" />
          <Skeleton variant="rounded" width={80} height={28} animation="wave" />
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            alignItems: "center",
          }}
        >
          <Skeleton variant="text" width={90} height={25} animation="wave" />
          <Skeleton
            variant="circular"
            width={36}
            height={36}
            animation="wave"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectListSkeleton;
