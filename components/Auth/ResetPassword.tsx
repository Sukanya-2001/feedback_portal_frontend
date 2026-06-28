import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import { ChildProps } from "@/app/auth/forgot-password/page";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ResetSchema, ResetType } from "@/Functions/schema/reset.schema";
import { useResetPassword } from "@/Functions/react-queries/auth.query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Errortxt } from "../ErrorTxt";
import PasswordTextField from "@/ui/PasswordTextField";

export const ResetPassword = ({ handleChangeStep, email }: ChildProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetType>({
    resolver: yupResolver(ResetSchema),
  });

  const { mutateAsync, isPending } = useResetPassword();

  const onSubmit = (data: ResetType) => {
    if (!email) {
      handleChangeStep("VerifyEmail");
      return;
    }
    mutateAsync(
      { ...data, email },
      {
        onSuccess: (res) => {
          if (res.status === 200) {
            toast.success("Password reset successfully");
            router.push("/auth/login?reset=success");
          }
        },
      },
    );
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
        <PasswordIcon sx={{ fontSize: 48, color: "primary.main", mb: 1.5 }} />
        <Typography
          variant="h4"
          sx={{ fontWeight: 800 }}
          align="center"
          gutterBottom
        >
          Reset Password
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Please enter your new password for account
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, mt: 0.5 }}
          color="primary.main"
          align="center"
        >
          {email}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            <PasswordTextField
              fullWidth
              label="Password"
              placeholder="Enter your password..."
              {...register("password")}
            />
            {!!errors.password && (
              <Errortxt msg={errors.password?.message ?? ""} />
            )}
          </Box>
          <Box>
            <PasswordTextField
              fullWidth
              label="Confirm Password"
              placeholder="Repeat new password..."
              {...register("confirm_password")}
            />
            {!!errors.confirm_password && (
              <Errortxt msg={errors.confirm_password?.message ?? ""} />
            )}
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
              "Save New Password"
            )}
          </Button>
        </Box>
      </form>
    </>
  );
};
