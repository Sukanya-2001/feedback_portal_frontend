"use client";

import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import { useMockDatabase } from "@/components/MockDatabase";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

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
              href="/terms"
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              Privacy Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
