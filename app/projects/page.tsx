"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
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
  Container,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useAllProjectList } from "@/Functions/react-queries/projects.query";
import { useCategoryList } from "@/Functions/react-queries/categories.query";
import { ProjectList } from "@/components/ProjectList";
import ProjectListSkeleton from "@/components/Skeleton/ProjectListSkeleton";
import { useDebounce } from "@/util/useDebounce";
import { ProjectDetails } from "@/api/hooks/projects/projects.interface";

export default function ProjectsPage() {
  const LIMIT = 12;

  const [page, setPage] = useState(1);
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState("newest");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data: categoryList, isPending } = useCategoryList();

  const { data, isLoading, isFetching } = useAllProjectList(
    page,
    LIMIT,
    selectedTag,
    debouncedSearch,
    sortBy,
  );

  const observer = useRef<IntersectionObserver | null>(null);

  const lastProjectRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching || !hasMore) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isFetching, hasMore],
  );

  useEffect(() => {
    if (!data) return;

    if (page === 1) {
      setProjects(data.projects);
    } else {
      setProjects((prev) => [...prev, ...data.projects]);
    }

    setHasMore(page < data.totalPages);
  }, [data, page]);

  useEffect(() => {
    setPage(1);
    setProjects([]);
    setHasMore(true);
  }, [selectedTag, debouncedSearch, sortBy]);

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
            Search, filter, and review applications registered by our developer
            community.
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
            },
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
      {!!categoryList?.data && categoryList?.data?.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontWeight: 700, mb: 1.5 }}
          >
            Filter by Category:
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            <Chip
              label="All Categories"
              clickable
              color={selectedTag === "all" ? "primary" : "default"}
              onClick={() => setSelectedTag("all")}
              sx={{ fontWeight: 600 }}
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
          </Stack>
        </Box>
      )}

      {/* Grid List of Projects */}
      {isLoading && page === 1 ? (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
              <ProjectListSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : data?.projects?.length === 0 ? (
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
          {projects?.map((project, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={project._id}
              ref={index === projects.length - 1 ? lastProjectRef : undefined}
            >
              {/* Box container wrapping the Card to add management overlay actions */}
              <ProjectList projects={project} />
            </Grid>
          ))}
        </Grid>
      )}
      {isFetching && page > 1 && (
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectListSkeleton />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
