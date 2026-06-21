"use client";

import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import { Metrics } from "@/components/Dashboard/Metrics";
import { Chart } from "@/components/Dashboard/Chart";
import { RecentFeedbacks } from "@/components/Dashboard/RecentFeedbacks";

export default function DashboardPage() {
  const { isLoggedIn, userData } = useSelector((s: RootState) => s.user);

  if (!isLoggedIn || !userData) return null;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Welcome Card */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
          Hello, {userData.fullName}!
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Here is the active feedback overview for your projects.
        </Typography>
      </Box>

      {/* Metrics */}
      <Metrics />

      {/* Chart */}
      <Chart />

      {/* Feedback List */}
      <RecentFeedbacks />
    </Box>
  );
}
