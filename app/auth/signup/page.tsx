"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { SignUp } from "../../../components/Auth/SignUp";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";

export default function SignupPage() {
  const { isLoggedIn } = useSelector((s: RootState) => s?.user);
  const router = useRouter();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: { xs: 8, md: 12 },
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
      }}
    >
      <Card
        sx={{ width: "100%", p: { xs: 2, md: 4 }, border: "1px solid #e2e8f0" }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <BubbleChartIcon
              sx={{ fontSize: 44, color: "primary.main", mb: 1.5 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 800 }}
              align="center"
              gutterBottom
            >
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Register as a developer to start showcasing your projects.
            </Typography>
          </Box>

          <SignUp />

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Button
                component={Link}
                href="/auth/login"
                variant="text"
                sx={{ p: 0, minWidth: "auto", fontWeight: 700 }}
              >
                Log In
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
