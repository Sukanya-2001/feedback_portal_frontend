"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { OtpSchema, OtpType } from "@/Functions/schema/otp.schema";
import { ChildProps } from "@/app/auth/forgot-password/page";
import {
  useForgotPassword,
  useOtpVerify,
} from "@/Functions/react-queries/auth.query";
import { toast } from "sonner";

export const VerifyEmail = ({ handleChangeStep, email }: ChildProps) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpType>({
    resolver: yupResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { mutateAsync, isPending } = useOtpVerify();

  const { mutateAsync: resendMutate, isPending: resendPending } =
    useForgotPassword();

  const updateOtpValue = (newOtp: string[]) => {
    setOtp(newOtp);
    setValue("otp", newOtp.join(""), {
      shouldValidate: true,
    });
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    updateOtpValue(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        updateOtpValue(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");

      updateOtpValue(newOtp);

      inputRefs.current[5]?.focus();
    }
  };

  const onSubmit = async (data: OtpType) => {
    try {
      if (!email) {
        handleChangeStep("VerifyEmail");
        return;
      }
      const res = await mutateAsync({
        ...data,
        email,
      });

      if (res.status === 200) {
        toast.success("OTP verified successfully. Please reset your password.");

        handleChangeStep("ResetPassword");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResend = async () => {
    try {
      if (!email) {
        handleChangeStep("VerifyEmail");
        return;
      }
      const res = await resendMutate({ email });

      if (res.status === 200) {
        toast.success("A new OTP has been sent to your email.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >
        <MarkEmailReadIcon
          sx={{
            fontSize: 48,
            color: "primary.main",
            mb: 1.5,
          }}
        />

        <Typography variant="h4" align="center" gutterBottom>
          Verify Your Email
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center">
          We've sent a 6-digit verification code to
        </Typography>

        <Typography variant="subtitle2" color="primary.main" align="center">
          {email}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "center",
            }}
          >
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
                  fontWeight: "700",
                  textAlign: "center",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  outline: "none",
                }}
                disabled={isPending || resendPending}
              />
            ))}
          </Stack>

          {errors.otp && (
            <Typography color="error" variant="caption">
              {errors.otp.message}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isPending || resendPending}
          >
            {isPending ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Verify Code"
            )}
          </Button>
        </Box>
      </form>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          component={Link}
          href="/auth/signup"
          startIcon={<ArrowBackIcon />}
          sx={{
            textTransform: "none",
          }}
        >
          Back to Sign Up
        </Button>

        <Button
          onClick={handleResend}
          disabled={isPending || resendPending}
          sx={{
            textTransform: "none",
          }}
        >
          {resendPending ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            "Resend Code"
          )}
        </Button>
      </Box>
    </>
  );
};
