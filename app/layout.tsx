import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import { MockDatabaseProvider } from "@/components/MockDatabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";
import ReduxProvider from "@/components/Wrapper/ReduxWrapper";
import { Toaster } from "sonner";
import QueryProvider from "@/components/Wrapper/QueryProvider";

const geistSans = {
  variable: "--font-geist-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
};

export const metadata: Metadata = {
  title: "FeedbackPortal - Project Feedback Management System",
  description: "Discover projects, share feedback, and grow together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ProfileWrapper();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          margin: 0,
          backgroundColor: "#f8fafc",
        }}
      >
        <QueryProvider>
          <ReduxProvider>
            <MockDatabaseProvider>
              <ThemeRegistry>
                <Navbar />
                <Box
                  component="main"
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  {children}
                  <Toaster />
                </Box>
                <Footer />
              </ThemeRegistry>
            </MockDatabaseProvider>
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
