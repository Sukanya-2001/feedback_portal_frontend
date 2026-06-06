"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateProjectRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/projects");
  }, [router]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      Redirecting to projects panel...
    </div>
  );
}
