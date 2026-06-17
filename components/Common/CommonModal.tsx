import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface CommonModalProps {
  open: boolean;
  title: string;
  description: string;
  actionButtonText?: string;
  cancelButtonText?: string;
  onAction: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const CommonModal: React.FC<CommonModalProps> = ({
  open,
  title,
  description,
  actionButtonText = "Confirm",
  cancelButtonText = "Cancel",
  onAction,
  onCancel,
  loading = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onCancel}
          variant="outlined"
          disabled={loading}
        >
          {cancelButtonText}
        </Button>

        <Button
          onClick={onAction}
          variant="contained"
          disabled={loading}
        >
          {actionButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonModal;