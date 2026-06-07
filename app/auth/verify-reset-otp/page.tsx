"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Alert,
  Stack,
  CircularProgress,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function VerifyResetOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "developer@domain.com";

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [mockOtpCode, setMockOtpCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Generate a random 6-digit code for mock reset purposes on mount
  useEffect(() => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setMockOtpCode(code);
  }, []);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (pastedData.length === 6 && !isNaN(Number(pastedData))) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      setError("Please fill out all 6 digits of the code.");
      setLoading(false);
      return;
    }

    // Simulate verification check
    setTimeout(() => {
      if (enteredOtp === mockOtpCode) {
        setSuccess(true);
        setTimeout(() => {
          router.push(`/auth/reset-password?email=${encodeURIComponent(email)}&otp=${enteredOtp}`);
        }, 1500);
      } else {
        setError("Invalid reset code. Please check the code and try again.");
        setLoading(false);
      }
    }, 1000);
  };

  const handleResend = () => {
    setError("");
    setOtp(new Array(6).fill(""));
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setMockOtpCode(newCode);
    alert("New password reset code has been sent!");
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 }, display: "flex", flexGrow: 1, alignItems: "center" }}>
      <Card sx={{ width: "100%", p: { xs: 2, md: 4 }, border: "1px solid #e2e8f0" }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
            <LockOpenIcon sx={{ fontSize: 48, color: "primary.main", mb: 1.5 }} />
            <Typography variant="h4" sx={{ fontWeight: 800 }} align="center" gutterBottom>
              Verify Reset Code
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Please enter the 6-digit security code sent to
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 0.5 }} color="primary.main" align="center">
              {email}
            </Typography>
          </Box>

          {/* Simulated Email Inbox notification for quick local testing */}
          <Alert severity="info" variant="outlined" sx={{ mb: 4, borderColor: "primary.light" }}>
            <Typography variant="body2">
              <strong>[Mock Reset Code Delivery]</strong> Security code sent to inbox:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 3, mt: 0.5, color: "primary.dark" }}>
              {mockOtpCode}
            </Typography>
          </Alert>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Code verified successfully! Redirecting to password reset...
            </Alert>
          )}

          <form onSubmit={handleVerify}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              {/* Digit Inputs grid */}
              <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} sx={{ justifyContent: "center" }}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    onPaste={handlePaste}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    style={{
                      width: "48px",
                      height: "56px",
                      fontSize: "1.5rem",
                      fontWeight: "800",
                      textAlign: "center",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      outline: "none",
                      fontFamily: "inherit",
                      color: "#1e293b",
                    }}
                    disabled={loading || success}
                  />
                ))}
              </Stack>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={loading || success}
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Verify & Continue"}
              </Button>
            </Box>
          </form>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Button
              component={Link}
              href="/auth/forgot-password"
              variant="text"
              startIcon={<ArrowBackIcon />}
              sx={{ textTransform: "none", fontWeight: 600, p: 0 }}
            >
              Back
            </Button>
            <Button
              onClick={handleResend}
              variant="text"
              sx={{ textTransform: "none", fontWeight: 700, p: 0 }}
              disabled={loading || success}
            >
              Resend Code
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default function VerifyResetOtpPage() {
  return (
    <Suspense fallback={
      <Container maxWidth="sm" sx={{ py: 12, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    }>
      <VerifyResetOtpContent />
    </Suspense>
  );
}
