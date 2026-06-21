"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, Container, CircularProgress } from "@mui/material";
import { ResetPassword } from "@/components/Auth/ResetPassword";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "developer@domain.com";

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
          <ResetPassword handleChangeStep={() => {}} email={email} />
        </CardContent>
      </Card>
    </Container>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <Container
          maxWidth="sm"
          sx={{ py: 12, display: "flex", justifyContent: "center" }}
        >
          <CircularProgress />
        </Container>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
