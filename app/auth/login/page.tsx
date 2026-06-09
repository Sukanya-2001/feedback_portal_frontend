"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMockDatabase } from "@/components/MockDatabase";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  Divider,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { setCookieClient } from "@/util/common";

export default function LoginPage() {
  const { login, currentUser } = useMockDatabase();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    }
    if (typeof window !== "undefined" && window.location.search.includes("reset=success")) {
      setResetSuccess(true);
    }
  }, [currentUser, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    const success = login(email);
    if (success) {
      setCookieClient(process.env.ACCESS_TOKEN!, 'accessToken');
      setCookieClient(process.env.REFRESH_TOKEN!, 'refreshToken');
      router.push("/dashboard");
    } else {
      setError("Login failed. Check your inputs.");
    }
  };

  const handleQuickLogin = (quickEmail: string) => {
    setEmail(quickEmail);
    setPassword("password123");
    const success = login(quickEmail);
    if (success) {

      router.push("/dashboard");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 }, display: "flex", flexGrow: 1, alignItems: "center" }}>
      <Card sx={{ width: "100%", p: { xs: 2, md: 4 }, border: "1px solid #e2e8f0" }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
            <BubbleChartIcon sx={{ fontSize: 44, color: "primary.main", mb: 1.5 }} />
            <Typography variant="h4" sx={{ fontWeight: 800 }} align="center" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Login to manage your projects and view feedback.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {resetSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Password reset successful! You can now log in with your new password.
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                placeholder="developer@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />

              <Box>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5 }}>
                  <Button
                    component={Link}
                    href="/auth/forgot-password"
                    variant="text"
                    size="small"
                    sx={{ p: 0, minWidth: "auto", textTransform: "none", fontWeight: 600, fontSize: "0.82rem" }}
                  >
                    Forgot Password?
                  </Button>
                </Box>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                endIcon={<LoginIcon />}
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                Log In
              </Button>
            </Box>
          </form>

          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Demo Quick Logins
            </Typography>
          </Divider>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => handleQuickLogin("alice@gmail.com")}
              sx={{ justifyContent: "space-between", px: 3 }}
            >
              <span>Login as Alice Smith (Demo Owner)</span>
              <strong>alice@gmail.com</strong>
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => handleQuickLogin("bob@gmail.com")}
              sx={{ justifyContent: "space-between", px: 3 }}
            >
              <span>Login as Bob Jones (Demo Owner)</span>
              <strong>bob@gmail.com</strong>
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Button component={Link} href="/auth/signup" variant="text" sx={{ p: 0, minWidth: "auto", fontWeight: 700 }}>
                Sign Up
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
