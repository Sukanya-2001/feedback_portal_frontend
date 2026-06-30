import {
  Paper,
  Typography,
  Box,
  TextField,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  ChangePasswordSchema,
  ChangePssType,
} from "@/Functions/schema/changePassword.schema";
import { useChangePassword } from "@/Functions/react-queries/auth.query";
import { toast } from "sonner";
import { deleteCookieValue } from "@/util/cookies";
import { setLogout } from "@/redux-toolkit/slices/user.slice";
import { useDispatch } from "react-redux";
import { Errortxt } from "../ErrorTxt";
import { useRouter } from "next/navigation";
import PasswordTextField from "@/ui/PasswordTextField";

export const ChangePassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePssType>({
    resolver: yupResolver(ChangePasswordSchema),
  });
  const { mutateAsync, isPending } = useChangePassword();
  const onSubmit = (data: ChangePssType) => {
    mutateAsync(data, {
      onSuccess: async (res) => {
        if (res.status === 200) {
          toast.success("Password changed successfully. Please login again");
          await deleteCookieValue(process.env.NEXT_PUBLIC_ACCESS_TOKEN!);
          await deleteCookieValue(process.env.NEXT_PUBLIC_REFRESH_TOKEN!);
          dispatch(setLogout());
          router.push("/auth/login");
        }
      },
    });
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 3,
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <LockIcon color="action" />
        Update Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box>
            <PasswordTextField
              fullWidth
              label="Current Password"
              placeholder="Enter current password..."
              {...register("old_password")}
            />
            {!!errors?.old_password && (
              <Errortxt msg={errors.old_password?.message ?? ""} />
            )}
          </Box>

          <Divider />

          <Box>
            <PasswordTextField
              fullWidth
              label="New Password"
              placeholder="Enter new password..."
              {...register("new_password")}
            />
            {!!errors?.new_password && (
              <Errortxt msg={errors.new_password?.message ?? ""} />
            )}
          </Box>

          <Box>
            <PasswordTextField
              fullWidth
              label="Confirm New Password"
              placeholder="Re-enter the new password..."
              {...register("confirm_password")}
            />
            {!!errors?.confirm_password && (
              <Errortxt msg={errors.confirm_password?.message ?? ""} />
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<LockIcon />}
            disabled={isPending}
            sx={{
              alignSelf: "flex-start",
              py: 1.2,
              px: 3,
              borderRadius: 2,
            }}
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Change Password"
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
