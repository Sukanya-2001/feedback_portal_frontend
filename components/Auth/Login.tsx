import { Box, TextField, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema, LoginType } from "@/Functions/schema/login.schema";
import { useLoginFunc } from "@/Functions/react-queries/auth.query";
import { setCookieValue } from "@/util/cookies";
import { useDispatch } from "react-redux";
import { setProfileData } from "@/redux-toolkit/slices/user.slice";
import { Errortxt } from "../ErrorTxt";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(LoginSchema),
  });

  const { mutateAsync, isPending } = useLoginFunc();
  const onSubmit = (data: LoginType) => {
    mutateAsync(data, {
      onSuccess: async (res) => {
        if (res.status === 200) {
          dispatch(setProfileData(res.data.userExist));
          await setCookieValue(
            process.env.NEXT_PUBLIC_ACCESS_TOKEN!,
            res.data.accessToken,
          );
          await setCookieValue(
            process.env.NEXT_PUBLIC_REFRESH_TOKEN!,
            res.data.refreshToken,
          );
          toast.success(res.message || "Login successfully");
          router.push("/dashboard");
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            placeholder="Enter your email..."
            {...register("email")}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
          {!!errors.email && <Errortxt msg={errors.email?.message ?? ""} />}
        </Box>

        <Box>
          <Box>
            <TextField
              fullWidth
              label="Password"
              type="password"
              placeholder="Enter your password..."
              {...register("password")}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
            {!!errors.password && (
              <Errortxt msg={errors.password?.message ?? ""} />
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5 }}>
            <Button
              component={Link}
              href="/auth/forgot-password"
              variant="text"
              size="small"
              sx={{
                p: 0,
                minWidth: "auto",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.82rem",
              }}
            >
              Forgot Password?
            </Button>
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          endIcon={<LoginIcon />}
          disabled={isPending}
          sx={{ py: 1.5, borderRadius: 2 }}
        >
          {isPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Log In"
          )}
        </Button>
      </Box>
    </form>
  );
};
