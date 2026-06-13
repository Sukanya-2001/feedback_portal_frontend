import {
  Box,
  Typography,
  Alert,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { error } from "console";
import Link from "next/link";
import LockResetIcon from "@mui/icons-material/LockReset";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ChildProps } from "@/app/auth/forgot-password/page";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotSchema, ForgotType } from "@/Functions/schema/forgot.schema";
import { useForm } from "react-hook-form";
import { Errortxt } from "../ErrorTxt";
import { useForgotPassword } from "@/Functions/react-queries/auth.query";
import { toast } from "sonner";

type ForgorPassProps = {
  handleChangeStep: (
    value: "VerifyEmail" | "VerifyOtp" | "ResetPassword",
  ) => void;
  handleSetEmail: (value: string) => void;
};

export const ForgotPassword = ({
  handleChangeStep,
  handleSetEmail,
}: ForgorPassProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotType>({
    resolver: yupResolver(ForgotSchema),
  });

  const { mutateAsync, isPending } = useForgotPassword();

  const onSubmit = (data: ForgotType) => {
    handleSetEmail(data.email);
    mutateAsync(data, {
      onSuccess: (res) => {
        if (res.status === 200) {
          toast.success("An otp sent to your email");
          handleChangeStep("VerifyOtp");
        }
      },
    });
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
        <LockResetIcon sx={{ fontSize: 48, color: "primary.main", mb: 1.5 }} />
        <Typography
          variant="h4"
          sx={{ fontWeight: 800 }}
          align="center"
          gutterBottom
        >
          Forgot Password?
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Enter the email address registered with your developer profile, and
          we'll send you a 6-digit OTP to reset your password.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            <TextField
              fullWidth
              label="Email Address"
              placeholder="developer@domain.com"
              {...register("email")}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
            {!!errors.email && <Errortxt msg={errors.email?.message ?? ""} />}
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={isPending}
            sx={{ py: 1.5, borderRadius: 2 }}
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Send Reset Code"
            )}
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
    </>
  );
};
