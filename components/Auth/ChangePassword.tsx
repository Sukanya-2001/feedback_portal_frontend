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
import { deleteCookieValue } from "@/util/common";
import { setLogout } from "@/redux-toolkit/slices/user.slice";
import { useDispatch } from "react-redux";
import { Errortxt } from "../ErrorTxt";
import { useRouter } from "next/navigation";

export const ChangePassword = () => {
  const dispatch = useDispatch();
  const router = useRouterprojects();
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
          await deleteCookieValue(process.env.NEXT_VALUE_ACCESS_TOKEN!);
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
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              placeholder="Enter current password..."
              {...register("old_password")}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            {!!errors?.old_password && (
              <Errortxt msg={errors.old_password?.message ?? ""} />
            )}
          </Box>

          <Divider />

          <Box>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              placeholder="Enter new password..."
              {...register("new_password")}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            {!!errors?.new_password && (
              <Errortxt msg={errors.new_password?.message ?? ""} />
            )}
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter the new password..."
              {...register("confirm_password")}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
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
