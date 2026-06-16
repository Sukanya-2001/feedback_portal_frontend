"use client";

import React, { useState } from "react";
import {
  Project,
  Feedback,
  INITIAL_PROJECTS,
  INITIAL_FEEDBACKS,
} from "@/components/MockDatabase";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store/store";
import ProjectCard from "@/components/ProjectCard";
import {
  Typography,
  Grid,
  Button,
  Box,
  Paper,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Web as WebIcon,
  Edit as EditIcon,
  DeleteOutlineOutlined as DeleteOutlineIcon,
  Share as ShareIcon,
  LibraryAdd as LibraryAddIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";

const CORE_CATEGORIES = [
  "Productivity",
  "SaaS",
  "Health",
  "Education",
  "Collab",
  "Tech",
  "Finance",
];

export default function MyProjectsPage() {
  const { isLoggedIn, userData } = useSelector((s: RootState) => s.user);

  // Local state for projects and feedbacks
  const [projectsList, setProjectsList] = useState<Project[]>(INITIAL_PROJECTS);
  const [feedbacksList, setFeedbacksList] =
    useState<Feedback[]>(INITIAL_FEEDBACKS);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [website, setWebsite] = useState("");
  const [contact, setContact] = useState("");
  const [formError, setFormError] = useState("");

  const createProject = (
    name: string,
    description: string,
    image: string,
    tags: string[],
    website?: string,
    contact?: string,
  ) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name,
      description,
      image:
        image.trim() ||
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      tags: tags.length > 0 ? tags : ["General"],
      website,
      contact,
      userId: "user-1",
      userName: userData?.fullname || "Anonymous User",
      createdAt: new Date().toISOString(),
    };
    setProjectsList((prev) => [newProject, ...prev]);
  };

  const updateProject = (
    projectId: string,
    name: string,
    description: string,
    image: string,
    tags: string[],
    website?: string,
    contact?: string,
  ) => {
    setProjectsList((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              name,
              description,
              image:
                image.trim() ||
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
              tags: tags.length > 0 ? tags : ["General"],
              website,
              contact,
            }
          : p,
      ),
    );
  };

  const deleteProject = (projectId: string) => {
    setProjectsList((prev) => prev.filter((p) => p.id !== projectId));
    setFeedbacksList((prev) => prev.filter((f) => f.projectId !== projectId));
  };

  if (!isLoggedIn || !userData) return null;

  // Filter user specific projects (show user-1 projects if Alice Smith, else match by fullname)
  const userProjects = projectsList.filter(
    (p) =>
      p.userId === "user-1" ||
      p.userName.toLowerCase() === userData.fullname?.toLowerCase(),
  );

  // Extract unique tags for filtering
  const allUserTags = Array.from(new Set(userProjects.flatMap((p) => p.tags)));

  // Filter projects list
  let filteredProjects = userProjects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "all" || p.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleOpenDialog = (project: Project | null = null) => {
    setFormError("");
    if (project) {
      setEditingProject(project);
      setName(project.name);
      setDescription(project.description);
      setImage(project.image);
      setSelectedCategories(project.tags);
      setWebsite(project.website || "");
      setContact(project.contact || "");
    } else {
      setEditingProject(null);
      setName("");
      setDescription("");
      setImage("");
      setSelectedCategories([]);
      setWebsite("");
      setContact("");
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Project name is required.");
      return;
    }

    if (!description.trim()) {
      setFormError("Project description is required.");
      return;
    }

    const categoriesToSave =
      selectedCategories.length > 0 ? selectedCategories : ["General"];

    if (editingProject) {
      updateProject(
        editingProject.id,
        name,
        description,
        image,
        categoriesToSave,
        website,
        contact,
      );
    } else {
      createProject(
        name,
        description,
        image,
        categoriesToSave,
        website,
        contact,
      );
    }

    setDialogOpen(false);
  };

  const handleDelete = (project: Project) => {
    if (
      confirm(
        `Are you sure you want to delete "${project.name}"? This will permanently erase all feedbacks received.`,
      )
    ) {
      deleteProject(project.id);
    }
  };

  const handleShare = (project: Project) => {
    const url = `${window.location.origin}/projects/${project.id}`;
    navigator.clipboard.writeText(url);
    alert("Project feedback link copied to clipboard!");
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
          onClick={() => handleOpenDialog(null)}
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
              {allUserTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  clickable
                  onClick={() => setSelectedTag(tag)}
                  color={selectedTag === tag ? "primary" : "default"}
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
      {userProjects.length === 0 ? (
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
              onClick={() => handleOpenDialog(null)}
              sx={{ px: 3, borderRadius: 2 }}
            >
              Add New Project
            </Button>
          )}
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
              {/* Box container wrapping the Card to add management overlay actions */}
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Management Toolbar overlays at top left */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    zIndex: 2,
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(4px)",
                    borderRadius: 2,
                    p: 0.5,
                    display: "flex",
                    gap: 0.5,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Tooltip title="Edit project">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(project)}
                      color="primary"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete project">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(project)}
                      color="error"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Copy public review link">
                    <IconButton
                      size="small"
                      onClick={() => handleShare(project)}
                    >
                      <ShareIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ProjectCard
                  project={project}
                  feedbacks={feedbacksList}
                  isOwner={false}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* CRUD dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            fontWeight: 700,
          }}
        >
          <LibraryAddIcon color="primary" />
          {editingProject ? "Update Project Details" : "Register New Project"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent
            dividers
            sx={{ display: "flex", flexDirection: "column", gap: 3, py: 3 }}
          >
            <TextField
              fullWidth
              label="Project Name"
              placeholder="e.g. TaskFlow Boards"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              error={formError.includes("name")}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />

            <TextField
              fullWidth
              label="Project Description"
              placeholder="Write a clear, detailed description of your product..."
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              error={formError.includes("description")}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />

            <Box>
              <TextField
                fullWidth
                label="Project Banner Image URL"
                placeholder="e.g. https://images.unsplash.com/... (optional)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
              <FormHelperText>
                Provide a direct URL to an image. Left empty, a custom gradient
                covers automatically.
              </FormHelperText>
            </Box>

            <Box>
              <Autocomplete
                multiple
                id="project-categories"
                options={CORE_CATEGORIES}
                value={selectedCategories}
                onChange={(event, newValue) => {
                  setSelectedCategories(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Project Categories"
                    placeholder="Choose categories..."
                    slotProps={{
                      inputLabel: { shrink: true },
                    }}
                  />
                )}
              />
              <FormHelperText>
                Select standard core categories for your project.
              </FormHelperText>
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Website Link"
                  placeholder="https://myproduct.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Contact Email"
                  placeholder="support@product.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={handleCloseDialog} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {editingProject ? "Update Project" : "Register Project"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
