"use client";

import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import { useMockDatabase } from "@/components/MockDatabase";

export default function Footer() {
  const { currentUser } = useMockDatabase();

  if (currentUser) return null;

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: "auto",
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e2e8f0",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} FeedbackPortal. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              href="/projects"
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              Explore Projects
            </Link>
            <Link
              href="/auth/login"
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              Developer Login
            </Link>
            <Link
              href="/auth/signup"
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              Create Account
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
