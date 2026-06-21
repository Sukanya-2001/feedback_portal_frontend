"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Alert,
} from "@mui/material";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { Login } from "@/components/Auth/Login";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";

export default function LoginPage() {
  const { isLoggedIn } = useSelector((s: RootState) => s?.user);
  const router = useRouter();
  const [resetSuccess, setResetSuccess] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
    if (
      typeof window !== "undefined" &&
      window.location.search.includes("reset=success")
    ) {
      setResetSuccess(true);
    }
  }, [isLoggedIn, router]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: { xs: 8, md: 12 },
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
      }}
    >
      <Card
        sx={{ width: "100%", p: { xs: 2, md: 4 }, border: "1px solid #e2e8f0" }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <BubbleChartIcon
              sx={{ fontSize: 44, color: "primary.main", mb: 1.5 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 800 }}
              align="center"
              gutterBottom
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Login to manage your projects and view feedback.
            </Typography>
          </Box>

          {resetSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Password reset successful! You can now log in with your new
              password.
            </Alert>
          )}

          <Login />

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Button
                component={Link}
                href="/auth/signup"
                variant="text"
                sx={{ p: 0, minWidth: "auto", fontWeight: 700 }}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
