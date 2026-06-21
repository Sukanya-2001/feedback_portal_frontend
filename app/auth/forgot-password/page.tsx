"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { ForgotPassword } from "@/components/Auth/ForgotPassword";
import { VerifyEmail } from "@/components/Auth/VerifyEmail";
import { ResetPassword } from "@/components/Auth/ResetPassword";

export type ChildProps = {
  handleChangeStep: (
    value: "VerifyEmail" | "VerifyOtp" | "ResetPassword",
  ) => void;
  email: string | null;
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [step, setStep] = useState<
    "VerifyEmail" | "VerifyOtp" | "ResetPassword"
  >("VerifyEmail");

  const handleChangeStep = (
    value: "VerifyEmail" | "VerifyOtp" | "ResetPassword",
  ) => {
    setStep(value);
  };

  const handleSetEmail = (value: string) => {
    setEmail(value);
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
          {step === "VerifyEmail" ? (
            <ForgotPassword
              handleChangeStep={handleChangeStep}
              handleSetEmail={handleSetEmail}
            />
          ) : step === "VerifyOtp" ? (
            <VerifyEmail handleChangeStep={handleChangeStep} email={email} />
          ) : (
            <ResetPassword handleChangeStep={handleChangeStep} email={email} />
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
