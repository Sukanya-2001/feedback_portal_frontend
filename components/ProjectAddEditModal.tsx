import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  FormHelperText,
  Autocomplete,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { LibraryAdd as LibraryAddIcon } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProjectSchema, ProjectType } from "@/Functions/schema/project.schema";
import {
  useProjectCreate,
  useProjectUpdate,
} from "@/Functions/react-queries/projects.query";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { allkeys } from "@/Functions/react-queries/allKeys";
import { useCategoryList } from "@/Functions/react-queries/categories.query";
import { ProjectDetails } from "@/api/hooks/projects/projects.interface";
import ReactQuill from "./TextEditor/ReactQuill";
import { Errortxt } from "./ErrorTxt";

type AddEditModalProps = {
  addEditModal: boolean;
  handleCloseModal: () => void;
  projects?: ProjectDetails;
};

export const ProjectAddEditModal = ({
  addEditModal,
  handleCloseModal,
  projects,
}: AddEditModalProps) => {
  const editingProject = !!projects;
  const queryClient = useQueryClient();
  const { data: categoryList } = useCategoryList();
  const { mutateAsync: addMutate, isPending: addPending } = useProjectCreate();
  const { mutateAsync: updateMutate, isPending: updatePending } =
    useProjectUpdate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectType>({
    resolver: yupResolver(ProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      websiteLink: "",
      image: undefined,
      categories: [],
    },
  });

  useEffect(() => {
    if (projects) {
      reset({
        name: projects.projectName,
        description: projects.description,
        websiteLink: projects.websiteLink,
        image: projects.image,
        categories: projects.categories || [],
      });
    }
  }, [projects, reset]);

  const onSubmit = async (data: ProjectType) => {
    const formData = new FormData();
    formData.append("projectName", data.name);
    formData.append("description", data.description);
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    data.categories.forEach((category) => {
      formData.append("categories", category._id);
    });
    formData.append("websiteLink", data.websiteLink);

    if (editingProject) {
      updateMutate(
        { projectId: projects?._id!, payload: formData },
        {
          onSuccess: (res) => {
            if (res.success || res.status === 200) {
              toast.success("Project updated successfully.");
              queryClient.refetchQueries({ queryKey: [allkeys.PROJECT_LIST] });
              onClose();
            }
          },
        },
      );
    } else {
      addMutate(formData, {
        onSuccess: (res) => {
          if (res.success || res.status === 201) {
            toast.success("Project added successfully.");
            queryClient.refetchQueries({ queryKey: [allkeys.PROJECT_LIST] });
            onClose();
          }
        },
      });
    }
  };

  const onClose = () => {
    reset();
    handleCloseModal();
  };

  return (
    <Dialog open={addEditModal} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          fontWeight: 700,
        }}
      >
        <LibraryAddIcon color="primary" />
        {editingProject ? "Update Project Details" : "Add New Project"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          dividers
          sx={{ display: "flex", flexDirection: "column", gap: 3, py: 3 }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Project Name"
                placeholder="Enter project name..."
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <>
                <ReactQuill
                  theme="snow"
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder="Write a detailed description..."
                  style={{ height: "250px", marginBottom: "50px" }}
                />

                {errors?.description && (
                  <Errortxt msg={errors.description?.message ?? ""} />
                )}
              </>
            )}
          />

          <Box>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <Box>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderStyle: "dashed",
                      borderWidth: 2,
                      borderColor: errors.image ? "error.main" : "primary.main",
                      color: errors.image ? "error.main" : "primary.main",
                      "&:hover": {
                        borderStyle: "dashed",
                        borderWidth: 2,
                      },
                    }}
                  >
                    {field.value instanceof File
                      ? `Selected: ${field.value.name}`
                      : typeof field.value === "string" && field.value
                        ? "Change Selected Image"
                        : "Upload Project Banner Image"}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                    />
                  </Button>
                  {field.value && (
                    <Box
                      sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={
                          field.value instanceof File
                            ? URL.createObjectURL(field.value)
                            : field.value
                        }
                        alt="Preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: 120,
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              )}
            />

            {errors.image && (
              <FormHelperText error>{errors.image.message}</FormHelperText>
            )}
          </Box>

          <Box>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  options={categoryList?.data || []}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  value={field.value || []}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Project Categories"
                      placeholder="Choose categories..."
                      error={!!errors.categories}
                    />
                  )}
                />
              )}
            />

            <FormHelperText error>{errors.categories?.message}</FormHelperText>
          </Box>

          <Controller
            name="websiteLink"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Website/Repository Link"
                placeholder="https://myproduct.com"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                error={!!errors.websiteLink}
                helperText={errors.websiteLink?.message}
              />
            )}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={addPending || updatePending}
          >
            {addPending || updatePending ? (
              <CircularProgress size={24} color="inherit" />
            ) : editingProject ? (
              "Update Project"
            ) : (
              "Add Project"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
