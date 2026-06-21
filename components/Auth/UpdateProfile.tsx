import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileSchema, ProfileType } from "@/Functions/schema/profile.schema";
import { useProfileUpdate } from "@/Functions/react-queries/auth.query";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { allkeys } from "@/Functions/react-queries/allKeys";
import { Errortxt } from "../ErrorTxt";
import { getImage } from "@/api/endpoints";

export const UpdateProfile = () => {
  const queryClient = useQueryClient();
  const { userData } = useSelector((s: RootState) => s.user);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileType>({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      fullName: userData?.fullName ?? "",
      image: undefined,
    },
  });

  const { mutateAsync, isPending } = useProfileUpdate();
  const onSubmit = (data: ProfileType) => {
    const formData = new FormData();
    formData.append("fullName", data?.fullName);
    if (data.image as File) {
      formData.append("image", data?.image);
    }
    mutateAsync(formData, {
      onSuccess: (res) => {
        if (res.status === 200) {
          toast.success("Profile updated successfully.");
          queryClient.refetchQueries({ queryKey: [allkeys.PROFILE_DETAILS] });
        }
      },
    });
  };

  useEffect(() => {
    if (userData) {
      setValue("fullName", userData.fullName);
      if (userData?.image) {
        setValue("image", userData.image);
      }
    }
  }, [userData, setValue]);

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
        <AccountBoxIcon color="action" />
        General Details
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange } }) => (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <Avatar
                      src={
                        profileImage
                          ? profileImage
                          : userData?.image
                            ? getImage(userData.image)
                            : ""
                      }
                      sx={{
                        width: 120,
                        height: 120,
                        fontSize: 40,
                      }}
                    >
                      {!profileImage &&
                        !userData?.image &&
                        userData?.fullName?.charAt(0)?.toUpperCase()}
                    </Avatar>

                    <IconButton
                      component="label"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        bgcolor: "primary.main",
                        color: "white",
                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                      }}
                    >
                      <CameraAltIcon fontSize="small" />

                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (file) {
                            setProfileImage(URL.createObjectURL(file));
                            onChange(file); // Update RHF field value
                          }
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>

                {!!errors.image && (
                  <Errortxt msg={errors.image.message ?? ""} />
                )}
              </>
            )}
          />
          <Box>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  label="Full Name"
                  placeholder="Enter your fullname..."
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              )}
            />
            {!!errors?.fullName && (
              <Errortxt msg={errors.fullName?.message ?? ""} />
            )}
          </Box>
          Email: {userData?.email ?? ""}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
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
              "Save Profile"
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
