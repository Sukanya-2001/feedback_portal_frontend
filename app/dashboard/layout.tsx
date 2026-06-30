"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import {
  Box,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import { setLogout } from "@/redux-toolkit/slices/user.slice";
import { deleteCookieValue } from "@/util/cookies";

const SIDEBAR_WIDTH = 260;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { userData } = useSelector((s: RootState) => s.user);
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // Auth redirection check
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/auth/login");
  //   }
  // }, [isLoggedIn, router]);

  // if (!isLoggedIn) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         minHeight: "100vh",
  //         bgcolor: "#f8fafc",
  //       }}
  //     >
  //       <Typography variant="body1">Redirecting to login...</Typography>
  //     </Box>
  //   );
  // }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Get current view title based on path
  const getViewTitle = () => {
    if (pathname === "/dashboard") return "Overview";
    if (pathname.startsWith("/dashboard/projects")) return "My Projects";
    if (pathname.startsWith("/dashboard/feedbacks")) return "All Feedbacks";
    if (pathname.startsWith("/dashboard/saved-feedbacks"))
      return "Saved Feedbacks";
    if (pathname.startsWith("/dashboard/profile")) return "My Profile";
    return "Dashboard";
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1, minHeight: "100vh" }}>
      {/* 1. Sidebars (Mobile Drawer + Desktop Fixed Panel) */}
      <Box
        component="nav"
        sx={{ width: { md: SIDEBAR_WIDTH }, flexShrink: { md: 0 } }}
        aria-label="dashboard sections"
      >
        {/* Mobile slide-out Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: SIDEBAR_WIDTH,
            },
          }}
        >
          <Sidebar onCloseMobileDrawer={handleDrawerToggle} />
        </Drawer>

        {/* Desktop permanent Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: SIDEBAR_WIDTH,
              top: "70px",
              height: "calc(100vh - 70px)",
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>

      {/* 2. Main content frame */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 3, md: 4 },
          width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f8fafc",
        }}
      >
        {/* Toggle Sidebar Button for Mobile */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            mb: 3,
            gap: 2,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {getViewTitle()}
          </Typography>
        </Box>

        {children}
      </Box>
    </Box>
  );
}
