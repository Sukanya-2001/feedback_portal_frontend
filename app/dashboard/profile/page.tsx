"use client";

import React, { useState } from "react";
import { useMockDatabase } from "@/components/MockDatabase";
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SaveIcon from "@mui/icons-material/Save";
import LockIcon from "@mui/icons-material/Lock";

export default function ProfilePage() {
  const { currentUser, updateProfile } = useMockDatabase();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  if (!currentUser) return null;

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    updateProfile(name, email);
    setSuccessMessage("Profile updated successfully!");
    setSuccessOpen(true);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!currentPassword) {
      setError("Current password is required.");
      return;
    }

    // Verify current password simulation
    if (currentUser.password && currentPassword !== currentUser.password) {
      setError("Current password does not match our records.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    updateProfile(name, email, newPassword);
    
    // Clear forms
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setSuccessMessage("Password changed successfully!");
    setSuccessOpen(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Title Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <AccountBoxIcon color="primary" sx={{ fontSize: 36 }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            My Profile
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your account settings, contact information, and security options.
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Profile Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
              <AccountBoxIcon color="action" />
              General Details
            </Typography>

            <form onSubmit={handleUpdateProfile}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  sx={{ alignSelf: "flex-start", py: 1.2, px: 3, borderRadius: 2 }}
                >
                  Save Profile
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>

        {/* Change Password Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
              <LockIcon color="action" />
              Update Password
            </Typography>

            <form onSubmit={handleChangePassword}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />

                <Divider />

                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />

                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  startIcon={<LockIcon />}
                  sx={{ alignSelf: "flex-start", py: 1.2, px: 3, borderRadius: 2 }}
                >
                  Change Password
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>

      {/* Success notification */}
      <Snackbar
        open={successOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccessOpen(false)} severity="success" variant="filled" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
