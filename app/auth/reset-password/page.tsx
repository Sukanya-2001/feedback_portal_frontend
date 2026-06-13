"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { ResetPassword } from "@/components/Auth/ResetPassword";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "developer@domain.com";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill out both password fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please check and try again.");
      return;
    }

    setLoading(true);

    // Simulate reset completion
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        router.push("/auth/login?reset=success");
      }, 1500);
    }, 1000);
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 }, display: "flex", flexGrow: 1, alignItems: "center" }}>
      <Card sx={{ width: "100%", p: { xs: 2, md: 4 }, border: "1px solid #e2e8f0" }}>
        <CardContent>
          <ResetPassword handleChangeStep={() => {}} email={email} />
        </CardContent>
      </Card>
    </Container>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <Container maxWidth="sm" sx={{ py: 12, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
