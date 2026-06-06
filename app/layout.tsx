import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import { MockDatabaseProvider } from "@/components/MockDatabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FeedbackPortal - Project Feedback Management System",
  description: "Discover projects, share feedback, and grow together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <MockDatabaseProvider>
          <ThemeRegistry>
            <Navbar />
            <Box
              component="main"
              sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
              {children}
            </Box>
            <Footer />
          </ThemeRegistry>
        </MockDatabaseProvider>
      </body>
    </html>
  );
}
