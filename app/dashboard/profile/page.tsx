"use client";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Typography, Box, Grid } from "@mui/material";
import { UpdateProfile } from "@/components/Auth/UpdateProfile";
import { ChangePassword } from "@/components/Auth/ChangePassword";

export default function ProfilePage() {
  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
        }}
      >
        <AccountBoxIcon color="primary" sx={{ fontSize: 36 }} />

        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            My Profile
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage your account settings, contact information, and security
            options.
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Profile Information */}
        <Grid size={{ xs: 12, md: 6 }}>
          <UpdateProfile />
        </Grid>

        {/* Change PasswordS */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ChangePassword />
        </Grid>
      </Grid>
    </Box>
  );
}
