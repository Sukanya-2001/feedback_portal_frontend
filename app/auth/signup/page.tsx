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
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

export default function SignupPage() {
  const { signup, currentUser } = useMockDatabase();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect if already logged in
  React.useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const success = signup(name, email, password);
    if (success) {
      router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
    } else {
      setError("Sign up failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 }, display: "flex", flexGrow: 1, alignItems: "center" }}>
      <Card sx={{ width: "100%", p: { xs: 2, md: 4 }, border: "1px solid #e2e8f0" }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
            <BubbleChartIcon sx={{ fontSize: 44, color: "primary.main", mb: 1.5 }} />
            <Typography variant="h4" sx={{ fontWeight: 800 }} align="center" gutterBottom>
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Register as a developer to start showcasing your projects.
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
                label="Full Name"
                placeholder="Alex Mercer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />

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

              <TextField
                fullWidth
                label="Password"
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                endIcon={<PersonAddIcon />}
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </form>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Button component={Link} href="/auth/login" variant="text" sx={{ p: 0, minWidth: "auto", fontWeight: 700 }}>
                Log In
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
