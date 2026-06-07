"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Simulate sending reset email
    setTimeout(() => {
      setLoading(false);
      router.push(`/auth/verify-reset-otp?email=${encodeURIComponent(email)}`);
    }, 1000);
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 }, display: "flex", flexGrow: 1, alignItems: "center" }}>
      <Card sx={{ width: "100%", p: { xs: 2, md: 4 }, border: "1px solid #e2e8f0" }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
            <LockResetIcon sx={{ fontSize: 48, color: "primary.main", mb: 1.5 }} />
            <Typography variant="h4" sx={{ fontWeight: 800 }} align="center" gutterBottom>
              Forgot Password?
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Enter the email address registered with your developer profile, and we'll send you a 6-digit OTP to reset your password.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
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
                disabled={loading}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Code"}
              </Button>
            </Box>
          </form>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              component={Link}
              href="/auth/login"
              variant="text"
              startIcon={<ArrowBackIcon />}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Back to Log In
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
