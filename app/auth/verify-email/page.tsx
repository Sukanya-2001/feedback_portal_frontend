"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, Container, CircularProgress } from "@mui/material";
import { VerifyEmail } from "@/components/Auth/VerifyEmail";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "developer@domain.com";

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [mockOtpCode, setMockOtpCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Generate a random 6 digit code for mock purposes on mount
  useEffect(() => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setMockOtpCode(code);
  }, []);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Take only the last character
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      setError("Please fill out all 6 digits of the verification code.");
      setLoading(false);
      return;
    }

    // Simulate verification check
    setTimeout(() => {
      if (enteredOtp === mockOtpCode) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setError(
          "Invalid verification code. Please check the code and try again.",
        );
        setLoading(false);
      }
    }, 1000);
  };

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
          <VerifyEmail handleChangeStep={() => {}} email={email} />
        </CardContent>
      </Card>
    </Container>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <Container
          maxWidth="sm"
          sx={{ py: 12, display: "flex", justifyContent: "center" }}
        >
          <CircularProgress />
        </Container>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
