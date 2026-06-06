"use client";

import React, { useState } from "react";
import { useMockDatabase } from "@/components/MockDatabase";
import ProjectCard from "@/components/ProjectCard";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

export default function ProjectsPage() {
  const { projects, feedbacks } = useMockDatabase();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState("newest");

  // Get unique tags across all projects
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags))
  );

  // Filter projects by search query and tag
  let filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === "all" || project.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  // Sort projects
  filteredProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return 0;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header Banner */}
      <Box sx={{ mb: 6, display: "flex", alignItems: "center", gap: 2 }}>
        <TravelExploreIcon color="primary" sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
            Explore Projects
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Search, filter, and review applications registered by our developer community.
          </Typography>
        </Box>
      </Box>

      {/* Search & Sort Panel */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          mb: 4,
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search projects by name, description, or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        <FormControl sx={{ minWidth: 200, width: { xs: "100%", md: "auto" } }}>
          <InputLabel id="sort-projects-label">Sort Projects</InputLabel>
          <Select
            labelId="sort-projects-label"
            id="sort-projects"
            value={sortBy}
            label="Sort Projects"
            onChange={(e) => setSortBy(e.target.value)}
            sx={{ borderRadius: 3 }}
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Filter Tag Chips */}
      {allTags.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700, mb: 1.5 }}>
            Filter by Category:
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
            <Chip
              label="All Categories"
              clickable
              color={selectedTag === "all" ? "primary" : "default"}
              onClick={() => setSelectedTag("all")}
              sx={{ fontWeight: 600 }}
            />
            {allTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                clickable
                color={selectedTag === tag ? "primary" : "default"}
                onClick={() => setSelectedTag(tag)}
                sx={{ fontWeight: 600 }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Grid List of Projects */}
      {filteredProjects.length === 0 ? (
        <Box sx={{ py: 10, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            No projects matched your search
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try checking spelling or choosing a different filter category.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredProjects.map((project) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
              <ProjectCard project={project} feedbacks={feedbacks} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
