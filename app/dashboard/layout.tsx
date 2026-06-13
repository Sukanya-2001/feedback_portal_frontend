"use client";

import React, { useState, useEffect } from "react";
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
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import { setLogout } from "@/redux-toolkit/slices/user.slice";
import { deleteCookieValue } from "@/util/common";

const SIDEBAR_WIDTH = 260;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { isLoggedIn, userData } = useSelector((s: RootState) => s.user);
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // Auth redirection check
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f8fafc",
        }}
      >
        <Typography variant="body1">Redirecting to login...</Typography>
      </Box>
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await deleteCookieValue(process.env.NEXT_VALUE_ACCESS_TOKEN!);
    await deleteCookieValue(process.env.NEXT_PUBLIC_REFRESH_TOKEN!);
    dispatch(setLogout());
    handleCloseUserMenu();
    router.push("/");
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
      {/* 1. Header (AppBar) for mobile/dashboard context */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          ml: { md: `${SIDEBAR_WIDTH}px` },
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          boxShadow: "none",
          color: "text.primary",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: { xs: 64, md: 70 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Hamburger for mobile */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Breadcrumb / Section name */}
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: "-0.015em" }}
            >
              {getViewTitle()}
            </Typography>
          </Box>

          {/* Quick User controls */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography
              variant="body2"
              sx={{
                display: { xs: "none", sm: "block" },
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              {userData?.fullname ?? "Unkown User"}
            </Typography>
            <Tooltip title="User actions">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 38,
                    height: 38,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  {(userData?.fullname || "U").charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem disabled>
                <Typography variant="caption" color="text.secondary">
                  Logged in as: <strong>{userData?.email}</strong>
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  router.push("/dashboard/profile");
                }}
              >
                <Typography align="center">My Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToAppIcon
                  fontSize="small"
                  sx={{ mr: 1, color: "error.main" }}
                />
                <Typography align="center" color="error.main">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 2. Sidebars (Mobile Drawer + Desktop Fixed Panel) */}
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
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>

      {/* 3. Main content frame */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 3, md: 4 },
          width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          pt: { xs: 10, md: 12 }, // offset fixed Header height
          bgcolor: "#f8fafc",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
