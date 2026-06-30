"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import {
  Typography,
  Grid,
  Button,
  Box,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  Skeleton,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Web as WebIcon,
} from "@mui/icons-material";
import { ProjectList } from "@/components/ProjectList";
import { useProjectList } from "@/Functions/react-queries/projects.query";
import { ProjectAddEditModal } from "@/components/ProjectAddEditModal";
import { ProjectDetails } from "@/api/hooks/projects/projects.interface";
import { useCategoryList } from "@/Functions/react-queries/categories.query";
import { useDebounce } from "@/util/useDebounce";
import ProjectListSkeleton from "@/components/Skeleton/ProjectListSkeleton";

export default function MyProjectsPage() {
  const { isLoggedIn, userData } = useSelector((s: RootState) => s.user);
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const { data: categoryList, isPending } = useCategoryList();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, isLoading } = useProjectList(
    1,
    10,
    selectedTag,
    debouncedSearch,
  );

  if (!isLoggedIn || !userData) return null;

  const handleCloseModal = () => {
    setAddEditModalOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Title Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
            My Projects
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your registered applications, review configurations, or add
            new projects.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setAddEditModalOpen(true)}
          sx={{ py: 1.2, px: 2.5, borderRadius: 2 }}
        >
          Add Project
        </Button>
      </Box>

      {/* Filter and Search Panel */}
      <Paper variant="outlined" sx={{ p: 2.5, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ alignSelf: "center", mr: 1, fontWeight: 600 }}
              >
                Category:
              </Typography>
              <Chip
                label="All"
                size="small"
                clickable
                color={selectedTag === "all" ? "primary" : "default"}
                onClick={() => setSelectedTag("all")}
              />
              {isPending
                ? Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rounded"
                      width={80}
                      height={25}
                      sx={{ borderRadius: 4 }}
                    />
                  ))
                : !!categoryList?.data &&
                  categoryList.data?.length > 0 &&
                  categoryList.data.map((tag) => (
                    <Chip
                      key={tag._id}
                      label={tag.name}
                      size="small"
                      clickable
                      onClick={() => setSelectedTag(tag._id)}
                      color={selectedTag === tag._id ? "primary" : "default"}
                    />
                  ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search your projects by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Projects Grid List */}
      {isLoading ? (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
              <ProjectListSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : data?.projects?.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            py: 8,
            px: 2,
            textAlign: "center",
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <WebIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            No projects found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {searchQuery || selectedTag !== "all"
              ? "Try modifying your search query or filters."
              : "Register your first application to start gathering reviews!"}
          </Typography>
          {searchQuery || selectedTag !== "all" ? (
            <Button
              variant="text"
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("all");
              }}
            >
              Reset Filters
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setAddEditModalOpen(true)}
              sx={{ px: 3, borderRadius: 2 }}
            >
              Add New Project
            </Button>
          )}
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {data?.projects.map((project: ProjectDetails) => (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={project._id}>
              {/* Box container wrapping the Card to add management overlay actions */}
              <ProjectList projects={project} myProject />
            </Grid>
          ))}
        </Grid>
      )}
      <ProjectAddEditModal
        addEditModal={addEditModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </Box>
  );
}
