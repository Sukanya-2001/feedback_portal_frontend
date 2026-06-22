"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useProjectByCategoryData } from "@/Functions/react-queries/dashboard.query";

const COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#64748B",
];

export default function ProjectCategoryPieChart() {
  const { data, isLoading } = useProjectByCategoryData();

  if (isLoading) {
    return (
      <Paper sx={{ p: 3, borderRadius: 4, height: 420 }}>
        <Skeleton width={180} height={35} />

        <Box
          sx={{
            height: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton variant="circular" width={220} height={220} />
        </Box>
      </Paper>
    );
  }

  if (!!data && data.length === 0) {
    return (
      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          height: 420,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontWeight: 700, mb: 1 }}>
          Projects by Category
        </Typography>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="text.secondary">No data found</Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 4, height: 420 }}>
      <Typography sx={{ fontWeight: 700, marginBottom: "4px" }}>
        Projects by Category
      </Typography>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="projectCount"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            label
          >
            {!!data &&
              data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}
