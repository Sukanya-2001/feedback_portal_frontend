import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { SignUpSchema, SignUpType } from "../../Functions/schema/signup.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Errortxt } from "../ErrorTxt";
import { useSignUpFunc } from "@/Functions/react-queries/auth.query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PasswordTextField from "@/ui/PasswordTextField";

export const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: yupResolver(SignUpSchema),
  });

  const { mutateAsync, isPending } = useSignUpFunc();

  const onSubmit = (data: SignUpType) => {
    mutateAsync(data, {
      onSuccess: (res) => {
        if (res.status === 201) {
          toast.success("Signup successfully");
          router.push("/auth/login");
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <div>
          <TextField
            fullWidth
            label="Full Name"
            placeholder="Enter your full name..."
            {...register("fullName")}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
          {!!errors.email && <Errortxt msg={errors.fullName?.message ?? ""} />}
        </div>

        <div>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            placeholder="Enter your email address..."
            {...register("email")}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
          {!!errors.email && <Errortxt msg={errors.email?.message ?? ""} />}
        </div>

        <div>
          <PasswordTextField
            fullWidth
            label="Password"
            placeholder="Enter your password..."
            {...register("password")}
          />
          {!!errors.password && (
            <Errortxt msg={errors.password?.message ?? ""} />
          )}
        </div>

        <div>
          <PasswordTextField
            fullWidth
            label="Confirm Password"
            placeholder="Re-enter new password..."
            {...register("confirm_password")}
          />
          {!!errors.confirm_password && (
            <Errortxt msg={errors.confirm_password?.message ?? ""} />
          )}
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          endIcon={<PersonAddIcon />}
          disabled={isPending}
          sx={{ py: 1.5, borderRadius: 2 }}
        >
          {isPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </Box>
    </form>
  );
};
