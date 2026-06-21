import { Paper, Box, Typography, Skeleton } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useGraphData } from "@/Functions/react-queries/dashboard.query";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";

export const Chart = () => {
  const { data, isLoading } = useGraphData();

  const chartData = data?.data?.map((p) => ({
    name: p?.projectName ?? "",
    count: p?.feedbackCount ?? 0,
  }));

  const hasData = !!chartData?.length;
  const chartWidth = 400;
  const chartHeight = 200;
  const maxCount = !!chartData
    ? Math.max(...chartData.map((d) => d.count), 5)
    : 0;

  if (isLoading) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <TrendingUpIcon color="primary" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Feedbacks per Project
          </Typography>
        </Box>

        <Box
          sx={{
            height: 200,
            display: "flex",
            alignItems: "flex-end",
            gap: 2,
            px: 2,
          }}
        >
          {[120, 80, 140, 100, 160].map((height, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={35}
              height={height}
            />
          ))}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 3,
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <TrendingUpIcon color="primary" />

        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Feedbacks per Project
        </Typography>
      </Box>

      <Box sx={{ overflowX: "auto" }}>
        {!hasData ? (
          <Box
            sx={{
              height: 200,
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
          <svg
            width="100%"
            height={chartHeight}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            {chartData.map((d, i) => {
              const spacing = 320 / chartData.length;
              const barWidth = 30;
              const x = 60 + i * spacing;
              const barHeight = (d.count / maxCount) * 130;
              const y = 160 - barHeight;

              return (
                <g key={d.name}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="4"
                    fill="#6366f1"
                  />

                  <text
                    x={x + barWidth / 2}
                    y={y - 8}
                    textAnchor="middle"
                    fontSize="10"
                  >
                    {d.count}
                  </text>

                  <text
                    x={x + barWidth / 2}
                    y="180"
                    textAnchor="middle"
                    fontSize="9"
                  >
                    {d.name.length > 10 ? `${d.name.slice(0, 10)}...` : d.name}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </Box>
    </Paper>
  );
};
