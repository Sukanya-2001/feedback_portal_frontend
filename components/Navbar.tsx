"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import { setLogout } from "@/redux-toolkit/slices/user.slice";
import { deleteCookieValue } from "@/util/cookies";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Container,
  Divider,
} from "@mui/material";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { getImage } from "@/api/endpoints";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isLoggedIn, userData } = useSelector((s: RootState) => s.user);
  const router = useRouter();
  const pathname = usePathname();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = async () => {
    await deleteCookieValue(process.env.NEXT_VALUE_ACCESS_TOKEN!);
    await deleteCookieValue(process.env.NEXT_PUBLIC_REFRESH_TOKEN!);
    dispatch(setLogout());
    handleCloseUserMenu();
    router.push("/");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 70 } }}>
          {/* Logo - Desktop */}
          <BubbleChartIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1.5,
              color: "primary.main",
              fontSize: 30,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontWeight: 800,
              color: "text.primary",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            Feedback<span style={{ color: "#4f46e5" }}>Portal</span>
          </Typography>

          {/* Mobile Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem component={Link} href="/" onClick={handleCloseNavMenu}>
                <Typography align="center">Home</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                href="/projects"
                onClick={handleCloseNavMenu}
              >
                <Typography align="center">Browse Projects</Typography>
              </MenuItem>
              {!isLoggedIn && (
                <>
                  <MenuItem
                    component={Link}
                    href="/auth/signup"
                    onClick={handleCloseNavMenu}
                  >
                    <Typography align="center">Sign up</Typography>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    href="/auth/login"
                    onClick={handleCloseNavMenu}
                  >
                    <Typography align="center">Login</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <BubbleChartIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "primary.main",
              fontSize: 28,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontWeight: 800,
              color: "text.primary",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            Feedback<span style={{ color: "#4f46e5" }}>Portal</span>
          </Typography>

          {/* Desktop Navigation Links */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}
          >
            <Button
              component={Link}
              href="/"
              sx={{
                color: isActive("/") ? "primary.main" : "text.secondary",
                fontWeight: isActive("/") ? 700 : 500,
                backgroundColor: isActive("/")
                  ? "rgba(79, 70, 229, 0.08)"
                  : "transparent",
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              href="/projects"
              sx={{
                color: isActive("/projects")
                  ? "primary.main"
                  : "text.secondary",
                fontWeight: isActive("/projects") ? 700 : 500,
                backgroundColor: isActive("/projects")
                  ? "rgba(79, 70, 229, 0.08)"
                  : "transparent",
              }}
            >
              Browse Projects
            </Button>
          </Box>

          {/* Auth/User Action Controls */}
          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn && userData ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  Hi, {userData?.fullName.split(" ")[0]}
                </Typography>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      src={
                        userData?.image ? getImage(userData.image) : undefined
                      }
                      sx={{
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        width: 40,
                        height: 40,
                        fontWeight: 700,
                        fontSize: "0.95rem",
                      }}
                    >
                      {!userData?.image &&
                        (userData?.fullName || "U").charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
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
                      Logged in as: <strong>{userData.email}</strong>
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    component={Link}
                    href="/dashboard"
                    onClick={handleCloseUserMenu}
                  >
                    <DashboardIcon
                      fontSize="small"
                      sx={{ mr: 1, color: "text.secondary" }}
                    />
                    <Typography align="center">My Dashboard</Typography>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    href="/dashboard/feedbacks"
                    onClick={handleCloseUserMenu}
                  >
                    <FeedbackIcon
                      fontSize="small"
                      sx={{ mr: 1, color: "text.secondary" }}
                    />
                    <Typography align="center">All Feedbacks</Typography>
                  </MenuItem>
                  <Divider />
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
            ) : (
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                <Button
                  component={Link}
                  href="/auth/login"
                  variant="text"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  href="/auth/signup"
                  variant="contained"
                  color="primary"
                  sx={{
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 2.5,
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
