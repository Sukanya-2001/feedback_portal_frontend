"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMockDatabase } from "./MockDatabase";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WebIcon from "@mui/icons-material/Web";
import ForumIcon from "@mui/icons-material/Forum";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface SidebarProps {
  onCloseMobileDrawer?: () => void;
}

export default function Sidebar({ onCloseMobileDrawer }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useMockDatabase();

  if (!currentUser) return null;

  const menuItems = [
    { text: "Overview", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "My Projects", icon: <WebIcon />, path: "/dashboard/projects" },
    { text: "All Feedbacks", icon: <ForumIcon />, path: "/dashboard/feedbacks" },
    { text: "Saved Feedbacks", icon: <BookmarkIcon />, path: "/dashboard/saved-feedbacks" },
    { text: "My Profile", icon: <AccountBoxIcon />, path: "/dashboard/profile" },
  ];

  const handleLogout = () => {
    logout();
    if (onCloseMobileDrawer) onCloseMobileDrawer();
    router.push("/");
  };

  const handleNavClick = () => {
    if (onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Sidebar Header: User profile info */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 46,
            height: 46,
            fontSize: "1.1rem",
            fontWeight: 700,
          }}
        >
          {currentUser.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ overflow: "hidden" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
            {currentUser.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block" }}>
            {currentUser.email}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Navigation List */}
      <List sx={{ px: 2, py: 3, flexGrow: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {menuItems.map((item) => {
          // Check if active: exact match or sub-route match (e.g. /dashboard/projects/create should highlight /dashboard/projects)
          const isActive =
            pathname === item.path ||
            (item.path !== "/dashboard" && pathname.startsWith(item.path));

          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                onClick={handleNavClick}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  px: 2,
                  bgcolor: isActive ? "rgba(79, 70, 229, 0.08)" : "transparent",
                  color: isActive ? "primary.main" : "text.secondary",
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "primary.main" : "text.disabled",
                  },
                  "&:hover": {
                    bgcolor: isActive ? "rgba(79, 70, 229, 0.12)" : "rgba(0, 0, 0, 0.02)",
                    color: isActive ? "primary.main" : "text.primary",
                    "& .MuiListItemIcon-root": {
                      color: isActive ? "primary.main" : "text.secondary",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, transition: "color 0.2s" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      variant: "body2",
                      sx: { fontWeight: isActive ? 700 : 500 }
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Logout button at the bottom */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<ExitToAppIcon />}
          onClick={handleLogout}
          sx={{
            py: 1,
            borderRadius: 2,
            borderWidth: "1px",
            "&:hover": {
              borderWidth: "1px",
              bgcolor: "error.lighter",
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
