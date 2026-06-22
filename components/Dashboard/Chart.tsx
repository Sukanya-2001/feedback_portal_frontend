"use client";

import { Paper, Box, Typography, Skeleton } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import { useGraphData } from "@/Functions/react-queries/dashboard.query";

export const Chart = () => {
  const { data, isLoading } = useGraphData();

  const chartData =
    data?.data?.map((p) => ({
      name: p?.projectName ?? "",
      count: p?.feedbackCount ?? 0,
    })) || [];

  const hasData = chartData.length > 0;

  if (isLoading) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 4,
          height: 400,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
          }}
        >
          <TrendingUpIcon color="primary" />

          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Feedbacks per Project
          </Typography>
        </Box>

        <Box
          sx={{
            height: 300,
            display: "flex",
            alignItems: "flex-end",
            gap: 2,
          }}
        >
          {[120, 80, 160, 100, 140].map((height, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={50}
              height={height}
            />
          ))}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        height: 420,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
        }}
      >
        <TrendingUpIcon color="primary" />

        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Feedbacks per Project
        </Typography>
      </Box>

      {!hasData ? (
        <Box
          sx={{
            height: 280,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
          }}
        >
          <InsertChartOutlinedIcon
            sx={{
              fontSize: 48,
              mb: 1,
              opacity: 0.6,
            }}
          />

          <Typography variant="body2">No feedback data available</Typography>
        </Box>
      ) : (
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 12,
                }}
                tickFormatter={(value) =>
                  value.length > 10 ? `${value.slice(0, 10)}...` : value
                }
              />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {chartData.map((_, index) => (
                  <Cell key={index} fill="#6366f1" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  );
};
