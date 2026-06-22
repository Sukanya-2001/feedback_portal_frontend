"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  Paper,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  Skeleton,
} from "@mui/material";

import { useState } from "react";
import { useProjectGraphData } from "@/Functions/react-queries/dashboard.query";
import { Range } from "@/api/hooks/dashboard/dashboard.interface";

export default function ProjectTrendChart() {
  const [period, setPeriod] = useState<Range>("monthly");
  const { data, isLoading } = useProjectGraphData(period);
  if (isLoading) {
    return (
      <Paper sx={{ p: 3, borderRadius: 4, height: 420 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Skeleton width={140} height={32} />
          <Skeleton width={140} height={40} />
        </Box>

        <Skeleton
          variant="rounded"
          width="100%"
          height={320}
          sx={{ borderRadius: 2 }}
        />
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 4, height: 420 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "4px",
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>Project Growth</Typography>

        <FormControl size="small">
          <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <MenuItem value="monthly">Last 12 Months</MenuItem>
            <MenuItem value="yearly">Last 5 Years</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {!!data && data.length === 0 ? (
        <Box
          sx={{
            height: "85%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="text.secondary">
            No project growth data available
          </Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="count"
              stroke="#10B981"
              fill="#10B98133"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}
